import numpy as np
import os
import xgboost as xgb

# -------------------------------------------------------------------
# Load JSON model
# -------------------------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "ml", "xgb_migraine_model.json")
MODEL_PATH = os.path.abspath(MODEL_PATH)

print(f"📌 Loading ML model from: {MODEL_PATH}")

model = xgb.Booster()
model.load_model(MODEL_PATH)

# REAL MODEL FEATURE ORDER
FEATURE_ORDER = [
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

print("✅ Model loaded successfully with 17 features.")
print("🔎 Feature order:", FEATURE_ORDER)


# -------------------------------------------------------------------
# Prediction (correct, final)
# -------------------------------------------------------------------
def predict_migraine_score(
    age,
    stress_level,
    gender,
    menstrual_cycle,
    sleep_duration,
    pain_severity,
    light_sensitivity,
    noise_sensitivity,
    food_intake,
    water_intake,
    weather_sunny,
    weather_rainy,
    weather_cloudy,
    weather_snowy,
    exercise_frequency,
    caffeine_intake,
    screen_time
):

    # Build feature array IN EXACT MODEL ORDER:
    features = np.array([[
        age,                # 1
        stress_level,       # 2
        gender,             # 3
        menstrual_cycle,    # 4
        sleep_duration,     # 5
        pain_severity,      # 6
        light_sensitivity,  # 7
        noise_sensitivity,  # 8
        food_intake,        # 9
        water_intake,       # 10
        caffeine_intake,    # 11
        exercise_frequency, # 12
        screen_time,        # 13
        weather_sunny,      # 14
        weather_cloudy,     # 15
        weather_rainy,      # 16
        weather_snowy       # 17
    ]], dtype=float)

    dmatrix = xgb.DMatrix(features, feature_names=FEATURE_ORDER)

    prediction = model.predict(dmatrix)

    return float(prediction[0])
