<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Panel | Online Shop AR</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        body { background: #0f172a; color: white; font-family: sans-serif; margin: 0; display: flex; }
        .sidebar { width: 260px; background: #1e293b; height: 100vh; padding: 20px; box-sizing: border-box; }
        .content { flex: 1; padding: 30px; }
        .stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: #1e293b; padding: 20px; border-radius: 12px; border-left: 5px solid #38bdf8; }
        table { width: 100%; border-collapse: collapse; background: #1e293b; border-radius: 10px; overflow: hidden; }
        th, td { padding: 15px; text-align: left; border-bottom: 1px solid #334155; }
        th { background: #334155; color: #38bdf8; }
        .status-badge { padding: 5px 10px; border-radius: 20px; font-size: 12px; font-weight: bold; }
        .pending { background: #f59e0b; color: #000; }
        .completed { background: #10b981; color: #fff; }
    </style>
</head>
<body>

<div class="sidebar">
    <h2><i class="fas fa-user-shield"></i> Admin</h2>
    <hr style="border: 1px solid #334155;">
    <p><i class="fas fa-tachometer-alt"></i> Dashboard</p>
    <p><i class="fas fa-users"></i> Manage Users</p>
    <p><i class="fas fa-shopping-cart"></i> All Orders</p>
    <p><i class="fas fa-cog"></i> Site Settings</p>
    <p><i class="fas fa-sign-out-alt"></i> Logout</p>
</div>

<div class="content">
    <div class="stat-grid">
        <div class="stat-card">
            <h3>Total Users</h3>
            <h2>১,২৫০ জন</h2>
        </div>
        <div class="stat-card" style="border-left-color: #10b981;">
            <h3>Total Orders</h3>
            <h2>৫,৪২০ টি</h2>
        </div>
        <div class="stat-card" style="border-left-color: #f59e0b;">
            <h3>Total Balance</h3>
            <h2>৳ ৪৫,২০০</h2>
        </div>
    </div>

    <h3>সাম্প্রতিক অর্ডারসমূহ (Recent Orders)</h3>
    <table>
        <thead>
            <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Service</th>
                <th>Link</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>#1001</td>
                <td>Atique</td>
                <td>FB Followers</td>
                <td>facebook.com/profile</td>
                <td><span class="status-badge pending">Pending</span></td>
                <td><button style="background: #38bdf8; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;">Update</button></td>
            </tr>
        </tbody>
    </table>
</div>

</body>
</html>
