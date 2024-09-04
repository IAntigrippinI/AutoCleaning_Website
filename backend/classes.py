from pydantic import BaseModel


class RegisterClass(BaseModel):
    name: str
    phone: str
    password: str
    token: str


class LoginClass(BaseModel):
    phone: str
    password: str
