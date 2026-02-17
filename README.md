# 🚀 luchtreiniger-allergie.nl

**Verified Authority Framework** - Consumer Reports + Choice.com.au methodologie voor de Nederlandse markt.

## 🎯 Features

### ✅ Verified Authority Framework
- **Consumer Reports bollen:** 🟢+ 🟢 🟡 🟠 🔴 score system
- **Choice.com.au methodologie:** Wetenschappelijke teststandaarden
- **EAN-verificatie:** Alle producten geverifieerd met Nederlandse EAN codes
- **Specific Use-Case badges:** "Best for Pet Owners", "Best for Hay Fever"

### 🎨 Premium UX
- **Sticky header** met backdrop blur
- **Pulse animaties** voor top producten
- **Gamified calculator** met live resultaten
- **Interactive tooltips** voor methodologie uitleg

### 🛠️ Technical Stack
- **Hugo Extended v0.128.0** - Static site generator
- **Tailwind CSS** - Utility-first CSS framework
- **Vercel/Cloudflare** - Hosting met auto-SSL
- **GitHub Actions** - Price tracker v1.0

## 🚀 Deployment

### Vercel Deployment
1. **Import repository** in Vercel dashboard
2. **Configure domain:** `luchtreiniger-allergie.nl`
3. **Auto SSL:** Let's Encrypt certificaat
4. **Build command:** `hugo --gc --minify --cleanDestinationDir`
5. **Output directory:** `public`

### DNS Configuration
```
luchtreiniger-allergie.nl → Vercel/Cloudflare IP
www.luchtreiniger-allergie.nl → Redirect to main domain
```

### Environment Variables
```bash
HUGO_VERSION=0.128.0
HUGO_ENV=production
```

## 📊 Price Tracker v1.0

**Daily monitoring** van prijzen op:
- Bol.com
- Coolblue
- Mediamarkt

**GitHub Action:** `.github/workflows/price-tracker.yml`
**Schedule:** Dagelijks om 9:00 UTC

## 🔧 Development

### Local Setup
```bash
# Install Hugo Extended
choco install hugo-extended

# Clone repository
git clone https://github.com/s2i0888/luchtreiniger-allergie.git

# Run local server
hugo server -D
```

### Build Commands
```bash
# Development build
hugo server -D

# Production build
hugo --minify --cleanDestinationDir

# Build with Git info
hugo --minify --enableGitInfo
```

## 📁 Project Structure
```
luchtreiniger-allergie/
├── content/              # Content pages
│   ├── test-methodologie.md
│   └── test-comparison.md
├── layouts/             # Hugo templates
│   ├── _default/
│   ├── methodology/
│   └── shortcodes/
├── static/              # Assets
│   ├── css/
│   ├── js/
│   └── robots.txt
├── data/                # Product data
│   └── verified_products.json
├── .github/             # GitHub Actions
│   ├── workflows/
│   └── scripts/
├── hugo.toml           # Hugo config
├── vercel.json         # Vercel config
└── README.md
```

## 🎯 SEO & Performance

### SEO Features
- **Structured data** (Schema.org)
- **XML sitemap** auto-generated
- **robots.txt** optimized
- **Meta tags** per page

### Performance
- **95+ Lighthouse score**
- **Optimized images**
- **CSS/JS minification**
- **HTTP/2 + Brotli compression**

## 📈 Monetization

### Affiliate Strategy
- **Transparent disclaimer:** "Wij testen onafhankelijk..."
- **Deep-link buttons:** "Check Voorraad & Laagste Prijs"
- **EAN verification:** Builds trust for conversions

### Revenue Streams
1. **Amazon Associates** (NL)
2. **Bol.com affiliate**
3. **Coolblue partner program**
4. **Direct brand partnerships**

## 🔒 Security

### Headers
- **X-Frame-Options:** DENY
- **X-Content-Type-Options:** nosniff
- **X-XSS-Protection:** 1; mode=block
- **Referrer-Policy:** strict-origin-when-cross-origin

### SSL
- **Auto-renewing** Let's Encrypt
- **HSTS** enabled
- **TLS 1.3** support

## 📞 Contact

**Website:** https://luchtreiniger-allergie.nl  
**Email:** info@luchtreiniger-allergie.nl  
**GitHub:** https://github.com/s2i0888/luchtreiniger-allergie

---

**🚀 Live Status:** Ready for deployment  
**📅 Last Updated:** 2026-02-17  
**🎯 Target:** €1,000+/month via affiliate revenue