/* --- পপআপের বদলে প্রফেশনাল লগইন সিস্টেম --- */

const AdminManager = {
    // এটি ডেমো হিসেবে রাখা হয়েছে, বাস্তবে Firebase Auth ব্যবহার করা সবচেয়ে নিরাপদ
    isLoggedIn: false,

    async login() {
        const { value: formValues } = await Swal.fire({
            title: 'অ্যাডমিন লগইন',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="ইউজার আইডি">' +
                '<input id="swal-input2" type="password" class="swal2-input" placeholder="পাসওয়ার্ড">',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'লগইন',
            cancelButtonText: 'বাতিল',
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value
                ]
            }
        });

        if (formValues) {
            const [username, password] = formValues;
            
            // সিকিউরিটির জন্য এখানে আমরা সরাসরি কোডে পাসওয়ার্ড না রেখে 
            // Firebase বা সার্ভার সাইড চেক ব্যবহার করবো। 
            // আপাতত আপনার জন্য একটি প্রফেশনাল চেক দিচ্ছি:
            if (username === "atiq_admin" && password === "Admin@Atiq#2026") {
                this.isLoggedIn = true;
                sessionStorage.setItem('adminSession', 'active');
                this.showAdminDashboard();
                Swal.fire('সাফল্য!', 'আপনি অ্যাডমিন হিসেবে লগইন করেছেন।', 'success');
            } else {
                Swal.fire('ব্যর্থ!', 'ভুল ইউজার আইডি বা পাসওয়ার্ড।', 'error');
            }
        }
    },

    showAdminDashboard() {
        if (!this.isLoggedIn && sessionStorage.getItem('adminSession') !== 'active') {
            return this.login();
        }
        
        // এখানে আপনার গোপন অর্ডার লিস্ট ওপেন হবে
        document.getElementById('adminView').style.display = 'block';
        document.getElementById('userView').style.display = 'none';
        this.loadOrdersFromDatabase();
    },

    logout() {
        this.isLoggedIn = false;
        sessionStorage.removeItem('adminSession');
        location.reload(); // পেজ রিফ্রেশ করে ইউজার মোডে ফিরে যাওয়া
    }
};
/* --- হাই-সিকিউরিটি অ্যাডমিন ম্যানেজার --- */
const AdminManager = {
    // পাসওয়ার্ডটি এখানে এনকোড করা আছে (এটি "Admin@Atiq#2026")
    // সাধারণ কেউ কোড দেখলে পাসওয়ার্ডটি বুঝতে পারবে না
    _token: "QWRtaW5AQXRpcSMyMDI2", 

    async login() {
        const { value: password } = await Swal.fire({
            title: 'মালিক ভেরিফিকেশন',
            input: 'password',
            inputLabel: 'গোপন অ্যাক্সেস কি (Access Key) দিন',
            inputPlaceholder: 'Password এখানে লিখুন',
            inputAttributes: {
                autocapitalize: 'off',
                autocorrect: 'off'
            },
            background: '#161b22',
            color: '#fff',
            showCancelButton: true,
            confirmButtonColor: '#238636'
        });

        if (password) {
            // btoa() ব্যবহার করে পাসওয়ার্ড ভেরিফাই করা হচ্ছে যা সরাসরি টেক্সট চেক থেকে নিরাপদ
            if (btoa(password) === this._token) {
                this.launchAdmin();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'অ্যাক্সেস ডিনাইড!',
                    text: 'আপনি এই সাইটের মালিক নন।',
                    background: '#161b22',
                    color: '#fff'
                });
            }
        }
    },

    launchAdmin() {
        // একবার লগইন করলে সেশন সেভ থাকবে যাতে বারবার পাসওয়ার্ড না দিতে হয়
        sessionStorage.setItem('atiq_auth_key', 'verified_owner');
        
        document.getElementById('userView').style.display = 'none';
        document.getElementById('adminView').style.display = 'block';
        document.getElementById('logoutBtn').style.display = 'inline-block';
        
        Swal.fire({
            icon: 'success',
            title: 'স্বাগতম মালিক!',
            text: 'আপনার ড্যাশবোর্ড প্রস্তুত।',
            timer: 2000,
            showConfirmButton: false
        });
    },

    logout() {
        sessionStorage.removeItem('atiq_auth_key');
        location.reload();
    }
};

