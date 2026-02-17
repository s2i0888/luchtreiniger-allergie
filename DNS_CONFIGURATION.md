# 🌐 DNS CONFIGURATIE: luchtreiniger-allergie.nl

**Status:** ✅ Nameservers ontvangen | ⚡ Wacht op registrar update

## 📋 NAMESERVERS VOOR VERCEL

### **Primary Nameservers:**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

### **Backup Nameservers (optioneel):**
```
ns3.vercel-dns.com
ns4.vercel-dns.com
```

## 🔧 STAPPEN VOOR DNS CONFIGURATIE

### **1. Ga naar je Domain Registrar**
- **TransIP** (waarschijnlijk)
- **GoDaddy**
- **Namecheap**
- **Andere provider**

### **2. Zoek DNS/Nameserver instellingen**
- **Sectie:** "DNS Management" of "Nameservers"
- **Locatie:** Domain settings → DNS/Nameservers

### **3. Update Nameservers**
**Verwijder bestaande nameservers en voeg toe:**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

### **4. Sla wijzigingen op**
- **Save/Apply changes**
- **Propagation:** 5-30 minuten (lokaal), 24-48 uur (globaal)

## 🌐 VERCEL DNS FEATURES

### **Auto DNS Records:**
- **A record:** `luchtreiniger-allergie.nl` → Vercel IP
- **CNAME:** `www` → `cname.vercel-dns.com`
- **MX records:** Voor email (indien nodig)
- **TXT records:** Voor verificatie

### **Auto SSL:**
- **Provider:** Let's Encrypt
- **Activering:** Auto na DNS propagation
- **Renewal:** Elke 90 dagen automatisch

### **DNS Propagation Check:**
```bash
# Check nameservers
nslookup -type=NS luchtreiniger-allergie.nl

# Check A record
nslookup luchtreiniger-allergie.nl ns1.vercel-dns.com
```

## ⏱️ PROPAGATIE TIMELINE

### **Fast Propagation:**
- **Local DNS:** 5-30 minuten
- **Major ISPs:** 1-2 uur
- **Google DNS:** 5-10 minuten

### **Global Propagation:**
- **Full global:** 24-48 uur
- **Some networks:** Tot 72 uur

### **SSL Certificate:**
- **Activation:** 5-10 minuten na DNS
- **Forced HTTPS:** Direct actief

## 🔍 VERIFICATIE STAPPEN

### **1. Nameserver Verificatie:**
```bash
# Na update, run:
nslookup -type=NS luchtreiniger-allergie.nl

# Expected output:
# luchtreiniger-allergie.nl nameserver = ns1.vercel-dns.com
# luchtreiniger-allergie.nl nameserver = ns2.vercel-dns.com
```

### **2. Vercel Dashboard:**
- **Ga naar:** https://vercel.com/dashboard
- **Project:** luchtreiniger-allergie
- **Domains:** Check status
- **SSL:** Auto-generating

### **3. SSL Test:**
```bash
# Test SSL certificate
openssl s_client -connect luchtreiniger-allergie.nl:443 -servername luchtreiniger-allergie.nl
```

## ⚠️ TROUBLESHOOTING

### **Common Issues:**
1. **Nameservers not updating:** Clear DNS cache
2. **SSL not activating:** Wait 10-15 minutes
3. **Domain not resolving:** Check propagation status

### **DNS Cache Clear:**
```bash
# Windows
ipconfig /flushdns

# macOS/Linux
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
```

### **Propagation Check Tools:**
- **https://dnschecker.org**
- **https://www.whatsmydns.net**
- **https://dns.google.com**

## 📞 SUPPORT

### **Vercel Support:**
- **Dashboard:** https://vercel.com/dashboard
- **Domains:** https://vercel.com/dashboard/domains
- **Documentation:** https://vercel.com/docs

### **Registrar Support:**
- **TransIP:** https://www.transip.nl/contact
- **GoDaddy:** https://nl.godaddy.com/help
- **Namecheap:** https://www.namecheap.com/support

### **Emergency Contact:**
- **Email:** info@luchtreiniger-allergie.nl
- **Telegram:** @S2ii88

---

**🚀 VOLGENDE STAPPEN:**

1. **Update nameservers** bij registrar ✅ (wacht op S2)
2. **Wacht op propagation** (5-30 min)
3. **Check Vercel dashboard** voor status
4. **Test SSL certificate**
5. **Site is LIVE!** 🎉

**🌐 DNS Status:** **AWAITING REGISTRAR UPDATE**  
**⏱️ Estimated Time:** 30 minuten na nameserver update  
**🎯 Live URL:** https://luchtreiniger-allergie.nl  

**De DNS switch is de laatste stap!** 🌐⚡