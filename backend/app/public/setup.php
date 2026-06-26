<?php
// InfinityFree Setup Script for Gastotrack
// Access this file via: https://your-domain.com/setup.php
// DELETE THIS FILE AFTER SETUP IS COMPLETE!

error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h1>Gastotrack Backend Setup</h1>";
echo "<p>Setting up your Laravel backend...</p>";

// Change to Laravel root directory
chdir(__DIR__ . '/..');

// Run migrations
echo "<h3>Running Database Migrations...</h3>";
exec('php artisan migrate --force 2>&1', $output, $return);
echo "<pre>" . implode("\n", $output) . "</pre>";

if ($return === 0) {
    echo "<p style='color: green;'>✓ Migrations completed successfully!</p>";
} else {
    echo "<p style='color: red;'>✗ Migration failed. Check database credentials in .env file.</p>";
}

// Run seeders
echo "<h3>Running Database Seeders...</h3>";
exec('php artisan db:seed --force 2>&1', $output, $return);
echo "<pre>" . implode("\n", $output) . "</pre>";

if ($return === 0) {
    echo "<p style='color: green;'>✓ Seeders completed successfully!</p>";
} else {
    echo "<p style='color: orange;'>⚠ Seeder may have failed or already run.</p>";
}

// Test API
echo "<h3>Testing API...</h3>";
$testUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]/api/categories";
echo "<p>Test URL: <a href='$testUrl' target='_blank'>$testUrl</a></p>";

echo "<hr>";
echo "<h2 style='color: red;'>⚠️ IMPORTANT: DELETE THIS FILE (setup.php) NOW!</h2>";
echo "<p>Your backend is ready. Update your mobile app's config.js with:</p>";
echo "<pre>export const API_BASE_URL = 'https://" . $_SERVER['HTTP_HOST'] . "/api';</pre>";
?>
