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

# Create a request counter metric
from opentelemetry import metrics
meter = metrics.get_meter(__name__)
request_counter = meter.create_counter(
    "http_requests_total",
    description="Total HTTP requests",
    unit="1"
)

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
    request_counter.add(1, {"endpoint": "/", "method": "GET"})
    logger.info("✅ Root endpoint called - Connection Successful")
    return {"Hello": "World"}

@app.get("/test-error")
async def test_error():
    """Endpoint to test error tracking in observability"""
    from opentelemetry import trace as otel_trace
    from opentelemetry.trace import Status, StatusCode
    
    request_counter.add(1, {"endpoint": "/test-error", "method": "GET"})
    
    # Get current span and record the error explicitly
    current_span = otel_trace.get_current_span()
    
    try:
        logger.error("🔥 Intentional error triggered for testing observability!")
        raise ValueError("This is a test error to verify observability is working!")
    except Exception as e:
        # Record exception on the span
        current_span.record_exception(e)
        current_span.set_status(Status(StatusCode.ERROR, str(e)))
        raise  # Re-raise to return 500
