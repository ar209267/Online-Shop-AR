<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Signup | Online Shop AR</title>
    <style>
        body { background: #0f172a; color: white; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .signup-box { background: #1e293b; padding: 30px; border-radius: 15px; width: 350px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
        .signup-box h2 { color: #38bdf8; text-align: center; }
        input { width: 100%; padding: 12px; margin: 10px 0; border-radius: 8px; border: 1px solid #334155; background: #0f172a; color: white; box-sizing: border-box; }
        .btn { width: 100%; background: #22c55e; color: white; padding: 12px; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; }
    </style>
</head>
<body>
    <div class="signup-box">
        <h2>Register</h2>
        <form action="process_signup.php" method="POST">
            <input type="text" name="name" placeholder="আপনার পুরো নাম" required>
            <input type="email" name="email" placeholder="আপনার ইমেইল" required>
            <input type="text" name="username" placeholder="ইউজার নেম" required>
            <input type="password" name="password" placeholder="পাসওয়ার্ড" required>
            <button type="submit" class="btn">অ্যাকাউন্ট তৈরি করুন</button>
        </form>
    </div>
</body>
</html>