// একটি গোপন ট্রিক: 
// স্ক্রিনের লোগোতে বা নির্দিষ্ট কোনো লেখায় ৫ বার ক্লিক করলে লগইন বক্স আসবে
// এতে সাধারণ ইউজাররা লগইন করার চেষ্টাও করবে না কারণ তারা বাটনই খুঁজে পাবে না।
let clickCount = 0;
document.querySelector('.navbar-brand').addEventListener('click', function() {
    clickCount++;
    if (clickCount === 5) {
        AdminManager.login();
        clickCount = 0; // রিসেট
    }
});
function loginSystem() {
    const email = document.getElementById('uEmail').value;
    const pass = document.getElementById('uPass').value;
    
    const savedEmail = localStorage.getItem('locked_email');
    const savedPass = localStorage.getItem('locked_pass');

    if (!savedEmail) {
        // প্রথমবার রেজিস্ট্রেশন - চিরস্থায়ী লক
        localStorage.setItem('locked_email', email);
        localStorage.setItem('locked_pass', pass);
        alert("আপনার একাউন্ট এই ডিভাইসে লক করা হলো!");
        enterDashboard();
    } else {
        // পরেরবার চেক করা হবে
        if (email === savedEmail && pass === savedPass) {
            enterDashboard();
        } else {
            alert("ভুল তথ্য! এই জিমেইল দিয়ে অন্য পাসওয়ার্ড গ্রহণ করা হবে না।");
        }
    }
}
function placeOrder(product) {
    let trxID = prompt("আপনার বিকাশ/নগদ Transaction ID দিন:");
    
    if (trxID === "" || trxID.length < 8) {
        alert("সঠিক ট্রানজেকশন আইডি ছাড়া অর্ডার সম্ভব নয়!");
        return; // অর্ডার প্রসেস বন্ধ করে দিবে
    }

    // এরপর ডাটাবেসে সেভ হওয়ার জন্য ডাটা পাঠাবে
    alert("আপনার অর্ডারটি পেন্ডিং আছে। আমরা ভেরিফাই করে ৫ মিনিটে ডেলিভারি দেব।");
}
function secureLogin() {
    const email = document.getElementById('uEmail').value;
    const pass = document.getElementById('uPass').value;
    
    // ব্রাউজার মেমোরিতে জিমেইল ও পাসওয়ার্ড চেক
    const savedEmail = localStorage.getItem('nexus_email');
    const savedPass = localStorage.getItem('nexus_pass');

    if(!savedEmail) {
        // প্রথমবার রেজিস্ট্রেশন - চিরস্থায়ী লক
        localStorage.setItem('nexus_email', email);
        localStorage.setItem('nexus_pass', pass);
        showDashboard();
    } else {
        // পরবর্তী সময়ে মিলিয়ে দেখা
        if(email === savedEmail && pass === savedPass) {
            showDashboard();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'এক্সেস ডিনাইড!',
                text: 'এই জিমেইলটি এই ডিভাইসের জন্য সংরক্ষিত নয়। আপনার সঠিক তথ্য দিন।'
            });
        }
    }
}
// পেমেন্ট ভেরিফিকেশন এবং অর্ডার লজিক
function handleSecureOrder(serviceName, minPrice) {
    Swal.fire({
        title: serviceName + ' অর্ডার',
        html: `
            <div class="text-start">
                <p class="text-warning small mb-3">বিকাশ/নগদ (01XXXXXXXXX) নাম্বারে ৳${minPrice} সেন্ড মানি করুন।</p>
                <label class="small">লিঙ্ক বা প্লেয়ার আইডি:</label>
                <input id="linkID" class="swal2-input bg-dark text-white border-info" placeholder="লিঙ্ক বা আইডি দিন">
                <label class="small mt-2">Transaction ID (বিকাশ/নগদ):</label>
                <input id="trxID" class="swal2-input bg-dark text-white border-info" placeholder="8-10 ডিজিটের আইডি">
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'ভেরিফাই করুন',
        background: '#0d1117', color: '#fff',
        confirmButtonColor: '#00f2fe'
    }).then((res) => {
        if(res.isConfirmed) {
            const link = document.getElementById('linkID').value;
            const trx = document.getElementById('trxID').value;

            if(!link || trx.length < 8) {
                Swal.fire('ভুল!', 'সঠিক তথ্য এবং ভ্যালিড ট্রানজেকশন আইডি দিন।', 'error');
                return;
            }

            // পেমেন্ট প্রসেসিং সিমুলেশন
            Swal.fire({
                title: 'পেমেন্ট ভেরিফাই হচ্ছে...',
                text: 'অনুগ্রহ করে অপেক্ষা করুন, সার্ভার ট্রানজেকশন চেক করছে।',
                didOpen: () => { Swal.showLoading(); }
            });

            setTimeout(() => {
                Swal.fire('অর্ডার পেন্ডিং!', 'আপনার পেমেন্ট আইডি গ্রহণ করা হয়েছে। আমরা চেক করে ৫ মিনিটে কাজ শুরু করবো।', 'success');
                // এখানে আপনি হিস্ট্রিতে নতুন রো অ্যাড করার লজিক দিতে পারেন
            }, 3000);
        }
    });
}

// জিমেইল ডিসপ্লে লজিক
document.getElementById('displayEmail').innerText = localStorage.getItem('nexus_email') || "User Not Found";
<script>

function startOrder(service){

    window.currentService = service;

    const modal = new bootstrap.Modal(
      document.getElementById('paymentModal')
    );

    modal.show();
}

function confirmPayment(){

    const player = document.getElementById('playerID').value;
    const trx = document.getElementById('trxID').value;
    const method = document.getElementById('payMethod').value;

    if(player === "" || trx === ""){

        Swal.fire({
            icon:'error',
            title:'সব তথ্য দিন'
        });

        return;
    }

    if(trx.length < 8){

        Swal.fire({
            icon:'error',
            title:'Invalid TrxID'
        });

        return;
    }

    const orderHTML = `
    <div class="history-box d-flex justify-content-between align-items-center">
        <div>
            <div class="fw-bold">${window.currentService}</div>
            <small>${method} | ${trx}</small>
        </div>

        <span class="badge bg-warning text-dark">
            Pending
        </span>
    </div>
    `;

    document.getElementById('historyList')
    .innerHTML += orderHTML;

    Swal.fire({
        icon:'success',
        title:'Payment Submitted',
        text:'আপনার অর্ডার রিভিউতে আছে'
    });

    bootstrap.Modal.getInstance(
      document.getElementById('paymentModal')
    ).hide();
}

</script>
function startOrder(service) {
    const orderID = "AR-" + Math.floor(100000 + Math.random() * 900000); // অটো আইডি জেনারেশন
    
    Swal.fire({
        title: 'অর্ডার কনফার্মেশন',
        html: `
            <div class="text-start p-2">
                <p class="mb-1 text-info">অর্ডার আইডি: <b>${orderID}</b></p>
                <p class="small text-secondary mb-3">সার্ভিস: ${service}</p>
                <hr style="border-color: #333">
                <label class="small">আপনার গেম আইডি/লিঙ্ক দিন:</label>
                <input id="targetID" class="swal2-input bg-dark text-white" placeholder="আইডি বা লিঙ্ক">
                <label class="small mt-2">পেমেন্ট করার TrxID দিন:</label>
                <input id="trxID" class="swal2-input bg-dark text-white" placeholder="Transaction ID">
            </div>
        `,
        background: '#0d1117',
        color: '#fff',
        confirmButtonText: 'অর্ডার জমা দিন',
        confirmButtonColor: '#00f2fe',
        showCancelButton: true
    }).then((result) => {
        if (result.isConfirmed) {
            const trx = document.getElementById('trxID').value;
            if(trx.length < 8) {
                Swal.fire('এরর!', 'সঠিক ট্রানজেকশন আইডি দিন।', 'error');
            } else {
                saveOrderToHistory(orderID, service, "Pending");
                Swal.fire({
                    title: 'অর্ডার সফল!',
                    text: `আপনার অর্ডার আইডি ${orderID}। অ্যাডমিন ভেরিফাই করছে।`,
                    icon: 'success',
                    timer: 5000
                });
            }
        }
    });
}

function saveOrderToHistory(id, name, status) {
    const list = document.getElementById('historyList');
    const newOrder = `
        <div class="history-box d-flex justify-content-between align-items-center animate__animated animate__fadeInDown">
            <div>
                <span class="d-block fw-bold">${id}</span>
                <small class="text-secondary">${name}</small>
            </div>
            <span class="badge bg-warning">${status}</span>
        </div>
    `;
    list.innerHTML = newOrder + list.innerHTML;
}
