import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
import ssl

from routers import router

# origins = [
#     "http://localhost:5173",
#     "http://127.0.0.1:5173",
#     "http://10.23.6.14:5173",
#     "http://0.0.0.0:80",
#     "http://localhost:80",
# ]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
