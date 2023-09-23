from fastapi import FastAPI
from data.model import VisitorModel, MessageModel
from typing import Optional
from motor.motor_asyncio import AsyncIOMotorClient

app = FastAPI()

fake_employees = [{"first_name": "Danilo", "last_name": "Jakob", "age": 19}, {"first_name": "Nico", "last_name": "Jakob", "age": 18}]
employees = []

connection_string = "mongodb://root:root@localhost:27017"
mongo_client = AsyncIOMotorClient(connection_string)
database = mongo_client.get_database("visitorsapp")

visitors_collection = database.get_collection("visitors")
messages_collection = database.get_collection("messages")

@app.get("/")
async def get_all_visitors():
    return {"data": "hello world"}

@app.post("/")
async def create_visitor(visitor: VisitorModel):
    return visitor

@app.get("/countries")
async def get_all_countries():
    return []

@app.get("/cities")
async def get_all_cities():
    return []

@app.get("/messages")
async def get_all_messages():
    return []

@app.post("/messages")
async def create_message(message: MessageModel):
    return message