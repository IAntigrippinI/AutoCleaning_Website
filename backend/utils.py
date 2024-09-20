import sqlalchemy

from database import get_user_id, is_phone, get_service_id, get_body_id, get_value


def refactor_data(conn: sqlalchemy.Connection, data: dict) -> dict:
    if is_phone(conn, data["phone"]):
        user_id = get_user_id(conn, data["phone"])
        service_id = get_service_id(conn, data["service_name"])
        body_id = get_body_id(conn, data["body_name"])
        print(user_id, service_id, body_id)
        return {
            "user_id": user_id,
            "car": data["car"],
            "service_id": service_id,
            "body_id": body_id,
        }


def get_price(conn: sqlalchemy.Connection, data: dict) -> float:
    price = get_value(
        conn, "services", "price", by_value="name", value=data["service_name"]
    )
    coeff = get_value(conn, "bodies", "coeff", "name", data["body_name"])
    sales = get_value(conn, "users", "sales", "phone", data["phone"])
    print(f"sales user {sales}")
    print(f"sale: {float(price) * float(coeff) * (1 - sales)}")
    return {"price": round(float(price) * float(coeff) * (1 - sales), 0)}
