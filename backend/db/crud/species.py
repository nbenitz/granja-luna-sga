from sqlalchemy.orm import Session

from models.species import Species
from schemas.species import SpeciesCreate, SpeciesUpdate

def create_species(db: Session, species: SpeciesCreate):
    db_species = Species(name=species.name, incubation_period_days=species.incubation_period_days, description=species.description)
    db.add(db_species)
    db.commit()
    db.refresh(db_species)
    return db_species

def get_species(db: Session, species_id: int):
    return db.query(Species).filter(Species.id == species_id).first()

def get_all_species(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Species).offset(skip).limit(limit).all()

def update_species(db: Session, species_id: int, species: SpeciesUpdate):
    db_species = db.query(Species).filter(Species.id == species_id).first()
    if db_species:
        db_species.name = species.name
        db_species.incubation_period_days = species.incubation_period_days
        db_species.description = species.description
        db.commit()
        db.refresh(db_species)
    return db_species

def delete_species(db: Session, species_id: int):
    db_species = db.query(Species).filter(Species.id == species_id).first()
    if db_species:
        db.delete(db_species)
        db.commit()
    return db_species