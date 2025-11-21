import joblib
import xgboost as xgb
import os

# Path of current file (export_model.py)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Build absolute path to the model file
MODEL_PATH = os.path.join(BASE_DIR, "xgb_migraine_model.pkl")

print("Loading old pickle model from:", MODEL_PATH)

# Load model
model = joblib.load(MODEL_PATH)

# Define feature names
feature_names = [
    "age",
    "stress_level",
    "gender",
    "menstrual_cycle",
    "sleep_duration",
    "pain_severity",
    "light_sensitivity",
    "noise_sensitivity",
    "food_intake",
    "water_intake",
    "caffeine_intake",
    "exercise_frequency",
    "screen_time",
    "weather_sunny",
    "weather_cloudy",
    "weather_rainy",
    "weather_snowy"
]

# Apply feature names
booster = model.get_booster()
booster.feature_names = feature_names

# Save JSON
OUTPUT_PATH = os.path.join(BASE_DIR, "xgb_migraine_model.json")
booster.save_model(OUTPUT_PATH)

print("DONE — Saved JSON model to:", OUTPUT_PATH)
