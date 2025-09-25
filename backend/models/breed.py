import enum
from sqlalchemy import Column, Integer, String, Float, Enum, ForeignKey
from sqlalchemy.orm import relationship

from backend.models.base import Base


class BreedProductionTypeEnum(str, enum.Enum):
    LAYER = "Layer"
    BROILER = "Broiler"
    DUAL_PURPOSE = "Dual_Purpose"


class Breed(Base):
    __tablename__ = "breeds"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False, unique=True)
    production_type = Column(
        Enum(BreedProductionTypeEnum, name="breed_production_type_enum"),
        nullable=False,
    )
    avg_adult_weight_kg = Column(Float, nullable=True)
    space_required_m2_per_bird = Column(Float, nullable=True)
    productive_lifespan_weeks = Column(Integer, nullable=True)
    sexual_maturity_age_weeks = Column(Integer, nullable=True)
    description = Column(String(255), nullable=True)

    species_id = Column(Integer, ForeignKey("species.id"), nullable=False)
    species = relationship("Species", back_populates="breeds")
