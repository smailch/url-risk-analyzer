import os
import httpx
from app.models.schemas import ExternalCheck
import base64
VIRUSTOTAL_API_KEY = os.getenv("VT_API_KEY")
GOOGLE_API_KEY = os.getenv("GSB_API_KEY")
async def check_with_virustotal(url: str) -> ExternalCheck:
    if not VIRUSTOTAL_API_KEY:
        return ExternalCheck(source="VirusTotal", malicious=False, details="API key missing")
    api_url = "https://www.virustotal.com/api/v3/urls"
    # VirusTotal API veut un id = base64(url)
    url_id = base64.urlsafe_b64encode(url.encode()).decode().strip("=")
    headers = {"x-apikey": VIRUSTOTAL_API_KEY}
    url_report = f"{api_url}/{url_id}"

    async with httpx.AsyncClient() as client:
        resp = await client.get(url_report, headers=headers)
        if resp.status_code != 200:
            return ExternalCheck(source="VirusTotal", malicious=False, details="API error")
        data = resp.json()
        stats = data["data"]["attributes"]["last_analysis_stats"]
        malicious_count = stats.get("malicious", 0)
        suspicious_count = stats.get("suspicious", 0)
        is_malicious = malicious_count >= 2

        details = f"Malicious: {malicious_count}, Suspicious: {suspicious_count}"
        
        return ExternalCheck(source="VirusTotal", malicious=is_malicious, details=details)
    

    GOOGLE_API_KEY = os.getenv("GSB_API_KEY")

async def check_with_google_safe(url: str) -> ExternalCheck:
    if not GOOGLE_API_KEY:
        return ExternalCheck(source="GoogleSafeBrowsing", malicious=False, details="API key missing")
    gsb_url = (
        "https://safebrowsing.googleapis.com/v4/threatMatches:find"
        f"?key={GOOGLE_API_KEY}"
    )
    body = {
        "client": {"clientId": "url-risk-analyzer", "clientVersion": "1.0"},
        "threatInfo": {
            "threatTypes": [
                "MALWARE",
                "SOCIAL_ENGINEERING",
                "UNWANTED_SOFTWARE",
                "POTENTIALLY_HARMFUL_APPLICATION"
            ],
            "platformTypes": ["ANY_PLATFORM"],
            "threatEntryTypes": ["URL"],
            "threatEntries": [{"url": url}],
        },
    }
    async with httpx.AsyncClient() as client:
        resp = await client.post(gsb_url, json=body)
        if resp.status_code != 200:
            return ExternalCheck(source="GoogleSafeBrowsing", malicious=False, details=f"API error {resp.status_code}: {resp.text}")
        data = resp.json()
        found = "matches" in data and len(data["matches"]) > 0
        details = f"Matches: {len(data['matches'])}" if found else "Clean"
        return ExternalCheck(source="GoogleSafeBrowsing", malicious=found, details=details)