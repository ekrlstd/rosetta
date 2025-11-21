import os
import pandas as pd
import random

# --------------------------------------------------
# LOAD CLEANED DATASET
# --------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(BASE_DIR, "cleaned_migraine_music copy.csv")

df = pd.read_csv(CSV_PATH)

# Drop any accidental NaNs
df = df.dropna()

# --------------------------------------------------
# 1. MAP PERCENTAGE → MIGRAINE LEVEL (1–4)
# --------------------------------------------------
def get_severity_level(percentage: int) -> int:
    if percentage <= 25:
        return 1
    elif percentage <= 50:
        return 2
    elif percentage <= 75:
        return 3
    else:
        return 4

# --------------------------------------------------
# 2. PLAYLIST GENERATION
# --------------------------------------------------
def generate_playlist(percentage: int, count: int = 10):
    level = get_severity_level(percentage)

    # Filter dataset for songs matching migraine level
    filtered = df[df["migraine_level"] == level]

    # If not enough songs, fallback to calmest tracks
    if len(filtered) < count:
        print("Fallback: Not enough songs → using calmest tracks")
        filtered = df.sort_values(by="calm_score", ascending=False).head(50)

    # Random sample for playlist
    playlist = filtered.sample(min(count, len(filtered)))

    # Create response-friendly dictionary list
    result = []
    for _, row in playlist.iterrows():
        track = row.to_dict()
        track["spotify_url"] = f"https://open.spotify.com/embed/track/{row['track_id']}"

        # Convert genre to list (if multiple)
        if isinstance(row["track_genre"], str):
            track["genre_list"] = row["track_genre"].split(";")
        else:
            track["genre_list"] = []

        result.append(track)

    return result
