# MailChimp Integration for Coming Soon Page

## Current Implementation
The under-construction page currently saves leads to CSV files via browser download. For production, integrate with MailChimp or another email service.

## Option 1: MailChimp (Recommended)

### Setup Steps:
1. **Create MailChimp Audience:**
   - Go to: https://us21.admin.mailchimp.com/audience
   - Create new audience: "Luchtreiniger Allergie - Coming Soon"
   - Get API Key: Profile → Extras → API keys

2. **Update JavaScript Code:**
```javascript
// Replace the CSV download code with MailChimp API call
async function submitToMailChimp(email) {
    const API_KEY = 'your-api-key-us21';
    const AUDIENCE_ID = 'your-audience-id';
    const DATACENTER = API_KEY.split('-')[1];
    
    const response = await fetch(`https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`, {
        method: 'POST',
        headers: {
            'Authorization': `apikey ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email_address: email,
            status: 'subscribed',
            tags: ['coming-soon', 'luchtreiniger-allergie']
        })
    });
    
    return response.ok;
}
```

## Option 2: Google Sheets + Zapier

### Setup Steps:
1. **Create Google Sheet:**
   - Columns: Timestamp, Email, Source, Status
   - Share with Zapier service account

2. **Zapier Automation:**
   - Trigger: Webhook (POST to Zapier)
   - Action: Add row to Google Sheets
   - URL: `https://hooks.zapier.com/hooks/catch/...`

3. **JavaScript Implementation:**
```javascript
async function submitToGoogleSheets(email) {
    const ZAPIER_WEBHOOK = 'your-zapier-webhook-url';
    
    const response = await fetch(ZAPIER_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            timestamp: new Date().toISOString(),
            source: 'luchtreiniger-allergie-coming-soon'
        })
    });
    
    return response.ok;
}
```

## Option 3: Custom API Endpoint

### FastAPI Backend Example:
```python
# app.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
import csv
from datetime import datetime
from typing import List

app = FastAPI()

class Lead(BaseModel):
    email: EmailStr
    source: str = "luchtreiniger-allergie-coming-soon"

@app.post("/api/leads")
async def create_lead(lead: Lead):
    timestamp = datetime.now().isoformat()
    
    # Save to CSV
    with open("leads.csv", "a", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([timestamp, lead.email, lead.source])
    
    # Optional: Send to email service
    # await send_to_mailchimp(lead.email)
    
    return {"status": "success", "message": "Lead saved"}

# Deploy to Vercel or Railway
```

## Security Considerations

### 1. API Keys Protection:
```javascript
// Never expose API keys in frontend code!
// Use serverless function as proxy:

// Vercel Serverless Function (api/subscribe.js)
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    
    const { email } = req.body;
    const API_KEY = process.env.MAILCHIMP_API_KEY;
    
    // Forward to MailChimp
    const response = await fetch(`https://us21.api.mailchimp.com/3.0/lists/${process.env.AUDIENCE_ID}/members`, {
        method: 'POST',
        headers: { 'Authorization': `apikey ${API_KEY}` },
        body: JSON.stringify({ email_address: email, status: 'subscribed' })
    });
    
    res.status(response.status).json(await response.json());
}
```

### 2. Environment Variables (Vercel):
```
MAILCHIMP_API_KEY=your-api-key-us21
AUDIENCE_ID=your-audience-id
```

## Implementation Priority

### Phase 1 (Now): CSV Download
- ✅ Implemented: Browser downloads CSV per submission
- Pros: Simple, no backend needed
- Cons: Manual collection required

### Phase 2 (Next 24h): MailChimp Integration
- Create MailChimp account
- Add serverless function to Vercel
- Update frontend to call API
- Test subscription flow

### Phase 3 (Post-Launch): Automated Welcome Email
- Set up MailChimp automation
- Send "Site is Live!" notification
- Segment leads by interest

## Testing

### Local Testing:
```bash
# Test CSV download
open http://localhost:1313/under-construction/

# Test preview mode
open http://localhost:1313/?mode=preview
```

### Production Testing:
1. Submit test email via form
2. Check CSV download works
3. Verify noindex tag is present
4. Test secret parameter: `?mode=preview`

## Monitoring

### Google Analytics Event Tracking:
```javascript
// Add to form submission
gtag('event', 'lead_capture', {
    'event_category': 'coming_soon',
    'event_label': 'email_submission'
});
```

### Success Metrics:
- Conversion rate: Email submissions / Page views
- Lead quality: Valid email addresses
- Time to launch: Days from first lead

---

**Next Action:** Implement Phase 2 (MailChimp) when ready to automate lead collection.