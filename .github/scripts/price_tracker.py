#!/usr/bin/env python3
"""
Price Tracker v1.0 for luchtreiniger-allergie.nl
Monitors prices on Bol.com and Coolblue
"""

import requests
import json
import os
from datetime import datetime
import time
from pathlib import Path

# Product URLs to monitor
PRODUCTS = [
    {
        "name": "Blueair HealthProtect 7770i",
        "urls": {
            "coolblue": "https://www.coolblue.nl/product/875559/blueair-healthprotect-7770i.html",
            "bol": "https://www.bol.com/nl/nl/p/blueair-healthprotect-7770i-luchtreiniger-tegen-virussen-en-bacterien-51-87m2-lcd-display/9300000020715969/"
        },
        "ean": "7350046987770"
    },
    {
        "name": "Philips Series 3000i",
        "urls": {
            "coolblue": "https://www.coolblue.nl/product/888888/philips-series-3000i.html",
            "mediamarkt": "https://www.mediamarkt.nl/nl/product/_philips-luchtreiniger-series-3000i-1687201.html"
        },
        "ean": "8712581763035"
    }
]

def fetch_price(url, retailer):
    """Fetch price from retailer (simulated for now)"""
    # In production, implement actual scraping with:
    # - requests with proper headers
    # - BeautifulSoup for HTML parsing
    # - Respect robots.txt and rate limits
    
    # For v1.0, return mock data
    import random
    time.sleep(1)  # Rate limiting
    
    if retailer == "coolblue":
        return random.randint(620, 680)
    elif retailer == "bol":
        return random.randint(600, 660)
    elif retailer == "mediamarkt":
        return random.randint(580, 640)
    else:
        return random.randint(550, 700)

def load_price_history():
    """Load existing price history"""
    history_file = Path("data/price_history.json")
    if history_file.exists():
        with open(history_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {"products": [], "last_updated": None}

def save_price_history(history):
    """Save price history"""
    history_file = Path("data/price_history.json")
    history_file.parent.mkdir(parents=True, exist_ok=True)
    
    history["last_updated"] = datetime.now().isoformat()
    
    with open(history_file, 'w', encoding='utf-8') as f:
        json.dump(history, f, indent=2, ensure_ascii=False)

def send_telegram_alert(message):
    """Send alert to Telegram"""
    bot_token = os.getenv("TELEGRAM_BOT_TOKEN")
    chat_id = os.getenv("TELEGRAM_CHAT_ID")
    
    if not bot_token or not chat_id:
        print("Telegram credentials not set")
        return
    
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": message,
        "parse_mode": "HTML"
    }
    
    try:
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            print("Telegram alert sent")
        else:
            print(f"Telegram error: {response.status_code}")
    except Exception as e:
        print(f"Failed to send Telegram alert: {e}")

def main():
    print("🚀 Starting Price Tracker v1.0")
    print(f"Time: {datetime.now().isoformat()}")
    
    # Load existing history
    history = load_price_history()
    
    # Track price changes
    price_changes = []
    
    for product in PRODUCTS:
        print(f"\n📦 Checking: {product['name']}")
        
        product_data = {
            "name": product["name"],
            "ean": product["ean"],
            "prices": {},
            "timestamp": datetime.now().isoformat()
        }
        
        for retailer, url in product["urls"].items():
            try:
                price = fetch_price(url, retailer)
                product_data["prices"][retailer] = {
                    "price": price,
                    "url": url,
                    "currency": "EUR"
                }
                
                print(f"  {retailer}: €{price}")
                
                # Check for significant price drop
                # TODO: Compare with previous prices
                
            except Exception as e:
                print(f"  Error fetching {retailer}: {e}")
                product_data["prices"][retailer] = {
                    "error": str(e),
                    "url": url
                }
        
        # Find lowest price
        valid_prices = [p["price"] for p in product_data["prices"].values() if "price" in p]
        if valid_prices:
            lowest_price = min(valid_prices)
            product_data["lowest_price"] = lowest_price
            
            # Check if price dropped significantly (>10%)
            # TODO: Compare with historical data
            
            if len(valid_prices) > 1:
                highest_price = max(valid_prices)
                price_diff = highest_price - lowest_price
                if price_diff > 50:  # More than €50 difference
                    message = f"💰 <b>Price Alert!</b>\n{product['name']}\nPrice difference: €{price_diff}\nLowest: €{lowest_price}\nHighest: €{highest_price}"
                    price_changes.append(message)
        
        # Add to history
        history["products"].append(product_data)
    
    # Keep only last 30 days of data
    if len(history["products"]) > 30:
        history["products"] = history["products"][-30:]
    
    # Save updated history
    save_price_history(history)
    
    # Send alerts if any significant changes
    if price_changes:
        alert_message = "\n\n".join(price_changes)
        send_telegram_alert(alert_message)
        print(f"\n📢 Sent {len(price_changes)} price alerts")
    else:
        print("\n✅ No significant price changes detected")
    
    print(f"\n🎯 Price tracking complete")
    print(f"Products tracked: {len(PRODUCTS)}")
    print(f"Time: {datetime.now().isoformat()}")

if __name__ == "__main__":
    main()