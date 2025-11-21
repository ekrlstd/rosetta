from pydantic import BaseModel

class MLInput(BaseModel):
    age: int
    stress_level: float
    gender: int
    menstrual_cycle: int
    sleep_duration: float
    pain_severity: float
    light_sensitivity: float
    noise_sensitivity: float
    food_intake: float
    water_intake: float
    weather_sunny: int
    weather_rainy: int
    weather_cloudy: int
    weather_snowy: int
    exercise_frequency: float
    caffeine_intake: float
    screen_time: float
