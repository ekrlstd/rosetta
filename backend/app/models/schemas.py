from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

# Request Schemas
class UserInput(BaseModel):
    sleep_hours: float = Field(..., ge=0, le=24, description="Hours of sleep")
    sleep_quality: int = Field(..., ge=1, le=5, description="Sleep quality 1-5")
    stress_level: int = Field(..., ge=1, le=10, description="Stress level 1-10")
    caffeine_intake: int = Field(..., ge=0, description="Caffeine in mg")
    alcohol_consumed: bool = Field(..., description="Alcohol consumed")
    hydration_liters: float = Field(..., ge=0, description="Water intake in liters")
    skipped_meals: bool = Field(..., description="Skipped any meals")
    sensory_exposure: bool = Field(..., description="Bright lights/loud noises")
    neck_tension: bool = Field(..., description="Neck/shoulder tension")
    fatigue: bool = Field(..., description="Feeling fatigued")
    mood_changes: bool = Field(..., description="Mood changes")
    menstrual_day: Optional[int] = Field(None, ge=0, le=28, description="Day of cycle")

# Response Schemas
class PredictionResponse(BaseModel):
    migraine_risk: float = Field(..., ge=0, le=100, description="Risk percentage")
    risk_level: str = Field(..., description="low/moderate/high/critical")
    confidence: float = Field(..., description="Model confidence")

class Recommendation(BaseModel):
    type: str  # "music", "exercise", "environment", "nutrition"
    title: str
    description: str
    action: str
    urgency: str

class FullResponse(BaseModel):
    prediction: PredictionResponse
    recommendations: List[Recommendation]
    triggers_detected: List[str]
    timestamp: datetime

class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    version: str