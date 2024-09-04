import sqlalchemy

from sqlalchemy import text


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
                        FOREIGN KEY (user_id) REFERENCES users(id),
                        FOREIGN KEY (service_id) REFERENCES services(id),
                        FOREIGN KEY (body_id) REFERENCES bodies(id)
                        )
        """
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
    return True


def is_phone(conn: sqlalchemy.Connection, phone: str) -> int:
    return len(
        list(conn.execute(text(f"""SELECT * FROM users WHERE phone='{phone}'""")))
    )


def get_user_info(conn: sqlalchemy.Connection, phone: str):
    return list(
        conn.execute(text(f"SELECT password, token from users WHERE phone='{phone}'"))
    )[0]
