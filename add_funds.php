<div class="card">
    <h3><i class="fas fa-wallet"></i> ফান্ড অ্যাড করুন (Add Funds)</h3>
    <p>নিচের যেকোনো একটি পেমেন্ট মেথড সিলেক্ট করুন:</p>
    
    <div style="display: flex; gap: 15px; margin-bottom: 20px;">
        <div style="background: #d1005d; padding: 15px; border-radius: 10px; flex: 1; text-align: center; cursor: pointer;">
            <img src="https://logovtor.com/wp-content/uploads/2021/11/bkash-logo-vector.png" height="30" alt="bKash"><br>বিকাশ
        </div>
        <div style="background: #f7941d; padding: 15px; border-radius: 10px; flex: 1; text-align: center; cursor: pointer;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Nagad_Logo.svg/1200px-Nagad_Logo.svg.png" height="30" alt="Nagad"><br>নগদ
        </div>
    </div>

    <form action="process_payment.php" method="POST">
        <label>টাকার পরিমাণ (Amount in BDT)</label>
        <input type="number" name="amount" placeholder="৫০০" required>
        
        <label>ট্রানজেকশন আইডি (Transaction ID)</label>
        <input type="text" name="trxid" placeholder="TRX12345678" required>
        
        <button class="btn" style="background: #22c55e;">পেমেন্ট কনফার্ম করুন</button>
    </form>
    
    <div style="margin-top: 20px; background: #334155; padding: 15px; border-radius: 8px;">
        <strong>কিভাবে পেমেন্ট করবেন?</strong><br>
        ১. আমাদের বিকাশ নাম্বারে (০১৭৬৬৩৮০৯৩১) সেন্ড মানি করুন।<br>
        ২. ট্রানজেকশন আইডি কপি করে উপরের বক্সে দিন।<br>
        ৩. কনফার্ম বাটনে ক্লিক করলে ৫-১০ মিনিটের মধ্যে টাকা যোগ হবে।
    </div>
</div>
