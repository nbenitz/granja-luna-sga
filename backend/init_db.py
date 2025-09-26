from db.session import engine
from models.base import Base
from models.species import Species
from models.breed import Breed
from models.location import Location


def init_db():
    print("Creating all tables in the database...")
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully.")


if __name__ == "__main__":
    init_db()
