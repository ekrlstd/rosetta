from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers.userController import router as user_router
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from app.telemetry import init_telemetry

# Initialize Telemetry
init_telemetry()


app = FastAPI(
    title="Rosetta Backend API",
    description="API for the Rosetta Backend service.",
    version="1.0.0",
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
    return {"Hello": "World"}
