from dataclasses import dataclass
from typing import List

@dataclass
class MigrainePrediction:
    risk_percentage: float
    risk_level: str
    confidence: float
    key_factors: List[str]

@dataclass
class UserFeatures:
    sleep_hours: float
    sleep_quality: int
    stress_level: int
    caffeine_intake: int
    alcohol_consumed: bool
    hydration_liters: float
    skipped_meals: bool
    sensory_exposure: bool
    neck_tension: bool
    fatigue: bool
    mood_changes: bool
    menstrual_day: Optional[int]