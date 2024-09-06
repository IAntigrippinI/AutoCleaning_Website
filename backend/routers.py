import jwt

from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder

from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

from database import (
    create_tables,
    fill_databases,
    register_user,
    get_user_info,
    is_phone,
    get_all_user_info,
    add_record_db,
    get_history,
)

from utils import refactor_data, get_price

from classes import RegisterClass, LoginClass, TokenClass, RecordClass

from creds import DB_URL, SECRET_KEY, ALGORITHM

router = APIRouter()


conn = sessionmaker(bind=create_engine(DB_URL))()
create_tables(conn)
fill_databases(conn)


@router.get("/status")
async def status():
    return "OK"


@router.post("/register")
async def register(register_item: RegisterClass):
    try:
        data = jsonable_encoder(register_item)
        data["token"] = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
        if is_phone(conn, data["phone"]):
            print("user exists")
            return {"message": f"user with number {data['phone']} already registered"}
        register_user(conn, data)
        return {"message": data["token"]}
    except:
        return {
            "log_status": "FAILED",
            "message": f"Server error ",
        }


@router.post("/login")
def login(login_item: LoginClass):
    try:
        data = jsonable_encoder(login_item)
        if is_phone(conn, data["phone"]):
            user_data = get_user_info(conn, data["phone"])
            if user_data[0] == data["password"]:
                return {"log_status": "OK", "message": user_data[1]}
            else:
                return {"log_status": "FAILED", "message": "неверный пароль"}
        else:
            return {
                "log_status": "FAILED",
                "message": f"Пользователя с номером {data['phone']} не существует ",
            }
        print(data["password"])
    except Exception as e:
        print(e)
        return {
            "log_status": "FAILED",
            "message": f"Server error ",
        }


@router.post("/get_profile")
async def get_profile(get_profile_item: TokenClass):
    token = jsonable_encoder(get_profile_item)
    return get_all_user_info(conn, token["token"])


@router.post("/add_record")
async def add_record(add_record_item: RecordClass):
    data = jsonable_encoder(add_record_item)
    new_data = refactor_data(conn, data)
    price = get_price(conn, data)["price"]
    new_data["price"] = price
    add_record_db(conn, new_data)
    print("new data:", new_data)


@router.post("/get_price")
async def count_price(add_record_item: RecordClass):
    data = jsonable_encoder(add_record_item)
    return get_price(conn, data)


@router.get("/get_user_history")
async def get_user_history(user_id: int):
    history = get_history(conn, user_id)
    # print(history)
    res = {"res": []}

    for el in history:
        res["res"].append(
            {"date": el[0], "car": el[1], "service": el[2], "price": el[3]}
        )
    return res
