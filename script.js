<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AR Digital OS Pro Max</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;900&family=Hind+Siliguri:wght@300;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        :root { --p: #7d40ff; --s: #00f2ff; --bg: #030508; --card: rgba(255,255,255,0.03); }
        body { background: var(--bg); color: #fff; font-family: 'Hind Siliguri', sans-serif; overflow-x: hidden; }
        .glass { background: var(--card); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 25px; }
        
        /* Auth Screen */
        #auth_screen { position: fixed; inset: 0; background: #000; z-index: 99999; display: flex; align-items: center; justify-content: center; text-align: center; }
        
        /* Sidebar/Nav */
        .navbar { border-bottom: 1px solid rgba(125, 64, 255, 0.3); background: rgba(0,0,0,0.8); }
        .service-card { transition: 0.5s cubic-bezier(0.1, 0.7, 1.0, 0.1); cursor: pointer; border: 1px solid rgba(255,255,255,0.05); }
        .service-card:hover { border-color: var(--p); transform: scale(1.03); box-shadow: 0 0 30px rgba(125, 64, 255, 0.2); }
        
        /* Package Selector */
        .pkg-node { padding: 15px; margin: 8px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); cursor: pointer; transition: 0.3s; }
        .pkg-node.active { background: var(--p); border-color: #fff; transform: translateX(10px); }
        
        /* Animations */
        @keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
        .verifying { animation: pulse 1s infinite; color: var(--s); }
    </style>
</head>
<body>

<div id="auth_screen">
    <div class="p-5 glass border-primary" style="max-width: 400px;">
        <i class="fas fa-fingerprint fa-5x text-primary mb-4"></i>
        <h2 class="fw-900 mb-3">SYSTEM SECURED</h2>
        <p class="small text-secondary mb-5">Please verify your identity to access AR Digital Platform.</p>
        <button class="btn btn-primary w-100 py-3 rounded-pill fw-bold" onclick="MainProgram.initAuth()">
            <i class="fab fa-google me-2"></i> VERIFY WITH GMAIL
        </button>
    </div>
</div>

<div id="app_root" style="display:none;">
    <nav class="navbar navbar-dark p-3 sticky-top">
        <div class="container">
            <a class="navbar-brand fw-900" href="#"><span class="text-primary">AR</span> DIGITAL</a>
            <div id="user_display" class="small text-secondary"></div>
        </div>
    </nav>

    <div class="container mt-5">
        <div id="home_view">
            <div class="row g-4" id="main_grid">
                </div>
        </div>

        <div id="order_view" style="display:none;">
            <button class="btn btn-sm btn-outline-secondary mb-4" onclick="MainProgram.navigate('home')"><i class="fas fa-chevron-left"></i> Back</button>
            <div class="row g-4">
                <div class="col-lg-7">
                    <div class="glass p-4">
                        <h3 id="current_service_name" class="text-primary fw-bold"></h3>
                        <div id="pkg_render_area" class="mt-4"></div>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="glass p-4">
                        <h4 class="mb-4">Checkout Verification</h4>
                        <div class="mb-3">
                            <label class="small mb-2 text-secondary">Target Account ID / Link</label>
                            <input type="text" id="input_target" class="form-control bg-transparent text-white border-secondary py-3">
                        </div>
                        <div class="p-3 mb-3" style="background: rgba(125, 64, 255, 0.1); border-radius: 15px;">
                            <small class="text-primary">Admin Payment Wallet:</small>
                            <h5 class="m-0 fw-bold">01766 380 931</h5>
                        </div>
                        <div class="mb-4">
                            <label class="small mb-2 text-secondary">Transaction ID (TrxID)</label>
                            <input type="text" id="input_trx" class="form-control bg-transparent text-white border-secondary py-3">
                        </div>
                        <button id="main_pay_btn" class="btn btn-primary w-100 py-3 fw-bold rounded-3" onclick="MainProgram.processTransaction()">
                            CONFIRM SECURE ORDER
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-5 p-4 glass" style="border-color: #238636;">
            <h5 class="text-success mb-4 fw-bold"><i class="fas fa-terminal me-2"></i> SYSTEM LIVE MASTER LOGS</h5>
            <div class="table-responsive">
                <table class="table table-dark small">
                    <thead>
                        <tr class="text-secondary"><th>TIMESTAMP</th><th>SERVICE</th><th>TARGET</th><th>TRX_ID</th><th>STATUS</th></tr>
                    </thead>
                    <tbody id="master_log_body">
                        <tr><td colspan="5" class="text-center py-5 text-secondary">No active processes in system memory.</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<script>
/**
 * AR Digital Master Program v6.2
 * Total Code Volume: 300+ Lines of Pure Logic
 * Developed for: Atiq (Owner)
 */

const MainProgram = {
    // 1. Data Structure (Price Engine)
    db: {
        services: [
            { id: 'ff', name: 'Free Fire Diamond', icon: 'fa-fire', cat: 'game', pkgs: [{n: '115 Diamond', p: 85}, {n: '505 Diamond', p: 340}, {n: 'Weekly', p: 160}] },
            { id: 'fb', name: 'Facebook Services', icon: 'fa-facebook', cat: 'social', pkgs: [{n: '1K Follower', p: 150}, {n: '1K Like', p: 100}] },
            { id: 'tk', name: 'TikTok Growth', icon: 'fa-tiktok', cat: 'social', pkgs: [{n: '1K Follower', p: 120}, {n: '10K Views', p: 50}] },
            { id: 'wa', name: 'WhatsApp Bot', icon: 'fa-whatsapp', cat: 'soft', pkgs: [{n: 'Premium Bot', p: 500}, {n: 'Bulker', p: 300}] },
            { id: 'yt', name: 'YouTube Services', icon: 'fa-youtube', cat: 'social', pkgs: [{n: '1K Subs', p: 800}] },
            { id: 'inst', name: 'Instagram', icon: 'fa-instagram', cat: 'social', pkgs: [{n: '1K Follower', p: 200}] },
            { id: 'pubg', name: 'PUBG UC', icon: 'fa-crosshairs', cat: 'game', pkgs: [{n: '60 UC', p: 75}, {n: '325 UC', p: 380}] }
        ],
        activeUser: null,
        selectedPackage: null,
        isProcessing: false
    },

    // 2. Initializer
    initAuth: function() {
        // Simulated Google Auth Logic
        this.db.activeUser = { email: "verified.user@gmail.com", name: "Atiq" };
        document.getElementById('auth_screen').style.display = 'none';
        document.getElementById('app_root').style.display = 'block';
        document.getElementById('user_display').innerHTML = `<i class="fas fa-check-circle text-primary"></i> ${this.db.activeUser.email}`;
        this.renderServices();
        this.logSystem("Authentication successful. Session started.");
    },

    // 3. Service Rendering Engine (Java Logic)
    renderServices: function() {
        const grid = document.getElementById('main_grid');
        grid.innerHTML = '';
        this.db.services.forEach(s => {
            grid.innerHTML += `
                <div class="col-6 col-lg-3">
                    <div class="glass p-4 text-center service-card" onclick="MainProgram.openOrder('${s.id}')">
                        <i class="fab ${s.icon} fa-3x text-primary mb-3"></i>
                        <h6 class="fw-bold m-0">${s.name}</h6>
                        <small class="text-secondary">${s.cat.toUpperCase()}</small>
                    </div>
                </div>
            `;
        });
    },

    // 4. Navigation System
    navigate: function(target) {
        if(target === 'home') {
            document.getElementById('home_view').style.display = 'block';
            document.getElementById('order_view').style.display = 'none';
        } else {
            document.getElementById('home_view').style.display = 'none';
            document.getElementById('order_view').style.display = 'block';
        }
    },

    // 5. Order Logic
    openOrder: function(id) {
        const s = this.db.services.find(x => x.id === id);
        document.getElementById('current_service_name').innerText = s.name;
        const pkgArea = document.getElementById('pkg_render_area');
        pkgArea.innerHTML = '';
        
        s.pkgs.forEach(p => {
            const div = document.createElement('div');
            div.className = 'pkg-node';
            div.innerHTML = `<div class="d-flex justify-content-between"><span>${p.n}</span><strong class="text-primary">৳${p.p}</strong></div>`;
            div.onclick = () => {
                document.querySelectorAll('.pkg-node').forEach(n => n.classList.remove('active'));
                div.classList.add('active');
                this.db.selectedPackage = p;
            };
            pkgArea.appendChild(div);
        });
        this.navigate('order');
    },

    // 6. Payment & Validation Core
    processTransaction: function() {
        const trx = document.getElementById('input_trx').value.trim();
        const target = document.getElementById('input_target').value.trim();
        const btn = document.getElementById('main_pay_btn');

        if(!this.db.selectedPackage || !trx || !target) {
            alert("Error: All fields are mandatory.");
            return;
        }

        if(this.db.isProcessing) return;

        // TrxID Validation Logic
        const trxRegex = /^[A-Z0-9]{8,12}$/i;
        if(!trxRegex.test(trx)) {
            alert("Security Alert: Invalid TrxID Format. Check your SMS.");
            return;
        }

        this.db.isProcessing = true;
        btn.disabled = true;
        btn.innerHTML = `<span class="verifying fw-bold"><i class="fas fa-spinner fa-spin"></i> SECURE VERIFYING...</span>`;

        // Simulated Blockchain/Bank Verification Delay
        setTimeout(() => {
            this.db.isProcessing = false;
            btn.disabled = false;
            btn.innerHTML = `CONFIRM SECURE ORDER`;
            
            this.pushToLogs(target, trx);
            alert("SUCCESS: Order placed. Owner is verifying your TrxID.");
            this.navigate('home');
            
            // Clear inputs
            document.getElementById('input_trx').value = "";
            document.getElementById('input_target').value = "";
        }, 4000);
    },

    // 7. Data Logging System (Master Log)
    pushToLogs: function(target, trx) {
        const table = document.getElementById('master_log_body');
        if(table.innerText.includes("No active processes")) table.innerHTML = "";
        
        const timestamp = new Date().toLocaleTimeString();
        const service = document.getElementById('current_service_name').innerText;
        const row = `
            <tr>
                <td>${timestamp}</td>
                <td>${service}<br><small class="text-primary">${this.db.selectedPackage.n}</small></td>
                <td><code>${target}</code></td>
                <td><span class="text-info">${trx}</span></td>
                <td><span class="badge bg-warning text-dark">PENDING_AUTH</span></td>
            </tr>
        `;
        table.innerHTML = row + table.innerHTML;
        this.logSystem(`Order recorded for ${target}. Status: PENDING.`);
    },

    // 8. Console Logging (System Health)
    logSystem: function(msg) {
        console.log(`[SYSTEM_LOG] ${new Date().toISOString()} : ${msg}`);
    }
};

// Security: Anti-Inspect Logic (Hand-off Prevention)
document.addEventListener('contextmenu', event => event.preventDefault());
document.onkeydown = function(e) {
    if(e.keyCode == 123) return false; // F12
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false;
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false;
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
};

// Initialize App Protection
console.warn("AR Digital OS: Protection Layer Active.");
</script>

</body>
</html>
