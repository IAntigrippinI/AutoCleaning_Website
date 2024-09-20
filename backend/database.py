import sqlalchemy
import datetime

from sqlalchemy import text, create_engine
from sqlalchemy.orm import sessionmaker

# from creds import POSTGRES_URL


# def create_db():
#     # conn = sessionmaker(bind=create_engine(POSTGRES_URL))()
#     # conn.execute(text("""CREATE DATABASE autocleaning """))
#     # conn.commit()
#     # conn.close()

#     eng = create_engine(POSTGRES_URL)
#     conn = eng.connect()
#     conn.connection.connection.set_isolation_level(0)
#     conn.execute(text("create database autocleaning"))
#     conn.connection.connection.set_isolation_level(1)
#     conn.close()


def create_tables(conn: sqlalchemy.Connection) -> None:

    conn.execute(
        text(
            """
            CREATE TABLE IF NOT EXISTS users(
                    id SERIAL,
                    name TEXT,
                    phone CHAR(11),
                    password TEXT,
                    token TEXT,
                    washes INT,
                    sales FLOAT, 
                    superuser INT DEFAULT '0',
                    UNIQUE(id)
                    )
        """
        )
    )

    conn.execute(
        text(
            """
            CREATE TABLE IF NOT EXISTS services(
                        id SERIAL NOT NULL,
                        name TEXT,
                        price FLOAT,
                        UNIQUE(id)
                        )
        """
        )
    )

    conn.execute(
        text(
            """
CREATE TABLE IF NOT EXISTS bodies(
                      id SERIAL NOT NULL,
                      name TEXT,
                      coeff FLOAT,
                      UNIQUE(id)
                      )
"""
        )
    )

    conn.execute(
        text(
            """
            CREATE TABLE IF NOT EXISTS orders(
                        id SERIAL NOT NULL,
                        time TIMESTAMP,
                        user_id INT,
                        car TEXT,
                        service_id INT,
                        body_id INT,
                        price FLOAT,
                        FOREIGN KEY (user_id) REFERENCES users(id),
                        FOREIGN KEY (service_id) REFERENCES services(id),
                        FOREIGN KEY (body_id) REFERENCES bodies(id)
                        )
        """
        )
    )

    conn.commit()


def fill_databases(conn: sqlalchemy.Connection):
    if len(list(conn.execute(text("SELECT * FROM bodies")))) != 0:
        return 1
    conn.execute(
        text(
            """INSERT INTO services (name, price) VALUES ('Мойка кузова', 800), ('Химчистка', 8000)"""
        )
    )
    conn.execute(
        text(
            """INSERT INTO bodies (name, coeff) VALUES ('седан', 1), ('универсал', 1.1)"""
        )
    )
    conn.commit()


def register_user(conn: sqlalchemy.Connection, data: dict) -> bool:
    conn.execute(
        text(
            f"""
    INSERT INTO users (name, phone, password, token, washes, sales, superuser) VALUES ('{data['name']}', '{data['phone']}', '{data['password']}', '{data['token']}', 0, 0, 0)
    """
        )
    )
    conn.commit()
    print("user was registr")
    return True


def is_phone(conn: sqlalchemy.Connection, phone: str) -> int:
    return len(
        list(conn.execute(text(f"""SELECT * FROM users WHERE phone='{phone}'""")))
    )


def get_user_info(conn: sqlalchemy.Connection, phone: str):
    return list(
        conn.execute(text(f"SELECT password, token from users WHERE phone='{phone}'"))
    )[0]


def get_all_user_info(conn: sqlalchemy.Connection, token: str):
    data = list(conn.execute(text(f"SELECT * FROM users WHERE token='{token}'")))[0]
    print(f"issuperuser {data[7]}")
    return {
        "userid": data[0],
        "name": data[1],
        "phone": data[2],
        "washes": data[5],
        "sales": data[6],
        "issuperuser": data[7],
    }


def get_user_id(conn: sqlalchemy.Connection, phone: str):
    return list(conn.execute(text(f"SELECT id FROM users WHERE phone='{phone}'")))[0][0]


def get_service_id(conn: sqlalchemy.Connection, service_name: str):
    return list(
        conn.execute(text(f"SELECT id FROM services WHERE name='{service_name}'"))
    )[0][0]


def get_body_id(conn: sqlalchemy.Connection, body_name: str):
    return list(conn.execute(text(f"SELECT id FROM bodies WHERE name='{body_name}'")))[
        0
    ][0]


def update_sales(conn: sqlalchemy.Connection, user_id: int, sale: float):
    conn.execute(text(f"UPDATE users SET sales={sale} WHERE id = {user_id}"))
    conn.commit()


def add_washes(conn: sqlalchemy.Connection, user_id: int):
    conn.execute(text(f"UPDATE users SET washes = washes + 1 where id={user_id}"))
    conn.commit()
    user_sale = list(
        conn.execute(text(f"SELECT washes FROM users WHERE id={user_id}"))
    )[0][0]
    print(f"new sale is {user_sale} = {user_sale//200} ")
    update_sales(conn, user_id, user_sale / 200)
    conn.commit()


def add_record_db(conn: sqlalchemy.Connection, data: dict):
    conn.execute(
        text(
            f"""INSERT INTO orders (time, user_id, car,service_id, body_id, price) VALUES(
                      '{datetime.datetime.now()}', 
                       {data['user_id']},
                        '{data['car']}',
                        {data['service_id']},
                        {data['body_id']},
                        {data['price']}
                       )"""
        )
    )
    add_washes(conn, data["user_id"])
    conn.commit()


def get_value(
    conn: sqlalchemy.Connection,
    name_db: str,
    need_value: str,
    by_value: str,
    value: any,
) -> any:
    print(f"SELECT {need_value} FROM {name_db} WHERE {by_value} = '{value}'")
    print(
        list(
            conn.execute(
                text(f"SELECT {need_value} FROM {name_db} WHERE {by_value} = '{value}'")
            )
        )
    )
    return list(
        conn.execute(
            text(f"SELECT {need_value} FROM {name_db} WHERE {by_value} = '{value}'")
        )
    )[0][0]


def get_history(conn: sqlalchemy.Connection, user_id):
    return list(
        conn.execute(
            text(
                f"""select t1.time, t1.car, t2.name, t1.price from 
    orders as t1
    inner join services as t2 
    on t1.service_id = t2.id  
    WHERE user_id={user_id}"""
            )
        )
    )
