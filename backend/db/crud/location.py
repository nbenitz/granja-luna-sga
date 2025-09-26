from sqlalchemy.orm import Session
from models import location as models
from schemas import location as schemas

def create_location(db: Session, location: schemas.LocationCreate):
    db_location = models.Location(**location.model_dump())
    db.add(db_location)
    db.commit()
    db.refresh(db_location)
    return db_location

def get_location(db: Session, location_id: int):
    return db.query(models.Location).filter(models.Location.id == location_id).first()

def get_all_locations(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Location).offset(skip).limit(limit).all()

def update_location(db: Session, location_id: int, location: schemas.LocationUpdate):
    db_location = db.query(models.Location).filter(models.Location.id == location_id).first()
    if db_location:
        for key, value in location.model_dump(exclude_unset=True).items():
            setattr(db_location, key, value)
        db.commit()
        db.refresh(db_location)
    return db_location

def delete_location(db: Session, location_id: int):
    db_location = db.query(models.Location).filter(models.Location.id == location_id).first()
    if db_location:
        db.delete(db_location)
        db.commit()
    return db_location
