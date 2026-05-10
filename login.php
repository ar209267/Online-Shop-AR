<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login | Online Shop AR</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        body { background: #0f172a; color: white; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .login-box { background: #1e293b; padding: 40px; border-radius: 15px; width: 350px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); text-align: center; }
        .login-box h2 { color: #38bdf8; margin-bottom: 25px; }
        input { width: 100%; padding: 12px; margin: 10px 0; border-radius: 8px; border: 1px solid #334155; background: #0f172a; color: white; box-sizing: border-box; }
        .btn { width: 100%; background: #38bdf8; color: #000; padding: 12px; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 16px; transition: 0.3s; }
        .btn:hover { background: #7dd3fc; }
        .links { margin-top: 15px; font-size: 14px; }
        .links a { color: #38bdf8; text-decoration: none; }
    </style>
</head>
<body>
    <div class="login-box">
        <h2>Online Shop AR</h2>
        <form action="process_login.php" method="POST">
            <input type="text" name="username" placeholder="ইউজার নেম" required>
            <input type="password" name="password" placeholder="পাসওয়ার্ড" required>
            <button type="submit" class="btn">লগইন করুন</button>
        </form>
        <div class="links">
            অ্যাকাউন্ট নেই? <a href="signup.php">নতুন অ্যাকাউন্ট খুলুন</a>
        </div>
    </div>
</body>
</html>
