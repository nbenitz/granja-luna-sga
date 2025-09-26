from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from schemas.species import SpeciesCreate

def test_create_species(client: TestClient, session: Session):
    species_data = {
        "name": "Chicken",
        "incubation_period_days": 21,
        "description": "Common farm bird"
    }
    response = client.post("/api/species/", json=species_data)
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == species_data["name"]
    assert data["incubation_period_days"] == species_data["incubation_period_days"]
    assert data["description"] == species_data["description"]
    assert "id" in data

def test_read_species(client: TestClient, session: Session):
    species_data = {
        "name": "Duck",
        "incubation_period_days": 28,
        "description": "Waterfowl"
    }
    create_response = client.post("/api/species/", json=species_data)
    species_id = create_response.json()["id"]

    response = client.get(f"/api/species/{species_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == species_data["name"]

def test_read_all_species(client: TestClient, session: Session):
    response = client.get("/api/species/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_update_species(client: TestClient, session: Session):
    species_data = {
        "name": "Turkey",
        "incubation_period_days": 28,
        "description": "Large bird"
    }
    create_response = client.post("/api/species/", json=species_data)
    species_id = create_response.json()["id"]

    update_data = {
        "name": "Updated Turkey",
        "incubation_period_days": 30,
        "description": "Very large bird"
    }
    response = client.put(f"/api/species/{species_id}", json=update_data)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == update_data["name"]
    assert data["incubation_period_days"] == update_data["incubation_period_days"]

def test_delete_species(client: TestClient, session: Session):
    species_data = {
        "name": "Goose",
        "incubation_period_days": 30,
        "description": "Another waterfowl"
    }
    create_response = client.post("/api/species/", json=species_data)
    species_id = create_response.json()["id"]

    response = client.delete(f"/api/species/{species_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == species_id

    get_response = client.get(f"/api/species/{species_id}")
    assert get_response.status_code == 404
