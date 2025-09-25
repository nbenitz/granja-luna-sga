from backend.db.session import engine
from backend.models.base import Base
from backend.models.species import Species
from backend.models.breed import Breed
from backend.models.location import Location


def init_db():
    print("Creating all tables in the database...")
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully.")


if __name__ == "__main__":
    init_db()
