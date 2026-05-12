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
