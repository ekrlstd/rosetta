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

    # ----------------------
    # Level 1 — Optimal
    # ----------------------
    if level == 1:
        filtered = between(filtered, "danceability", 0.5, 0.7)
        filtered = between(filtered, "energy", 0.4, 0.6)
        filtered = between(filtered, "loudness", -18, -12)
        filtered = between(filtered, "acousticness", 0.3, 0.7)
        filtered = between(filtered, "instrumentalness", 0.1, 0.5)
        filtered = between(filtered, "valence", 0.5, 0.7)
        return filtered

    # ----------------------
    # Level 2 — Caution
    # ----------------------
    if level == 2:
        filtered = between(filtered, "danceability", 0.4, 0.6)
        filtered = between(filtered, "energy", 0.3, 0.5)
        filtered = between(filtered, "loudness", -20, -14)
        filtered = filtered[filtered["mode"] == 1]
        filtered = between(filtered, "acousticness", 0.5, 0.8)
        filtered = between(filtered, "instrumentalness", 0.3, 0.6)
        filtered = between(filtered, "valence", 0.6, 0.8)
        return filtered

    # ----------------------
    # Level 3 — Warning
    # ----------------------
    if level == 3:
        filtered = between(filtered, "danceability", 0.3, 0.5)
        filtered = between(filtered, "energy", 0.2, 0.4)
        filtered = between(filtered, "loudness", -22, -16)
        filtered = filtered[filtered["mode"] == 1]
        filtered = between(filtered, "acousticness", 0.6, 0.9)
        filtered = between(filtered, "instrumentalness", 0.5, 0.8)
        filtered = between(filtered, "valence", 0.7, 0.9)
        return filtered

    # ----------------------
    # Level 4 — High Risk
    # ----------------------
    if level == 4:
        filtered = between(filtered, "danceability", 0.2, 0.4)
        filtered = between(filtered, "energy", 0.1, 0.3)
        filtered = between(filtered, "loudness", -25, -18)
        filtered = filtered[filtered["mode"] == 1]
        filtered = between(filtered, "acousticness", 0.8, 1.0)
        filtered = between(filtered, "instrumentalness", 0.7, 1.0)
        filtered = between(filtered, "valence", 0.8, 1.0)
        return filtered

    # ----------------------
    # Level 5 — Critical
    # ----------------------
    if level == 5:
        filtered = between(filtered, "danceability", 0.1, 0.3)
        filtered = between(filtered, "energy", 0.0, 0.2)
        filtered = between(filtered, "loudness", -30, -20)
        filtered = filtered[filtered["mode"] == 1]
        filtered = between(filtered, "acousticness", 0.9, 1.0)
        filtered = between(filtered, "instrumentalness", 0.9, 1.0)
        filtered = between(filtered, "valence", 0.9, 1.0)
        return filtered

    # ----------------------
    # Level 6 — Emergency (Strict)
    # ----------------------
    if level == 6:
        filtered = between(filtered, "danceability", 0.0, 0.2)
        filtered = between(filtered, "energy", 0.0, 0.1)
        filtered = between(filtered, "loudness", -35, -25)
        filtered = filtered[filtered["mode"] == 1]
        filtered = filtered[filtered["acousticness"] >= 1.0]
        filtered = filtered[filtered["instrumentalness"] >= 1.0]
        filtered = filtered[filtered["valence"] >= 1.0]
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
        filtered = df.sample(50)

    playlist = filtered.sample(min(count, len(filtered)))

    result = []
    for _, row in playlist.iterrows():
        track = row.to_dict()
        track["spotify_url"] = f"https://open.spotify.com/embed/track/{row['track_id']}"
        result.append(track)

    return result
