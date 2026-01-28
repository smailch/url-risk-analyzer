import pytest
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

def test_analyze_safe_url():
    response = client.post("/analyze", json={"url": "https://google.com"})
    assert response.status_code == 200
    data = response.json()
    assert data["score"] == "safe"
    assert isinstance(data["heuristics"], list)
    assert data["final_decision"]["level"] == "safe"

def test_analyze_suspect_url():
    response = client.post("/analyze", json={"url": "http://login.secure-bank.com/verylongurl"})
    assert response.status_code == 200
    data = response.json()
    assert data["score"] in ("suspect", "malicious")
    assert data["final_decision"]["level"] in ("suspect", "malicious")

def test_analyze_invalid_url():
    response = client.post("/analyze", json={"url": "ceci_n_est_pas_une_url"})
    # Selon ton schéma, ça peut être 422 (erreur Validation) ou 400 (gestion manuelle des erreurs)
    assert response.status_code in [400, 422]