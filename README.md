# 🇮🇳 SamriddhiAI - AI-Driven Scheme Matching & Channel Finance Router for Marginalized Entrepreneurs

> **Smart India Hackathon (SIH) Problem Statement 26092**  
> *AI-Driven Scheme Matching for Marginalized Entrepreneurs (Scheduled Caste Concessional Lending & Channel Finance Router)*

---

## 🌟 Executive Summary & Problem Context

To promote the socio-economic empowerment of the **Scheduled Caste (SC)** population, the government (via the **National Scheduled Castes Finance & Development Corporation - NSFDC** and State Governments) provides concessional financial assistance and educational loans:
- **Eligibility Ceiling:** Beneficiaries with an annual family income of **up to ₹5.00 Lakhs**.
- **Assistance Quantum:** Up to **90% concessional financing** of the total unit cost at highly subsidised rates (**5.0% to 8.0% per annum**, compared to commercial market rates of 12%–16%).
- **Moratorium Protection:** **3 to 12 months** grace period (or full degree course duration for educational loans).

### The Core Challenge
Direct applications are **not entertained** by central corporations. Instead, funds are routed through a decentralized **Channel Finance System** comprising over 100 Channel Partners:
1. **State Channelizing Agencies (SCAs)** (e.g., TAHDCO, MPBCDC, DSCFDC, UPSCFDC).
2. **Public Sector Commercial Banks (PSBs)** (SBI, PNB, Canara Bank, Bank of Baroda).
3. **Regional Rural Banks (RRBs)** (Aryavart Bank, Karnataka Gramin Bank, Baroda UP Bank).
4. **NBFC-MFIs** (Satin Creditcare, Spandana Sphoorty, Muthoot Microfin).

**The Fragmentation:** Citizens, especially rural and low-literacy entrepreneurs, lack awareness regarding which scheme fits their trade (Micro Finance vs Term Loan vs Green Business). Furthermore, they struggle to locate authorized Channel Partner branches, often having their applications sent to branches with exhausted credit lines or high overdues/NPAs.

**Our Solution - SamriddhiAI:** A multilingual, voice-transcription enabled, visual-first platform that matches the right citizen to the right scheme and routes their dossier directly to the nearest eligible partner with active funds.

---

## 🏗️ System Architecture

```mermaid
graph TD
    A[Citizen / Beneficiary] -->|Voice Input in Hindi/Tamil/Marathi/English| B[Voice-to-Form NLP Parser]
    A -->|Visual Touch Selection / Sliders| C[Visual Category Selector]
    
    B --> D[AI Scheme Recommendation Engine]
    C --> D
    
    subgraph "Core AI & Logic Engines"
        D -->|Income & Eligibility Auditing| E[Statutory Criteria Validator (<= ₹5L)]
        D -->|Gender Rebate 0.5%-1% & Sector Weighting| F[Concessional Scheme Scorer]
        F --> G[Ranked Scheme Matches (MFS, MSY, MKY, TLS, GBS, ELS)]
    end
    
    G --> H[Dynamic Concessional EMI & Moratorium Calculator]
    H -->|Amortization Schedule & Ratio Modeling| I[Monthly EMI & Beneficiary Share]
    
    G --> J[Geo-Spatial Partner Locator & Fund Utilization Router]
    
    subgraph "Channel Finance Optimization"
        J -->|Real-time Haversine Proximity| K[Nearest Accredited Branch]
        J -->|NPA / Overdue Health Filter| L[Safe Disbursal Guard (<3.5% NPA)]
        J -->|Active Credit Line Balance| M[Unutilized Quota Verification]
    end
    
    K & L & M --> N[Digital Routing Token & Pre-Screening Dossier (PDF/Print)]
    N --> O[Direct Fast-Track Branch Verification]
```

---

## 🚀 Key Modules & Innovations

### 1. 🎙️ Indian Language Voice Transcription & Audio Guide (Literacy-First)
- **Speech-to-Text Recognition:** Native Web Speech API integration in **Hindi (`hi-IN`)**, **Tamil (`ta-IN`)**, **Marathi (`mr-IN`)**, and **English (`en-IN`)**.
- **Voice-to-Form AI Parser:** Understands spoken phrases like *"मुझे सिलाई दुकान के लिए 1 लाख चाहिए, मेरी आय 2 लाख है"* and automatically parses sector, project cost, and family income into the application state.
- **Screen Read-Aloud:** High-fidelity text-to-speech for visually challenged or illiterate applicants explaining recommended schemes and monthly repayments.

### 2. 👁️ Visual Understandable Interface for Rural Communities
- **Iconic Visual Cards:** High-contrast graphic selection cards for trades: Tailoring & Small Shops (✂️), Women SHG Enterprises (✨), Dairy & Cattle Rearing (🌾), E-Rickshaws & Solar (⚡), Small Factories (🏭), Higher Education (🎓).
- **One-Touch Rupee Chips:** Instant presets for ₹1.0L, ₹1.40L (Micro Finance max), ₹2.00L (Dairy max), ₹5.00L (Small Shop), ₹15L (Green fleet), and ₹50.00L (Term loan).
- **Color-Coded Income Verification:** Instant visual feedback for the statutory ₹5.00 Lakhs ceiling.

