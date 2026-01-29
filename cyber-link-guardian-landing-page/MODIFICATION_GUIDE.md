# Modification Guide for Security Sources and Decision Badge

## 1. Show Only Supported Security Sources
- **File:** components/security-results.tsx
- **What to edit:**
  - The `MOCK_SOURCES` array: Only include `VirusTotal`, `Google Safe Browsing`, and `AlienVault OTX`.
  - The filtering logic in the `SecurityResults` component: Only show sources with IDs `virustotal`, `google-safe`, or `alienvault`.

## 2. Remove/Hide Unsupported Sources
- **File:** components/security-results.tsx
- **What to edit:**
  - Remove any references to `URLhaus`, `PhishTank`, `AbuseIPDB`, or other unsupported sources from the `MOCK_SOURCES` array and UI rendering logic.

## 3. Add Global Decision Badge
- **File:** components/security-results.tsx
- **What to edit:**
  - At the top of the results section, add a badge that displays the global decision based on `data.final_decision.level`.
  - Use color coding: green for `safe`, yellow/orange for `suspect`, red for `malicious`.

## 4. About Us Link Always Functional
- **File:** components/navbar.tsx
- **What to edit:**
  - Ensure the `About us` link is always rendered and never disabled, regardless of analysis state.
  - The link is present in both desktop and mobile navigation.

## 5. Where to Add/Remove Components
- **Security sources:**
  - All logic for which sources are shown is in `components/security-results.tsx`.
- **Decision badge:**
  - The badge is rendered at the top of the results section in `components/security-results.tsx`.
- **Navigation:**
  - The `About us` link is in `components/navbar.tsx`.

---

**For further customization, always update the above files.**
