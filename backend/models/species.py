from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from models.base import Base


class Species(Base):
    __tablename__ = "species"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(50), nullable=False, unique=True)
    incubation_period_days = Column(Integer, nullable=False)
    description = Column(String(255), nullable=True)

    breeds = relationship("Breed", back_populates="species")
