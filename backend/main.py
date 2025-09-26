from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import species, breed, location

app = FastAPI()

origins = [
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(species.router, prefix="/api")
app.include_router(breed.router, prefix="/api")
app.include_router(location.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Backend is running and connected"}

@app.get("/health")
def read_health():
    return {"status": "ok"}