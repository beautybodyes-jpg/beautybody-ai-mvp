# BeautyBody AI Skin Expert — MVP

Premium AI-powered visual skin analysis PWA. Mobile-first, luxury design, conversion-focused.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📁 Project Structure

```
app/
  ├── page.tsx          # Landing page
  ├── consent/          # GDPR consent screen
  ├── scan/             # Camera capture / upload
  ├── processing/       # AI analysis animation
  ├── results/          # Results dashboard
  ├── report/           # PDF-style report (printable)
  └── book/             # WhatsApp booking flow
components/
  ├── ui/               # Button, GlassCard, ScoreGauge
  ├── analysis/         # CameraCapture, ProcessingAnimation, etc.
  └── layout/           # Navbar, Footer
context/
  └── analysis-context.tsx  # Global state
lib/
  ├── mock-analysis.ts  # Deterministic demo scoring
  ├── skin-parameters.ts
  └── treatments.ts
```

## ⚠️ Demo Mode

This MVP uses a **simulated analysis engine**. Results are deterministically generated from image file data for demonstration purposes. All screens clearly label this as "Demo Mode — Simulation."

## 🛠 Tech Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## 📱 PWA

The app includes a `manifest.json` for PWA support. Add your own icon files to `/public/`:
- `icon-192x192.png`
- `icon-512x512.png`

## 🔒 GDPR

- Granular consent checklist
- Demo images processed client-side, not stored
- Clear simulation disclaimers
- No medical claims

## 🎨 Design System

- **Primary:** Champagne gold `#c9a96e`
- **Background:** Warm black `#0c0a09`
- **Surface:** Glassmorphism with `backdrop-blur`
- **Typography:** Playfair Display (display) + Inter (body)
- **Animations:** Framer Motion with spring physics

## 📝 WhatsApp Booking

Update the clinic phone number in `app/book/page.tsx`:
```typescript
const phone = "33123456789"; // Replace with your WhatsApp Business number
```

## 🏗 Build for Production

```bash
npm run build
```

Deploy to Vercel:
```bash
npx vercel --prod
```
