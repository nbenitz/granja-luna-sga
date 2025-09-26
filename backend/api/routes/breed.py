from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas import breed as schemas
from db.crud import breed as crud
from db.session import get_db

router = APIRouter()

@router.post("/breeds/", response_model=schemas.Breed, status_code=201)
def create_breed_endpoint(breed: schemas.BreedCreate, db: Session = Depends(get_db)):
    return crud.create_breed(db=db, breed=breed)

@router.get("/breeds/", response_model=list[schemas.Breed])
def read_all_breeds(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    breeds = crud.get_all_breeds(db, skip=skip, limit=limit)
    return breeds

@router.get("/breeds/{breed_id}", response_model=schemas.Breed)
def read_breed(breed_id: int, db: Session = Depends(get_db)):
    db_breed = crud.get_breed(db, breed_id=breed_id)
    if db_breed is None:
        raise HTTPException(status_code=404, detail="Breed not found")
    return db_breed

@router.put("/breeds/{breed_id}", response_model=schemas.Breed)
def update_breed_endpoint(breed_id: int, breed: schemas.BreedUpdate, db: Session = Depends(get_db)):
    db_breed = crud.update_breed(db, breed_id=breed_id, breed=breed)
    if db_breed is None:
        raise HTTPException(status_code=404, detail="Breed not found")
    return db_breed

@router.delete("/breeds/{breed_id}", response_model=schemas.Breed)
def delete_breed_endpoint(breed_id: int, db: Session = Depends(get_db)):
    db_breed = crud.delete_breed(db, breed_id=breed_id)
    if db_breed is None:
        raise HTTPException(status_code=404, detail="Breed not found")
    return db_breed