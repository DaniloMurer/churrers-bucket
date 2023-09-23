from pydantic import BaseModel, Field

class VisitorSchema(BaseModel):
    country: str = Field(...)
    countryIso: str = Field(...)
    city: str = Field(...)
    timeZone: str = Field(...)
    timestamp: str = Field(...)

class MessageSchema(BaseModel):
    message: str = Field(...)
    timestamp: str = Field(...)