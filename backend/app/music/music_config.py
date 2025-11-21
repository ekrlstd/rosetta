import os
import pandas as pd
import random

# ---------------------------------------------
# Load dataset using absolute path
# ---------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(BASE_DIR, "spotify_songs.csv")

df = pd.read_csv(CSV_PATH)
df = df.dropna()


# ---------------------------------------------
# 1. Map percentage to levels
# ---------------------------------------------
def get_severity_level(percentage: int) -> int:
    if percentage <= 20:
        return 1
    elif percentage <= 40:
        return 2
    elif percentage <= 60:
        return 3
    elif percentage <= 75:
        return 4
    elif percentage <= 90:
        return 5
    else:
        return 6


# ---------------------------------------------
# Helper → Range filter for readability
# ---------------------------------------------
def between(df, col, low, high):
    return df[(df[col] >= low) & (df[col] <= high)]


# ---------------------------------------------
# 2. Filtering rules per migraine level
# ---------------------------------------------
def filter_by_level(level: int):
    filtered = df.copy()

    # ------------------------------
    # LEVEL 1 (0–25%) → Normal
    # ------------------------------
    if level == 1:
        filtered = between(filtered, "danceability", 0.4, 0.7)
        filtered = between(filtered, "energy", 0.4, 0.7)
        filtered = between(filtered, "loudness", -18, -10)
        filtered = between(filtered, "acousticness", 0.2, 0.6)
        filtered = between(filtered, "instrumentalness", 0.0, 0.4)
        filtered = between(filtered, "valence", 0.5, 0.8)
        return filtered

    # ------------------------------
    # LEVEL 2 (26–50%) → Caution
    # ------------------------------
    if level == 2:
        filtered = between(filtered, "danceability", 0.3, 0.6)
        filtered = between(filtered, "energy", 0.25, 0.55)
        filtered = between(filtered, "loudness", -22, -12)
        filtered = between(filtered, "acousticness", 0.3, 0.8)
        filtered = between(filtered, "instrumentalness", 0.1, 0.6)
        filtered = between(filtered, "valence", 0.5, 0.85)
        filtered = filtered[filtered["mode"] == 1]
        return filtered

    # ------------------------------
    # LEVEL 3 (51–75%) → High Risk
    # ------------------------------
    if level == 3:
        filtered = between(filtered, "danceability", 0.15, 0.45)       # widened by 0.05 both sides
        filtered = between(filtered, "energy", 0.05, 0.40)             # slightly lower + slightly higher
        filtered = between(filtered, "loudness", -30, -15)             # widened by 2 dB
        filtered = between(filtered, "acousticness", 0.4, 0.95)        # allow more songs
        filtered = between(filtered, "instrumentalness", 0.2, 0.8)     # lowered min from 0.3 → 0.2
        filtered = between(filtered, "valence", 0.5, 0.9)              # lowered min 0.6 → 0.5
        filtered = filtered[filtered["mode"] == 1]                     # keep major key
        return filtered
    # ------------------------------
    # LEVEL 4 (76–100%) → Severe
    # ------------------------------
    if level == 4:
        filtered = between(filtered, "danceability", 0.0, 0.3)
        filtered = between(filtered, "energy", 0.0, 0.2)
        filtered = between(filtered, "loudness", -35, -20)
        filtered = between(filtered, "acousticness", 0.7, 1.0)
        filtered = between(filtered, "instrumentalness", 0.5, 1.0)
        filtered = between(filtered, "valence", 0.6, 1.0)
        filtered = filtered[filtered["mode"] == 1]
        return filtered

    return filtered

# ---------------------------------------------
# 3. Generate playlist with Spotify URLs
# ---------------------------------------------
def generate_playlist(percentage: int, count: int = 10):
    level = get_severity_level(percentage)
    filtered = filter_by_level(level)

    # Fallback if the rules are too strict
    if len(filtered) == 0:
        print("Fallback: No songs matched the criteria, returning random sample.")
        filtered = df.sample(50)

    playlist = filtered.sample(min(count, len(filtered)))

    result = []
    for _, row in playlist.iterrows():
        track = row.to_dict()
        track["spotify_url"] = f"https://open.spotify.com/embed/track/{row['track_id']}"
        result.append(track)

    return result