### 3. 🧠 Smart Scheme Recommender Engine
Matches applicant profiles across official NSFDC concessional categories:
| Scheme Name | Code | Max Project Cost | Base Interest | Female Rebate | Moratorium |
|---|---|---|---|---|---|
| **Micro Finance Scheme (MFS)** | `NSFDC-MFS` | ₹1,40,000 | 6.5% p.a. | 1.0% (Effective 5.5%) | 3 to 6 months |
| **Mahila Samriddhi Yojana (MSY)** | `NSFDC-MSY` | ₹1,40,000 | 5.0% p.a. | Special Women Scheme | 6 months |
| **Mahila Kisan Yojana (MKY)** | `NSFDC-MKY` | ₹2,00,000 | 5.0% p.a. | Cattle/Dairy Support | 6 months |
| **Term Loan Scheme (Small)** | `NSFDC-TLS-S` | ₹5,00,000 | 6.5% p.a. | 0.5% (Effective 6.0%) | 6 months |
| **Term Loan Scheme (General)** | `NSFDC-TLS-G` | ₹50,00,000 | 7.5% - 8.0% | 0.5% rebate | 12 months |
| **Green Business Scheme (GBS)** | `NSFDC-GBS` | ₹30,00,000 | 6.5% p.a. | EV & Solar Priority | 9 months |
| **Educational Loan Scheme (Inland)** | `NSFDC-ELS-IN` | ₹20,00,000 | 6.5% p.a. | 0.5% for female students | Course duration + 6 mo |

### 4. 🧮 Dynamic Financial Calculator with Moratorium Logic
- Computes standard reducing balance amortizations with exact grace handling.
- **Moratorium Interest Modeling:** Differentiates between simple interest during initial setup (3–12 months) and post-moratorium principal amortization.
- **Financial Composition Bar:** Visual breakdown showing Apex Concessional Loan (90%), Beneficiary Margin (10%), and Total Interest.
- **Full Amortization Table:** Month-by-month and year-by-year schedule preview.

### 5. 🗺️ Geo-Spatial Partner Locator & NPA Risk Router
- Interactive **Leaflet & OpenStreetMap** engine plotting 25+ verified regional Channel Partner institutions across India.
- **Real-time Proximity Sorting:** Haversine formula calculation from user GPS or chosen district hub.
- **NPA Health Protection:** Categorizes partner health into:
  - 🟢 **OPTIMAL (NPA < 3.0%):** Authorized for instant direct routing.
  - 🟡 **CAUTION (NPA 3.0% - 5.5%):** Slower disbursal notification.
  - 🔴 **RESTRICTED (NPA > 6.0%):** Routing locked to protect applicant capital from delays.

### 6. 📄 Pre-Screened Digital Routing Dossier
- Generates an official printable PDF dossier with a unique **Digital Routing Token** (e.g. `SAM-2026-SC-7184`), QR token, scheme entitlement, and designated branch nodal officer contact.

---

## 🔑 Recommended Free-Tier APIs (Zero Cost Deployment)

To power high-volume production deployments at **zero operating cost**, we recommend the following best-in-class free tier APIs:

| Feature Area | Recommended Service | Free Tier Allowance | Why It's the Absolute Best |
|---|---|---|---|
| **AI LLM / Scheme Reasoning** | **Google Gemini 1.5 Flash** (via Google AI Studio) | **15 requests/min (RPM)**, **1,500 requests/day (RPD)**, 1M token context (100% Free) | Ultra-fast token latency, exceptional multilingual comprehension (Hindi, Tamil, Marathi, Bengali), and completely free without credit card expiration. |
| **Alternative AI Reasoning** | **Groq Cloud (Llama 3.3 70B / 8B Versatile)** | **30 RPM / 14,400 requests/day** (Free Tier) | World's fastest inference speed (~300 tokens/sec), perfect for instant voice response generation. |
| **Interactive Map Tiles** | **CartoDB Voyager / OpenStreetMap** | **Unlimited public vector/raster tiles** (Free) | No API key needed, zero billing surprises, loads crisp map tiles across all Indian pincodes. |
| **Voice Speech-to-Text & TTS** | **Web Speech API (W3C Standard)** | **100% Free & Unlimited** (Built into browser) | Zero external server latency, works locally on Chrome, Edge, and Android mobile browsers across Indian regional accents. |
| **Alternative Cloud STT** | **Sarvam AI (Indian Language Speech API)** | Generous free developer credit | Built specifically for 10+ Indian regional languages and dialect variations. |

---

## 💻 Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Custom Vanilla CSS Design System with Glassmorphism and CSS Custom Properties
- **Mapping:** Leaflet & CartoDB OpenStreetMap tiles
- **Icons:** Lucide React
- **Celebration Effects:** Canvas Confetti
- **Typography:** Plus Jakarta Sans & Outfit (Google Fonts)

---

## 🛠️ Quick Start & Local Setup

```bash
# 1. Navigate to project directory
cd c:/Users/HP/app/scheme-matcher

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open in browser
# Local URL: http://localhost:5173/
```

### Production Build
```bash
npm run build
# Generates optimized static bundle in dist/ in under 1 second!
```

---

## 🎯 Impact & Social Good
- **Empowering Marginalized Communities:** Removes technical jargon and literacy barriers, allowing rural entrepreneurs to speak or tap their way to government funding.
- **Disbursal Acceleration:** Directly eliminates misrouted applications and bypasses high-NPA partners, shortening average loan approval from months to days.
- **Financial Literacy:** Transparently illustrates how 90% concessional assistance saves entrepreneurs thousands of rupees compared to informal moneylenders.
