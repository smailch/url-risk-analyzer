<!-- Hero / Branding -->
<p align="center">
  <img src="public/cyberlink-guardian-logo.png" alt="CyberLink Guardian Logo" width="150" />
</p>

<h1 align="center">CyberLink Guardian 🛡️</h1>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?duration=2000&color=00BFFF&center=true&vCenter=true&width=480&lines=AI-powered+URL+Security+Checker;Analyze+Any+Link+in+Real+Time;Accessible%2C+Modern%2C+Open+Source+%7C+By+Smail+Chemlali" alt="Typing SVG" />
</p>

<h3 align="center">🚀 Full Stack Developer | 🎓 ESPRIT Student | 🌍 Based in Tunisia</h3>
<h3 align="center">🛡️ Modern threat intelligence for everyone 🚀</h3>

<p align="center">
  <a href="https://portfolio-smail-xgle.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🌐_Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Portfolio" />
  </a>
  <a href="https://linkedin.com/in/smail-chemlali" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
</p>

---

# Introduction

**CyberLink Guardian** est une application de cybersécurité moderne permettant d’analyser des URLs en temps réel pour détecter les risques (malicieux, phishing, etc.) en agrégeant plusieurs bases d’intelligence de sécurité et des heuristiques avancées.  
Accessible, transparente, responsive et au design soigné, la solution combine un **backend Python/FastAPI** et un **frontend React**.

---

## 🚀 Fonctionnalités

- **Analyse instantanée de liens** : détection de risques, scoring automatique
- **Sources de Threat Intelligence** : VirusTotal, Google Safe Browsing, AlienVault OTX
- **Heuristiques intelligentes** : HTTPS, longueur URL, sous-domaines, mots-clés suspects, etc.
- **Score visuel (safe / suspect / malicious)** : badge couleur, Safety Score dynamique
- **Interface accessible (WCAG 2.1 AA)** : navigation clavier, contraste excellent, responsive
- **Résultats détaillés et explicatifs** : pour un maximum de transparence
- **Branding personnalisable** et “about us” statique

---

## 🛠️ Stack Technique

<h3 align="center">Languages and Tools 🛠</h3>
<p align="center">
    <a href="https://reactjs.org/" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/></a>
    <a href="https://fastapi.tiangolo.com/" target="_blank"><img src="https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png" alt="fastapi" width="40" height="40"/></a>
    <a href="https://tailwindcss.com/" target="_blank"><img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/></a>
    <a href="https://www.python.org/" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="python" width="40" height="40"/></a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/></a>
    <a href="https://nextjs.org/" target="_blank"><img src="https://cdn.worldvectorlogo.com/logos/nextjs-2.svg" alt="nextjs" width="40" height="40"/></a>
</p>

- **Backend** : Python 3.10+, FastAPI, Pydantic, async/await, requêtes API externes (VT, GSB, OTX)
- **Frontend** : React (Next.js ou Vite), Tailwind CSS, composants modulaires, accessibilité native (`aria`, `landmark`, couleurs)
- **API REST** `POST /analyze` pour analyser une URL

---

## 📦 Installation & Lancement

### 1. Clone et installe le backend

```bash
git clone https://github.com/ton-org/ton-repo.git
cd ton-repo/backend
python -m venv venv
source venv/bin/activate    # ou venv\Scripts\activate sous Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```
- Configure tes clés d’API (VT, GSB, OTX) dans `.env` ou `app/config.py`

### 2. Démarre le frontend

```bash
cd ../frontend   # (ou adapter selon ton arborescence)
npm install      # ou yarn install
npm run dev
```
- Par défaut : `http://localhost:3000`
- Le backend écoute sur `http://localhost:8000`

---

## 🧑‍💻 Utilisation

1. Saisis une URL dans l'interface et clique sur **Start Investigation**
2. Lis le résultat global (Safe/Suspect/Malicious, visuel & Safety Score)
3. Consulte le détail des sources (VT, GSB, OTX) et des heuristics appliquées
4. Navigue vers la page **About us** pour en savoir plus

---

## 📄 Spécification API

### POST `/analyze`

**Requête :**
```json
{ "url": "https://exemple.com/" }
```

**Réponse de succès :**
```json
{
  "score": "suspect",
  "heuristics": [
    {"rule": "HTTPS", "matched": false, "details": "URL does not use HTTPS"},
    ...
  ],
  "external_checks": [
    {"source": "VirusTotal", "malicious": false, "details": "Malicious: 1, Suspicious: 0", "vt_flag_count": 1},
    ...
  ],
  "external_errors": [],
  "final_decision": {
    "level": "suspect",
    "reasons": [
      "URL does not use HTTPS",
      "VirusTotal : ce lien a été signalé par 1 moteur sur 70 (opinion minoritaire, suspicion)"
    ],
    "score": 55
  }
}
```

---

## 📱 Accessibilité (WCAG)

- Navigation et contenu **conformes WCAG 2.1 AA**
- Tout bouton et lien interactif est accessible clavier/tab
- Sélection de couleurs et contraste testés
- Aria-labels, rôles bons pour screen reader
- Responsive mobile/desktop

---

## 📝 Tests types

- https://www.wikipedia.org/ → SAFE
- http://example.com/ → SUSPECT
- https://www.eicar.org/download/eicar.com.txt → MALICIOUS

---

## 🖼️ Capture d'écran

<p align="center">
  <img src="screenshot.png" alt="Exemple d'interface CyberLink Guardian" width="600"/>
</p>

---

## 📚 À Propos / Contact

<p align="center">
  <a href="https://portfolio-smail-xgle.vercel.app/" target="_blank">
    Portfolio & Plus d'infos
  </a>
  <br>
  <a href="mailto:smail.chemlali@esprit.tn">
    📧 smail.chemlali@esprit.tn
  </a>
  <br>
  <a href="https://linkedin.com/in/smail-chemlali" target="_blank">
    LinkedIn
  </a>
</p>

---

## ⭐️ Merci pour la visite !

