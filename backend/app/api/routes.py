from fastapi import APIRouter, HTTPException
from app.models.schemas import AnalyzeRequest, AnalyzeResponse
from app.services.analysis import analyze_heuristics
from app.services.external_api import check_with_otx, check_with_virustotal, check_with_google_safe
from app.logging.logger import logger
from app.utils.threat_assessment import is_otx_truly_malicious, is_vt_truly_malicious, vt_malicious_count
router = APIRouter()

@router.post("/analyze")
async def analyze_endpoint(payload: AnalyzeRequest):
    url = str(payload.url)
    heuristics = analyze_heuristics(url)
    vt_result = await check_with_virustotal(url)
    gsb_result = await check_with_google_safe(url)
    result_otx = await check_with_otx(url)
    external_checks = [vt_result, gsb_result, result_otx]
    ERROR_DETAILS = ["api error", "api key missing"]

    external_checks_valids = []
    external_errors = []
    for c in external_checks:
        details = getattr(c, "details", "").lower()
        if any(err in details for err in ERROR_DETAILS):
            external_errors.append({
                "source": getattr(c, "source", "unknown"),
                "details": c.details
            })
        else:
            # On affine ici avant d’insérer dans la liste
            if getattr(c, "source", "") == "AlienVault OTX":
                c.malicious = is_otx_truly_malicious(c)
            elif getattr(c, "source", "") == "VirusTotal":
                c.malicious = is_vt_truly_malicious(c)
                # Expose aussi c.vt_flag_count: pour le detailed analysis
                c.vt_flag_count = vt_malicious_count(getattr(c, "details", ""))
            external_checks_valids.append(c)

    # Logique d’agrégation améliorée :
    malicious = any(getattr(check, "malicious", False) for check in external_checks_valids)
    vt_suspicious = next(
        (check.vt_flag_count == 1 for check in external_checks_valids
            if getattr(check, "source", "") == "VirusTotal"), False
    )
    suspicious = any(not h.matched for h in heuristics) or vt_suspicious

    if malicious:
        score = "malicious"
    elif suspicious or external_errors:
        score = "suspect"
    else:
        score = "safe"

    reasons = [h.details for h in heuristics if not h.matched]
    if vt_suspicious:
        reasons.append("VirusTotal : ce lien a été signalé par 1 moteur sur 70 (opinion minoritaire, suspicion)")
    if external_errors:
        reasons.append("Certaines sources n'ont pas répondu : " + ", ".join(e["source"] for e in external_errors))

    final_decision = {
        "level": score,
        "reasons": reasons
    }

    return {
        "score": score,
        "heuristics": heuristics,
        "external_checks": external_checks_valids,
        "external_errors": external_errors,
        "final_decision": final_decision
    }