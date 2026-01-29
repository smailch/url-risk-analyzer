from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional, Dict, Any

class HeuristicResult(BaseModel):
    rule: str
    matched: bool
    details: Optional[str] = None

class ExternalCheck(BaseModel):
    source: str
    malicious: Optional[bool] = None
    details: Optional[str] = None
    vt_flag_count: Optional[int] = None   # ← Champ pour VirusTotal (sinon None)

class AnalyzeRequest(BaseModel):
    url: HttpUrl = Field(..., description="URL à analyser")

class AnalyzeResponse(BaseModel):
    score: str
    heuristics: List[HeuristicResult]
    external_checks: List[ExternalCheck]
    final_decision: Dict[str, Any]
    # Pour une doc complète, tu peux aussi ajouter :
    # external_errors: Optional[List[Dict[str, Any]]] = None