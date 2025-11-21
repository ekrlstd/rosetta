import base64
import os
import time
import requests
from dotenv import load_dotenv

load_dotenv()

CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")

# Cache token to avoid regenerating every request
_token_cache = {
    "access_token": None,
    "expires_at": 0
}


def get_spotify_token():
    """Return cached token or fetch a new one."""
    global _token_cache

    if _token_cache["access_token"] and time.time() < _token_cache["expires_at"]:
        return _token_cache["access_token"]

    # Generate Base64 client credentials
    auth_str = f"{CLIENT_ID}:{CLIENT_SECRET}"
    b64_auth_str = base64.b64encode(auth_str.encode()).decode()

    url = "https://accounts.spotify.com/api/token"
    headers = {"Authorization": f"Basic {b64_auth_str}"}
    data = {"grant_type": "client_credentials"}

    response = requests.post(url, headers=headers, data=data)
    token_data = response.json()

    access_token = token_data.get("access_token")
    expires_in = token_data.get("expires_in", 3600)

    _token_cache["access_token"] = access_token
    _token_cache["expires_at"] = time.time() + expires_in - 60

    return access_token


def get_track_preview(track_id: str):
    """Fetch preview_url, Spotify URL, and album image."""
    token = get_spotify_token()

    url = f"https://api.spotify.com/v1/tracks/{track_id}"
    headers = {"Authorization": f"Bearer {token}"}

    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        return None

    data = response.json()

    return {
        "preview_url": data.get("preview_url"),
        "spotify_url": data.get("external_urls", {}).get("spotify"),
        "album_image": data.get("album", {}).get("images", [{}])[0].get("url")
    }
