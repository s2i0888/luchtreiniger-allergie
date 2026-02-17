// Calculator Logic for Luchtreiniger Allergie
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const roomSizeSlider = document.getElementById('room-size');
    const roomSizeValue = document.getElementById('room-size-value');
    const allergyLevel = document.getElementById('allergy-level');
    const roomType = document.getElementById('room-type');
    const budget = document.getElementById('budget');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultsPlaceholder = document.getElementById('results-placeholder');
    const resultsOutput = document.getElementById('results-output');
    
    // Update room size display
    roomSizeSlider.addEventListener('input', function() {
        roomSizeValue.textContent = this.value;
    });
    
    // Calculate CADR (Clean Air Delivery Rate)
    function calculateCADR(roomSize, allergyMultiplier, roomMultiplier) {
        // Base formula: CADR = Room Size × 2.5m (ceiling height) × 5 ACH × multipliers
        const baseCADR = roomSize * 2.5 * 5;
        
        // Allergy multipliers
        const allergyMultipliers = {
            'mild': 1.0,
            'moderate': 1.3,
            'severe': 1.7,
            'very-severe': 2.2
        };
        
        // Room type multipliers
        const roomMultipliers = {
            'bedroom': 1.2,    // Slaapkamer: extra stilte belangrijk
            'living-room': 1.0, // Woonkamer: standaard
            'office': 0.9,     // Kantoor: minder uren gebruik
            'baby-room': 1.5    // Babykamer: extra veiligheid
        };
        
        const cadr = baseCADR * allergyMultipliers[allergyMultiplier] * roomMultipliers[roomMultiplier];
        return Math.round(cadr);
    }
    
    // Product database
    const products = [
        {
            id: 1,
            name: "Blueair HealthProtect 7770i",
            cadr: 495,
            price: 649,
            noise: 29,
            filterCost: 90,
            bestFor: ["slaapkamer", "grote ruimte", "ernstige allergie"],
            features: ["HEPA H13", "Nachtmodus 29dB", "App bediening", "Virus protection"],
            affiliateLink: "https://www.bol.com/nl/nl/p/blueair-healthprotect-7770i/9300000045678901/",
            retailer: "Bol.com"
        },
        {
            id: 2,
            name: "Coway Airmega AP-1512HH",
            cadr: 350,
            price: 399,
            noise: 32,
            filterCost: 60,
            bestFor: ["woonkamer", "middelgrote ruimte", "matige allergie"],
            features: ["4-fase filtering", "Energiezuinig", "Auto-modus", "Filter indicator"],
            affiliateLink: "https://www.coolblue.nl/product/1234567/coway-airmega-ap-1512hh.html",
            retailer: "Coolblue"
        },
        {
            id: 3,
            name: "Philips Series 3000i",
            cadr: 270,
            price: 299,
            noise: 35,
            filterCost: 50,
            bestFor: ["slaapkamer", "kantoor", "milde allergie"],
            features: ["AeraSense", "App bediening", "Nachtmodus", "Child lock"],
            affiliateLink: "https://www.amazon.nl/dp/B08XYZ1234",
            retailer: "Amazon"
        },
        {
            id: 4,
            name: "Xiaomi Air Purifier 4",
            cadr: 220,
            price: 199,
            noise: 38,
            filterCost: 40,
            bestFor: ["budget", "kleine ruimte", "milde allergie"],
            features: ["Slimme app", "OLED display", "Compact design", "Goedkoop onderhoud"],
            affiliateLink: "https://www.bol.com/nl/nl/p/xiaomi-air-purifier-4/9300000045678902/",
            retailer: "Bol.com"
        }
    ];
    
    // Find best product match
    function findBestProduct(requiredCADR, budgetLevel, roomTypeValue) {
        // Budget ranges
        const budgetRanges = {
            'budget': { min: 100, max: 200 },
            'midrange': { min: 200, max: 400 },
            'premium': { min: 400, max: 800 },
            'luxury': { min: 800, max: 2000 }
        };
        
        const range = budgetRanges[budgetLevel];
        
        // Filter products by budget
        let filteredProducts = products.filter(product => 
            product.price >= range.min && product.price <= range.max
        );
        
        // Sort by CADR match (closest to required)
        filteredProducts.sort((a, b) => {
            const diffA = Math.abs(a.cadr - requiredCADR);
            const diffB = Math.abs(b.cadr - requiredCADR);
            return diffA - diffB;
        });
        
        // Return best match
        return filteredProducts.length > 0 ? filteredProducts[0] : products[0];
    }
    
    // Calculate total cost of ownership
    function calculateTotalCost(product, years = 3) {
        const filterCostPerYear = product.filterCost;
        const energyCostPerYear = (product.cadr / 20) * 0.25 * 24 * 365 / 1000; // Simplified energy calc
        const totalYearlyCost = filterCostPerYear + energyCostPerYear;
        const total3YearCost = product.price + (totalYearlyCost * years);
        
        return {
            yearly: Math.round(totalYearlyCost),
            threeYear: Math.round(total3YearCost),
            monthly: Math.round(totalYearlyCost / 12)
        };
    }
    
    // Generate recommendation text
    function generateRecommendation(product, requiredCADR, costs) {
        const cadrDiff = product.cadr - requiredCADR;
        let cadrNote = "";
        
        if (cadrDiff > 50) {
            cadrNote = "💪 <strong>Overgedimensioneerd</strong> - Extra capaciteit voor piekmomenten";
        } else if (cadrDiff >= -20 && cadrDiff <= 50) {
            cadrNote = "✅ <strong>Perfecte match</strong> - Exact de benodigde capaciteit";
        } else {
            cadrNote = "⚠️ <strong>Onderdimensioneerd</strong> - Overweeg groter model voor optimale werking";
        }
        
        return `
            <div class="recommendation-card">
                <div class="product-header">
                    <h4>${product.name}</h4>
                    <div class="product-price">€${product.price}</div>
                </div>
                
                <div class="specs-grid">
                    <div class="spec">
                        <div class="spec-label">CADR</div>
                        <div class="spec-value">${product.cadr} m³/h</div>
                        <div class="spec-note">${cadrNote}</div>
                    </div>
                    
                    <div class="spec">
                        <div class="spec-label">Geluid (nacht)</div>
                        <div class="spec-value">${product.noise} dB</div>
                        <div class="spec-note">${product.noise <= 30 ? '🤫 Zeer stil' : product.noise <= 35 ? '👂 Acceptabel' : '🔊 Hoorbaar'}</div>
                    </div>
                    
                    <div class="spec">
                        <div class="spec-label">Filter kosten/jaar</div>
                        <div class="spec-value">€${product.filterCost}</div>
                        <div class="spec-note">${product.filterCost <= 50 ? '💰 Laag' : product.filterCost <= 80 ? '💸 Gemiddeld' : '📈 Hoog'}</div>
                    </div>
                </div>
                
                <div class="cost-breakdown">
                    <h5>Totale kosten over 3 jaar:</h5>
                    <div class="cost-item">
                        <span>Aanschaf:</span>
                        <span>€${product.price}</span>
                    </div>
                    <div class="cost-item">
                        <span>Filters (3 jaar):</span>
                        <span>€${product.filterCost * 3}</span>
                    </div>
                    <div class="cost-item">
                        <span>Energie (3 jaar):</span>
                        <span>€${Math.round((costs.yearly - product.filterCost) * 3)}</span>
                    </div>
                    <div class="cost-total">
                        <span>Totaal:</span>
                        <span>€${costs.threeYear}</span>
                    </div>
                    <div class="cost-monthly">
                        <span>Maandelijks:</span>
                        <span>€${costs.monthly}/maand</span>
                    </div>
                </div>
                
                <div class="features">
                    <h5>Kenmerken:</h5>
                    <ul>
                        ${product.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <a href="${product.affiliateLink}" class="buy-recommendation" target="_blank" rel="nofollow">
                    <i class="fas fa-shopping-cart"></i> Bekijk bij ${product.retailer}
                </a>
                
                <div class="disclaimer">
                    <small><i class="fas fa-info-circle"></i> Via onze link ontvangen wij mogelijk commissie, zonder extra kosten voor jou.</small>
                </div>
            </div>
        `;
    }
    
    // Calculate button click handler
    calculateBtn.addEventListener('click', function() {
        // Get values
        const roomSize = parseInt(roomSizeSlider.value);
        const allergy = allergyLevel.value;
        const room = roomType.value;
        const budgetLevel = budget.value;
        
        // Calculate required CADR
        const requiredCADR = calculateCADR(roomSize, allergy, room);
        
        // Find best product
        const bestProduct = findBestProduct(requiredCADR, budgetLevel, room);
        
        // Calculate costs
        const costs = calculateTotalCost(bestProduct);
        
        // Generate HTML
        const recommendationHTML = generateRecommendation(bestProduct, requiredCADR, costs);
        
        // Show results
        resultsPlaceholder.style.display = 'none';
        resultsOutput.innerHTML = recommendationHTML;
        resultsOutput.style.display = 'block';
        
        // Scroll to results
        resultsOutput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Add some CSS for the results
        const style = document.createElement('style');
        style.textContent = `
            .recommendation-card {
                background: white;
                border-radius: 12px;
                padding: 2rem;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            }
            .product-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                padding-bottom: 1rem;
                border-bottom: 2px solid #e5e7eb;
            }
            .product-header h4 {
                margin: 0;
                color: #1f2937;
                font-size: 1.5rem;
            }
            .product-price {
                font-size: 2rem;
                font-weight: bold;
                color: #2563eb;
            }
            .specs-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1rem;
                margin-bottom: 2rem;
            }
            .spec {
                background: #f9fafb;
                padding: 1rem;
                border-radius: 8px;
                text-align: center;
            }
            .spec-label {
                font-size: 0.875rem;
                color: #6b7280;
                margin-bottom: 0.25rem;
            }
            .spec-value {
                font-size: 1.5rem;
                font-weight: bold;
                color: #1f2937;
                margin-bottom: 0.5rem;
            }
            .spec-note {
                font-size: 0.875rem;
                color: #10b981;
            }
            .cost-breakdown {
                background: #f0f9ff;
                padding: 1.5rem;
                border-radius: 8px;
                margin-bottom: 1.5rem;
            }
            .cost-breakdown h5 {
                margin-top: 0;
                color: #0369a1;
            }
            .cost-item, .cost-total, .cost-monthly {
                display: flex;
                justify-content: space-between;
                padding: 0.5rem 0;
                border-bottom: 1px solid #e0f2fe;
            }
            .cost-total {
                font-weight: bold;
                border-bottom: 2px solid #0369a1;
                margin-top: 0.5rem;
                padding-top: 1rem;
            }
            .cost-monthly {
                color: #10b981;
                font-weight: bold;
                margin-top: 0.5rem;
            }
            .features ul {
                list-style: none;
                padding: 0;
            }
            .features li {
                padding: 0.5rem 0;
                color: #4b5563;
            }
            .features li i {
                color: #10b981;
                margin-right: 0.5rem;
            }
            .buy-recommendation {
                display: block;
                background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
                color: white;
                text-align: center;
                padding: 1rem;
                border-radius: 8px;
                text-decoration: none;
                font-weight: bold;
                margin: 1.5rem 0;
                transition: transform 0.3s;
            }
            .buy-recommendation:hover {
                transform: translateY(-2px);
            }
            .disclaimer {
                text-align: center;
                color: #6b7280;
                font-size: 0.875rem;
                padding-top: 1rem;
                border-top: 1px solid #e5e7eb;
            }
        `;
        document.head.appendChild(style);
    });
    
    // Initialize with default values
    roomSizeValue.textContent = roomSizeSlider.value;
});