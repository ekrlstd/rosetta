from fastapi import APIRouter, HTTPException
from app.services.userService import UserService
from app.music.music_config import generate_playlist, get_severity_level
from app.exercises.exercise_config import get_recommendations_for_level

# ML prediction inside same folder: app/controllers/ml_implementation.py
from app.controllers.ml_implementation import predict_migraine_score

from app.model.ml_input import MLInput

router = APIRouter()


# ---------------------------------------------
# TEST ROUTE
# ---------------------------------------------
@router.get("/users")
async def greet():
    return UserService.greet()


# ---------------------------------------------
# ROUTE 1: Recommend music by percentage
# ---------------------------------------------
@router.get("/music/recommend/{percentage}")
def recommend_music(percentage: int):
    if percentage < 0 or percentage > 100:
        raise HTTPException(status_code=400, detail="Percentage must be between 0 and 100")

    level = get_severity_level(percentage)
    playlist = generate_playlist(percentage)
    wellness = get_recommendations_for_level(level)

    return {
        "migraine_percentage": percentage,
        "severity_level": level,
        "playlist_length": len(playlist),
        "songs": playlist,
        "wellness_recommendations": wellness
    }


# ---------------------------------------------
# ROUTE 2: ML Prediction + Playlist + Wellness
# ---------------------------------------------
@router.post("/predict")
def predict_migraine(input: MLInput):
    """
    User enters health + lifestyle data.
    ML model returns predicted migraine score (0–100).
    Backend returns:
        - migraine score
        - severity level (1–4)
        - playlist
        - wellness recommendations
    """

    try:
        score = predict_migraine_score(
            age=input.age,
            stress_level=input.stress_level,
            gender=input.gender,
            menstrual_cycle=input.menstrual_cycle,
            sleep_duration=input.sleep_duration,
            pain_severity=input.pain_severity,
            light_sensitivity=input.light_sensitivity,
            noise_sensitivity=input.noise_sensitivity,
            food_intake=input.food_intake,
            water_intake=input.water_intake,
            weather_sunny=input.weather_sunny,
            weather_rainy=input.weather_rainy,
            weather_cloudy=input.weather_cloudy,
            weather_snowy=input.weather_snowy,
            exercise_frequency=input.exercise_frequency,
            caffeine_intake=input.caffeine_intake,
            screen_time=input.screen_time,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"ML prediction failed: {e}")

    # Clip prediction to 0–100
    score = max(0, min(100, score))

    # Convert score → severity
    level = get_severity_level(score)

    # Playlist + Wellness
    playlist = generate_playlist(score)
    wellness = get_recommendations_for_level(level)

    return {
        "predicted_migraine_score": score,
        "severity_level": level,
        "playlist_length": len(playlist),
        "songs": playlist,
        "wellness_recommendations": wellness
    }
