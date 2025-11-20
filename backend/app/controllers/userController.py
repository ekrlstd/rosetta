from fastapi import APIRouter, HTTPException
router = APIRouter()

@router.get("/users")
async def greet():
    return {"message": "Hello, User!"}