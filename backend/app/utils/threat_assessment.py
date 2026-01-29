import re

MALICIOUS_KEYWORDS = [
    "malware", "phishing", "malicious", "trojan", "ransomware", "botnet",
    "virus", "exploit", "c2", "command and control", "spyware"
]

def extract_otx_tags(details: str) -> list:
    tags_str = details.lower().split("tags:")[-1] if "tags:" in details.lower() else ""
    tags = [t.strip() for t in tags_str.split(",") if t.strip()]
    return tags

def is_otx_truly_malicious(c) -> bool:
    details = getattr(c, "details", "")
    tags = extract_otx_tags(details)
    return any(k in tags for k in MALICIOUS_KEYWORDS)

def vt_malicious_count(details: str) -> int:
    m = re.search(r'malicious:\s*(\d+)', details.lower())
    return int(m.group(1)) if m else 0

def is_vt_truly_malicious(c) -> bool:
    return vt_malicious_count(getattr(c, "details", "")) >= 2