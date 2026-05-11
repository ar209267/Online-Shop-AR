<?php include 'config.php'; ?>
<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <title>Online Shop AR | Dashboard</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        body { background: #0f172a; color: #f8fafc; font-family: 'Segoe UI', sans-serif; margin: 0; }
        .sidebar { width: 250px; background: #1e293b; height: 100vh; position: fixed; padding: 20px; }
        .main { margin-left: 270px; padding: 30px; }
        .card { background: #1e293b; padding: 20px; border-radius: 12px; border: 1px solid #334155; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #334155; }
        th { color: #38bdf8; }
        .btn-order { background: #38bdf8; color: #000; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; font-weight: bold; }
    </style>
</head>
<body>

<div class="sidebar">
    <h2>Shop AR</h2>
    <p><i class="fas fa-home"></i> ড্যাশবোর্ড</p>
    <p><i class="fas fa-wallet"></i> ফান্ড অ্যাড (বিকাশ/নগদ)</p>
    <p><i class="fas fa-shopping-cart"></i> আমার অর্ডার</p>
    <p><i class="fas fa-headset"></i> সাপোর্ট টিকেট</p>
</div>

<div class="main">
    <div class="card" style="background: linear-gradient(135deg, #0ea5e9, #2563eb);">
        <h3>বর্তমান ব্যালেন্স: ৳০.০০</h3>
    </div>

    <div class="card">
        <h3>🔥 সেরা সার্ভিসসমূহ</h3>
        <table>
            <thead>
                <tr>
                    <th>সার্ভিসের নাম</th>
                    <th>প্রতি ১০০০ (৳)</th>
                    <th>মিনিমাম</th>
                    <th>অ্যাকশন</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>FB Profile Followers (Non-Drop) ♻️</td>
                    <td>৳১৮০</td>
                    <td>১০০</td>
                    <td><button class="btn-order">অর্ডার</button></td>
                </tr>
                <tr>
                    <td>YouTube Subscribers [Real]</td>
                    <td>৳৬৫০</td>
                    <td>৫০</td>
                    <td><button class="btn-order">অর্ডার</button></td>
                </tr>
                <tr>
                    <td>Fiverr Gig Promotion [HQ]</td>
                    <td>৳২৫০</td>
                    <td>১০০০</td>
                    <td><button class="btn-order">অর্ডার</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

</body>
</html>
