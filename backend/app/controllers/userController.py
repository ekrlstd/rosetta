from fastapi import APIRouter, HTTPException
from app.services.userService import UserService
router = APIRouter()

@router.get("/users")
async def greet():
    return UserService.greet()