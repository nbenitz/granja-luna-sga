from sqlalchemy.orm import Session
from models import breed as models
from schemas import breed as schemas

def create_breed(db: Session, breed: schemas.BreedCreate):
    db_breed = models.Breed(**breed.model_dump())
    db.add(db_breed)
    db.commit()
    db.refresh(db_breed)
    return db_breed

def get_breed(db: Session, breed_id: int):
    return db.query(models.Breed).filter(models.Breed.id == breed_id).first()

def get_all_breeds(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Breed).offset(skip).limit(limit).all()

def update_breed(db: Session, breed_id: int, breed: schemas.BreedUpdate):
    db_breed = db.query(models.Breed).filter(models.Breed.id == breed_id).first()
    if db_breed:
        for key, value in breed.model_dump(exclude_unset=True).items():
            setattr(db_breed, key, value)
        db.commit()
        db.refresh(db_breed)
    return db_breed

def delete_breed(db: Session, breed_id: int):
    db_breed = db.query(models.Breed).filter(models.Breed.id == breed_id).first()
    if db_breed:
        db.delete(db_breed)
        db.commit()
    return db_breed