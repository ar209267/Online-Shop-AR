// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyC5i7S0EJeF08NsO7VbiU63r-N5S4lUv_M", 
    authDomain: "online-shop-ar.firebaseapp.com",
    databaseURL: "https://online-shop-ar-default-rtdb.firebaseio.com",
    projectId: "online-shop-ar",
    storageBucket: "online-shop-ar.appspot.com",
    messagingSenderId: "913434308973",
    appId: "1:913434308973:web:d0b1f8f7dda8c64f586a64"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// Preloader remove
window.onload = () => {
    document.getElementById('preloader').style.display = 'none';
};

// Auth Watcher
auth.onAuthStateChanged(user => {
    if(user) {
        document.getElementById('auth-area').style.display = 'none';
        document.getElementById('app-ui').style.display = 'block';
        // ব্যালেন্স আপডেট লজিক
        db.ref('users/' + user.uid + '/balance').on('value', snap => {
            document.getElementById('bal-val').innerText = "৳ " + (snap.val() || "০.০০");
        });
    } else {
        document.getElementById('auth-area').style.display = 'flex';
        document.getElementById('app-ui').style.display = 'none';
    }
});

function handleLogin() {
    const e = document.getElementById('email').value;
    const p = document.getElementById('pass').value;
    auth.signInWithEmailAndPassword(e, p).catch(err => alert(err.message));
}
