import jwt

from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder

from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

from database import create_tables, register_user, get_user_info, is_phone

from classes import RegisterClass, LoginClass

from creds import DB_URL, SECRET_KEY, ALGORITHM

router = APIRouter()


conn = sessionmaker(bind=create_engine(DB_URL))()
create_tables(conn)


@router.get("/status")
async def status():
    return "OK"


@router.post("/register")
async def register(register_item: RegisterClass):
    data = jsonable_encoder(register_item)
    data["token"] = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
    if is_phone(conn, data["phone"]):
        return {"message": f"user with number {data['phone']} already registered"}
    register_user(conn, data)
    return {"message": data["token"]}


@router.post("/login")
def login(login_item: LoginClass):
    data = jsonable_encoder(login_item)
    if is_phone(conn, data["phone"]):
        user_data = get_user_info(conn, data["phone"])
        if user_data[0] == data["password"]:
            return {"message": user_data[1]}
        else:
            return {"message": "incorrect password"}
    else:
        return {"message": f"user with phone {data['phone']} does not exists"}
    print(data["password"])
