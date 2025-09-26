from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas import location as schemas
from db.crud import location as crud
from db.session import get_db

router = APIRouter()

@router.post("/locations/", response_model=schemas.Location, status_code=201)
def create_location_endpoint(location: schemas.LocationCreate, db: Session = Depends(get_db)):
    return crud.create_location(db=db, location=location)

@router.get("/locations/", response_model=list[schemas.Location])
def read_all_locations(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    locations = crud.get_all_locations(db, skip=skip, limit=limit)
    return locations

@router.get("/locations/{location_id}", response_model=schemas.Location)
def read_location(location_id: int, db: Session = Depends(get_db)):
    db_location = crud.get_location(db, location_id=location_id)
    if db_location is None:
        raise HTTPException(status_code=404, detail="Location not found")
    return db_location

@router.put("/locations/{location_id}", response_model=schemas.Location)
def update_location_endpoint(location_id: int, location: schemas.LocationUpdate, db: Session = Depends(get_db)):
    db_location = crud.update_location(db, location_id=location_id, location=location)
    if db_location is None:
        raise HTTPException(status_code=404, detail="Location not found")
    return db_location

@router.delete("/locations/{location_id}", response_model=schemas.Location)
def delete_location_endpoint(location_id: int, db: Session = Depends(get_db)):
    db_location = crud.delete_location(db, location_id=location_id)
    if db_location is None:
        raise HTTPException(status_code=404, detail="Location not found")
    return db_location
