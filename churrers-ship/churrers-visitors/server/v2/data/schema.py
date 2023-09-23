from pydantic import BaseModel, Field

class VisitorModel(BaseModel):
    country: str = Field(...)
    countryIso: str = Field(...)
    city: str = Field(...)
    timeZone: str = Field(...)
    timestamp: str = Field(...)

class MessageModel(BaseModel):
    message: str = Field(...)
    timestamp: str = Field(...)