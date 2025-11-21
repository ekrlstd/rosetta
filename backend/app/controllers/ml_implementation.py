import numpy as np
import joblib
import os

# Loading the trained model

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "..", "..", "ml", "xgb_migraine_model.pkl")
MODEL_PATH = os.path.abspath(MODEL_PATH)

model = joblib.load(MODEL_PATH)


# Prediction function
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
    # We're taking in frontend variables, builds a feature vector, runs the ML model, and returns the predicted migraine score.

    # Convert inputs into the correct shape (1 row, 14 features)
    input_features = np.array([[
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
        caffeine_intake,
        exercise_frequency,
        screen_time,
        weather_sunny,
        weather_cloudy,
        weather_rainy,
        weather_snowy
    ]], dtype=float)

    # Getting prediction from the model
    prediction = model.predict(input_features)

    return float(prediction[0])


# Testing
if __name__ == "__main__":
    print("Testing ML prediction...")
    result = predict_migraine_score(
        age=28,
        stress_level=8,
        gender=1,
        menstrual_cycle=0,
        sleep_duration=2,
        pain_severity=7,
        light_sensitivity=1,
        noise_sensitivity=1,
        food_intake=3,
        water_intake=4,
        weather_sunny=0,
        weather_rainy=1,
        weather_cloudy=0,
        weather_snowy=0,
        exercise_frequency=1,
        caffeine_intake=4,
        screen_time=8
    )
    print("Predicted Migraine Score:", result)
