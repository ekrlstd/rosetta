from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers.userController import router as user_router
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from app.telemetry import init_telemetry

# Initialize Telemetry
import os
OTEL_ENDPOINT = os.getenv("OTEL_EXPORTER_OTLP_ENDPOINT", "http://46.62.229.59")
API_KEY = os.getenv("SKYVIEW_API_KEY", "")

init_telemetry(
    service_name="rosetta-backend",
    endpoint=OTEL_ENDPOINT,
    api_key=API_KEY
)


app = FastAPI(
    title="Rosetta Backend API",
    description="API for the Rosetta Backend service.",
    version="1.0.0",
)

# Create logger
import logging
logger = logging.getLogger(__name__)
logger.info("🚀 Rosetta Backend Starting Up! Telemetry initialized.")

# Instrument FastAPI
FastAPIInstrumentor.instrument_app(app)

app.include_router(user_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    logger.info("✅ Root endpoint called - Connection Successful")
    return {"Hello": "World"}
