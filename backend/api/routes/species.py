from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from db.crud import species as crud_species
from db.session import get_db
from schemas.species import Species, SpeciesCreate, SpeciesUpdate

router = APIRouter()


@router.post("/species/", response_model=Species, status_code=status.HTTP_201_CREATED)
def create_new_species(species: SpeciesCreate, db: Session = Depends(get_db)):
    return crud_species.create_species(db=db, species=species)


@router.get("/species/", response_model=List[Species])
def read_all_species(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    species = crud_species.get_all_species(db=db, skip=skip, limit=limit)
    return species


@router.get("/species/{species_id}", response_model=Species)
def read_species(species_id: int, db: Session = Depends(get_db)):
    db_species = crud_species.get_species(db=db, species_id=species_id)
    if db_species is None:
        raise HTTPException(status_code=404, detail="Species not found")
    return db_species


@router.put("/species/{species_id}", response_model=Species)
def update_existing_species(species_id: int, species: SpeciesUpdate, db: Session = Depends(get_db)):
    db_species = crud_species.update_species(db=db, species_id=species_id, species=species)
    if db_species is None:
        raise HTTPException(status_code=404, detail="Species not found")
    return db_species


@router.delete("/species/{species_id}", response_model=Species)
def delete_existing_species(species_id: int, db: Session = Depends(get_db)):
    db_species = crud_species.delete_species(db=db, species_id=species_id)
    if db_species is None:
        raise HTTPException(status_code=404, detail="Species not found")
    return db_species