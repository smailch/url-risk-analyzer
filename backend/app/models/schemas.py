from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from pydantic import HttpUrl

class HeuristicResult(BaseModel):
    rule: str
    matched: bool
    details: Optional[str] = None

class ExternalCheck(BaseModel):
    source: str
    malicious: bool
    details: Optional[str] = None


class AnalyzeRequest(BaseModel):
    url: HttpUrl = Field(..., description="URL à analyser")

class AnalyzeResponse(BaseModel):
    score: str
    heuristics: List[HeuristicResult]
    external_checks: List[ExternalCheck]
    final_decision: Dict[str, Any]  # autorise un dict {"level": str, "reasons": list}