from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers.userController import router as user_router


app = FastAPI(
    title="Rosetta Backend API",
    description="API for the Rosetta Backend service.",
    version="1.0.0",
)
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
