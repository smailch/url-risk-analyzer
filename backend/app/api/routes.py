from fastapi import APIRouter, HTTPException
from app.models.schemas import AnalyzeRequest, AnalyzeResponse
from app.services.analysis import analyze_heuristics
from app.services.external_api import check_with_virustotal
from app.services.external_api import check_with_virustotal, check_with_google_safe
from app.logging.logger import logger   # <--- AJOUT du logger
import traceback

router = APIRouter()

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_endpoint(payload: AnalyzeRequest):
    url = str(payload.url)
    logger.info(f"Analyse demandée pour: {url}")

    try:
        heuristics = analyze_heuristics(url)
        vt_result = await check_with_virustotal(url)
        gsb_result = await check_with_google_safe(url)
        external_checks = [vt_result, gsb_result]

        suspicious = any(not h.matched for h in heuristics)
        malicious = any(c.malicious for c in external_checks)
        if malicious:
            score = "malicious"
        elif suspicious:
            score = "suspect"
        else:
            score = "safe"

        final_decision = {
            "level": score,
            "reasons": [h.details for h in heuristics if not h.matched]
        }

        return AnalyzeResponse(
            score=score,
            heuristics=heuristics,
            external_checks=external_checks,
            final_decision=final_decision
        )
    except Exception as e:
        import traceback
        tb = traceback.format_exc()
        logger.error(f"Erreur pendant analyse de {url}: {str(e)}\nTraceback:\n{tb}")
        raise HTTPException(status_code=400, detail=f"Erreur d’analyse : {str(e)}\n{tb}")