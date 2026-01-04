from fastapi import APIRouter, HTTPException
from app.services.userService import UserService
from app.music.music_config import generate_playlist, get_severity_level
from app.exercises.exercise_config import get_recommendations_for_level

# ML prediction inside same folder: app/controllers/ml_implementation.py
from app.controllers.ml_implementation import predict_migraine_score

from app.model.ml_input import MLInput
import logging

# Configure logger
logger = logging.getLogger(__name__)

router = APIRouter()


# ---------------------------------------------
# TEST ROUTE
# ---------------------------------------------
@router.get("/users")
async def greet():
    logger.info("👋 Health check / user greet endpoint called")
    return UserService.greet()


# ---------------------------------------------
# ROUTE 1: Recommend music by percentage
# ---------------------------------------------
@router.get("/music/recommend/{percentage}")
def recommend_music(percentage: int):
    logger.info(f"🎵 Request received for music recommendation: percentage={percentage}")
    
    if percentage < 0 or percentage > 100:
        logger.warning(f"⚠️ Invalid percentage provided: {percentage}")
        raise HTTPException(status_code=400, detail="Percentage must be between 0 and 100")

    level = get_severity_level(percentage)
    playlist = generate_playlist(percentage)
    wellness = get_recommendations_for_level(level)

    logger.info(f"✅ Generated recommendation: Level={level}, Playlist songs={len(playlist)}")

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
    
    logger.info(f"🧠 Received migraine prediction request. Age={input.age}, Gender={input.gender}, Stress={input.stress_level}, Sleep={input.sleep_duration}h")

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
        logger.error(f"❌ ML Model prediction failed: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"ML prediction failed: {e}")

    # Clip prediction to 0–100
    score = max(0, min(100, score))

    # Convert score → severity
    level = get_severity_level(score)

    # Playlist + Wellness
    playlist = generate_playlist(score)
    wellness = get_recommendations_for_level(level)

    logger.info(f"✨ Prediction successful: Score={score:.2f}, Severity={level}, Recommended Songs={len(playlist)}")

    return {
        "predicted_migraine_score": score,
        "severity_level": level,
        "playlist_length": len(playlist),
        "songs": playlist,
        "wellness_recommendations": wellness
    }
