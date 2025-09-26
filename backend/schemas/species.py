from typing import Optional

from pydantic import BaseModel


class SpeciesBase(BaseModel):
    name: str
    incubation_period_days: int
    description: Optional[str] = None


class SpeciesCreate(SpeciesBase):
    pass


class SpeciesUpdate(SpeciesBase):
    pass


class Species(SpeciesBase):
    id: int

    class Config:
        from_attributes = True