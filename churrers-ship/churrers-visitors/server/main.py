from pprint import pprint

from fastapi import FastAPI, Body
from fastapi.encoders import jsonable_encoder

from data.schema import VisitorSchema, MessageSchema
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from motor.motor_asyncio import AsyncIOMotorClient

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

connection_string = "mongodb://root:root@database:27017/visitorsapp?authSource=admin"
mongo_client = AsyncIOMotorClient(connection_string)
database = mongo_client.get_database("visitorsapp")

visitors_collection = database.get_collection("visitors")
messages_collection = database.get_collection("messages")


@app.get("/")
async def get_all_visitors():
    parsed_visitors = []
    async for visitor in visitors_collection.find().sort("timestamp", -1):
        parsed_visitors.append(__map_visitor_to_model(visitor))
    return {"visitors": parsed_visitors[0:10]}


@app.post("/")
async def create_visitor(visitor: VisitorSchema = Body(...)):
    visitor_parsed = jsonable_encoder(visitor)
    await visitors_collection.insert_one(visitor_parsed)
    return visitor


@app.get("/countries")
async def get_all_countries():
    return {"countries": await visitors_collection.distinct("country")}


@app.get("/cities")
async def get_all_cities():
    return {"cities": await visitors_collection.distinct("city")}


@app.get("/messages")
async def get_all_messages(length: int = 20):
    parsed_messages = []
    async for message in messages_collection.find().sort("timestamp", -1):
        parsed_messages.append(__map_message_to_model(message))
    return {"messages": parsed_messages[0:length]}


@app.post("/messages")
async def create_message(message: MessageSchema = Body(...)):
    message_parsed = jsonable_encoder(message)
    await messages_collection.insert_one(message_parsed)
    return message


def __map_visitor_to_model(visitor):
    return {
        "country": visitor["country"],
        "countryIso": visitor["countryIso"],
        "city": visitor["city"],
        "timeZone": visitor["timeZone"],
        "timestamp": visitor["timestamp"],
        "icon": "https://flagcdn.com/" + visitor["countryIso"].lower() + ".svg"
    }


def __map_message_to_model(message):
    return {
        "message": message["message"],
        "timestamp": message["timestamp"]
    }
