from pydantic import BaseModel
from datetime import date
from models.location import LocationTypeEnum, LocationPurposeEnum, LocationStatusEnum

class LocationBase(BaseModel):
    name: str
    location_type: LocationTypeEnum
    purpose: LocationPurposeEnum
    usable_area_sqm: float
    current_status: LocationStatusEnum = LocationStatusEnum.AVAILABLE
    construction_date: date | None = None
    notes: str | None = None

class LocationCreate(LocationBase):
    pass

class LocationUpdate(LocationBase):
    pass

class Location(LocationBase):
    id: int

    class Config:
        from_attributes = True
