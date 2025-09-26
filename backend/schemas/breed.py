from pydantic import BaseModel
from models.breed import BreedProductionTypeEnum

class BreedBase(BaseModel):
    name: str
    production_type: BreedProductionTypeEnum
    avg_adult_weight_kg: float | None = None
    space_required_m2_per_bird: float | None = None
    productive_lifespan_weeks: int | None = None
    sexual_maturity_age_weeks: int | None = None
    description: str | None = None
    species_id: int

class BreedCreate(BreedBase):
    pass

class BreedUpdate(BreedBase):
    pass

class Breed(BreedBase):
    id: int

    class Config:
        from_attributes = True