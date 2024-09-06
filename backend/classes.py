from pydantic import BaseModel


class RegisterClass(BaseModel):
    name: str
    phone: str
    password: str


class LoginClass(BaseModel):
    phone: str
    password: str


class TokenClass(BaseModel):
    token: str


class RecordClass(BaseModel):
    phone: str
    car: str
    service_name: str
    body_name: str
