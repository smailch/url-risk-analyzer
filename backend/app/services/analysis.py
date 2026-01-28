import re
from app.models.schemas import HeuristicResult, AnalyzeResponse, ExternalCheck

SUSPICIOUS_KEYWORDS = ["login", "secure", "account", "update", "free", "bank"]

def extract_domain(url: str) -> str:
    # Extraction simple du domaine
    match = re.match(r"https?://([^/]+)/?", url)
    if match:
        return match.group(1).lower()
    return ""

def analyze_heuristics(url: str):
    heuristics = []

    # Règle 1 : HTTPS
    if url.lower().startswith("https://"):
        heuristics.append(HeuristicResult(rule="HTTPS", matched=True, details="URL uses HTTPS"))
    else:
        heuristics.append(HeuristicResult(rule="HTTPS", matched=False, details="URL does not use HTTPS"))

    # Règle 2 : Longueur URL > 75
    if len(url) > 75:
        heuristics.append(HeuristicResult(rule="URL length", matched=False, details="URL very long"))
    else:
        heuristics.append(HeuristicResult(rule="URL length", matched=True, details="URL length OK"))

    # Règle 3 : Sous-domaines multiples
    domain = extract_domain(url)
    if domain.count('.') >= 3:
        heuristics.append(HeuristicResult(rule="Subdomain count", matched=False, details=f"Multiple subdomains in {domain}"))
    else:
        heuristics.append(HeuristicResult(rule="Subdomain count", matched=True, details=f"Subdomain count normal ({domain})"))

    # Règle 4 : Mots clés suspects
    if any(kw in url.lower() for kw in SUSPICIOUS_KEYWORDS):
        heuristics.append(HeuristicResult(rule="Suspicious keyword", matched=False, details="Suspicious keyword present"))
    else:
        heuristics.append(HeuristicResult(rule="Suspicious keyword", matched=True, details="No suspicious keyword"))

    return heuristics