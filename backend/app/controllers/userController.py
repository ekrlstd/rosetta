from fastapi import APIRouter, HTTPException
from app.services.userService import UserService
from app.music.music_config import generate_playlist
router = APIRouter()

@router.get("/users")
async def greet():
    return UserService.greet()

@router.get("/music/recommend/{percentage}")
def recommend_music(percentage: int):
    """
    Takes migraine percentage and returns a playlist of 10 songs.
    """
    if percentage < 0 or percentage > 100:
        return {"error": "Percentage must be between 0 and 100"}

    playlist = generate_playlist(percentage)

    return {
        "migraine_percentage": percentage,
        "playlist_length": len(playlist),
        "songs": playlist
    }