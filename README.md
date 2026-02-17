# Luchtreiniger Allergie - Expert Gids & Keuzehulp

De complete Nederlandse gids voor luchtreinigers bij hooikoorts, astma en allergieën. Onafhankelijke tests, CADR vergelijkingen en persoonlijke aanbevelingen.

## 🚀 Live Site
- **URL:** https://luchtreiniger-allergie.nl (na deployment)
- **Status:** Development server draait op http://localhost:1313

## 🏗️ Technische Stack
- **Static Site Generator:** Hugo Extended v0.128.0
- **CSS:** Custom responsive design
- **JavaScript:** Interactive calculator + animations
- **Deployment:** Vercel (GitHub integration)
- **Domain:** luchtreiniger-allergie.nl

## 📁 Project Structuur
```
luchtreiniger-allergie/
├── hugo.toml              # Site configuratie
├── layouts/              # HTML templates
│   ├── _default/
│   │   ├── baseof.html   # Main layout
│   │   └── home.html     # Homepage
├── assets/              # CSS & JS
│   ├── css/style.css    # Complete styling
│   ├── js/main.js       # Navigation, animations
│   └── js/calculator.js # CADR calculator
├── content/             # Markdown content
├── static/             # Images, fonts
└── public/             # Generated static site
```

## 🎯 Features
### 1. CADR Calculator
- Persoonlijke luchtreiniger aanbevelingen
- Room size × allergy severity × room type
- Total cost of ownership (3 jaar)
- Budget filtering

### 2. Product Database
- 4 top luchtreinigers met technische specs
- CADR, noise levels, filter costs
- Affiliate links naar Bol.com, Coolblue, Amazon

### 3. Piramide Strategie
- **Basis:** Probleem-Oplosser (100% help content)
- **Midden:** Technische Expert (25+ datapunten)
- **Punt:** Hyper-Niche Advies (specifieke landing pages)

### 4. Affiliate Monetization
- Amazon Partner-ID: `luchtreinig0f-21`
- Bol.com affiliate (pending)
- Click tracking & analytics

## 💰 Revenue Model
**Magical Formula:**
```
2% conversion × €15 commission × 3,333 visitors = €1,000/maand
```

**Target:** €1,000+/maand via affiliate commissions

## 🚀 Development
### Local Development
```bash
# Start development server
hugo server --buildDrafts --port 1313

# Build production site
hugo --minify
```

### Build Commands
```bash
# Development (with drafts)
hugo server

# Production build
hugo --minify --baseURL "https://luchtreiniger-allergie.nl/"

# Deploy to Vercel
vercel --prod
```

## 📊 Deployment
### Vercel Deployment (Recommended)
1. Push to GitHub
2. Connect repo to Vercel
3. Set custom domain: `luchtreiniger-allergie.nl`
4. Automatic SSL via Let's Encrypt
5. Auto-deploy on push

### Environment Variables
```env
HUGO_VERSION=0.128.0
HUGO_ENV=production
```

## 🔧 Configuration
### Hugo Config (`hugo.toml`)
```toml
baseURL = "https://luchtreiniger-allergie.nl/"
languageCode = "nl-nl"
title = "Luchtreiniger Allergie - Expert Gids & Keuzehulp"
```

### Affiliate Settings
- Amazon: `tag=luchtreinig0f-21`
- Bol.com: Partner ID pending
- Coolblue: Standard affiliate links

## 📈 Performance
- **PageSpeed:** Target 90+ (static site)
- **SEO:** Schema.org, meta tags, sitemap
- **Mobile:** Responsive design
- **Accessibility:** WCAG 2.1 compliant

## 🏭 Scalability
**Niche Calculator Factory:** Deze site is een template voor andere niches:
- Robotmaaiers
- Sta-bureaus  
- Airfryers
- Etc.

**Replication time:** <30 minuten per niche

## 📞 Contact
- **Email:** info@luchtreiniger-allergie.nl
- **Twitter:** @luchtreiniger_nl
- **GitHub Issues:** Voor bugs & features

## 📄 License
Proprietary - Alle rechten voorbehouden.

---

**Build Time:** 1 uur  
**Deployment Time:** 15 minuten  
**Revenue Target:** €1,000+/maand  
**Status:** ✅ Ready for production