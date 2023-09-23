from pydantic import BaseModel

class VisitorModel(BaseModel):
    country: str
    countryIso: str
    city: str
    timeZone: str
    timestamp: str


class MessageModel(BaseModel):
    message: str
    timestamp: str
