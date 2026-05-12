<?php
session_start();
include 'config.php'; // ডাটাবেস কানেকশন

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // ১. ইনপুট ডাটা ফিল্টার করা (XSS ও SQL Injection ঠেকাবে)
    $trx_id = htmlspecialchars(strip_tags($_POST['transaction_id']));
    $payment_method = htmlspecialchars(strip_tags($_POST['method'])); // বিকাশ/নগদ
    $amount = filter_var($_POST['amount'], FILTER_SANITIZE_NUMBER_FLOAT);
    $user_id = $_SESSION['user_id'];

    // ২. ট্রানজেকশন আইডি খালি কি না চেক
    if (empty($trx_id) || strlen($trx_id) < 8) {
        die("ভুল ট্রানজেকশন আইডি! আবার চেষ্টা করুন।");
    }

    // ৩. ডুপ্লিকেট ট্রানজেকশন চেক (একই আইডি দিয়ে যেন বারবার অর্ডার না হয়)
    $check_stmt = $pdo->prepare("SELECT id FROM orders WHERE transaction_id = ?");
    $check_stmt->execute([$trx_id]);
    
    if ($check_stmt->rowCount() > 0) {
        die("এই ট্রানজেকশন আইডিটি ইতিমধ্যে ব্যবহার করা হয়েছে!");
    }

    // ৪. অর্ডারটি 'Pending' হিসেবে ডাটাবেসে সেভ করা
    try {
        $stmt = $pdo->prepare("INSERT INTO orders (user_id, amount, method, transaction_id, status, order_date) VALUES (?, ?, ?, ?, 'pending', NOW())");
        $stmt->execute([$user_id, $amount, $payment_method, $trx_id]);

        // ৫. সাকসেস মেসেজ ও অ্যাডমিনকে নোটিফিকেশন (সিমুলেশন)
        echo "<script>
                alert('আপনার পেমেন্ট রিকোয়েস্ট জমা হয়েছে। অ্যাডমিন ভেরিফাই করলে ৫ মিনিটের মধ্যে ডেলিভারি পাবেন।');
                window.location.href = 'dashboard.php';
              </script>";
              
    } catch (Exception $e) {
        error_log($e->getMessage()); // এরর লগ ফাইলে সেভ হবে, স্ক্রিনে দেখাবে না (সিকিউরিটি)
        die("দুঃখিত, সার্ভারে সমস্যা হচ্ছে। পরে চেষ্টা করুন।");
    }
}
?>
