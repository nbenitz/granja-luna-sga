import enum
from sqlalchemy import Column, Integer, String, Float, Enum, Date, Text

from backend.models.base import Base


class LocationTypeEnum(str, enum.Enum):
    CLIMATE_CONTROLLED_SHED = "Climate_Controlled_Shed"
    OPEN_SHED = "Open_Shed"
    PEN = "Pen"
    CAGE_BATTERY = "Cage_Battery"


class LocationPurposeEnum(str, enum.Enum):
    BROODING = "Brooding"
    REARING = "Rearing"
    LAYING = "Laying"
    FATTENING = "Fattening"
    BREEDING = "Breeding"
    QUARANTINE = "Quarantine"
    INFIRMARY = "Infirmary"


class LocationStatusEnum(str, enum.Enum):
    AVAILABLE = "Available"
    OCCUPIED = "Occupied"
    CLEANING = "Cleaning"
    MAINTENANCE = "Maintenance"


class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False, unique=True)
    location_type = Column(
        Enum(LocationTypeEnum, name="location_type_enum"), nullable=False
    )
    purpose = Column(
        Enum(LocationPurposeEnum, name="location_purpose_enum"), nullable=False
    )
    usable_area_sqm = Column(Float, nullable=False)
    current_status = Column(
        Enum(LocationStatusEnum, name="location_status_enum"),
        nullable=False,
        default=LocationStatusEnum.AVAILABLE,
    )
    construction_date = Column(Date, nullable=True)
    notes = Column(Text, nullable=True)
