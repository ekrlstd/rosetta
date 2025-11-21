from fastapi import APIRouter, HTTPException
from app.services.userService import UserService
from app.music.music_config import generate_playlist, get_severity_level
from app.exercises.exercise_config import get_recommendations_for_level
from app.ML.learn import prediction

router = APIRouter()

@router.get("/users")
async def greet():
    return UserService.greet()

@router.get("/music/recommend/{percentage}")
def recommend_music(percentage: float):
    """
    Takes migraine percentage and returns a playlist of 10 songs.
    """
    if percentage < 0 or percentage > 100:
        return {"error": "Percentage must be between 0 and 100"}
    
    level = get_severity_level(percentage)

    playlist = generate_playlist(percentage)
    wellness = get_recommendations_for_level(level)


    return {
        "migraine_percentage": percentage,
        "playlist_length": len(playlist),
        "songs": playlist,
        "wellness_recommendations": wellness
    }


# user inputs age, gender , symptoms, triggers, duration in the parameter to the endpoint
@router.post("/predict_migraine_severity")
def predict_migraine_severity(age: int, gender: str, symptoms: str, triggers: str, duration: int):
    """
    Predicts migraine severity percentage based on user inputs.
    """
    input_data = {
        "age": age,
        "gender": gender,
        "symptoms": symptoms,           
        "triggers": triggers,
        "duration": duration
    }
    percentage = prediction(input_data)
    level = get_severity_level(percentage)
    playlist = generate_playlist(percentage)
    wellness = get_recommendations_for_level(level)
    return {
        "predicted_migraine_percentage": percentage,
        "playlist_length": len(playlist),
        "songs": playlist,
        "wellness_recommendations": wellness
    }
