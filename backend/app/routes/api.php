<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AdminTransactionController;
use App\Http\Controllers\Admin\AdminCategoryController;
use App\Http\Controllers\Admin\AdminAnalyticsController;
use App\Http\Controllers\Admin\AdminSettingsController;
use App\Http\Middleware\JwtMiddleware;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,1');

// Protected routes (JWT required)
Route::middleware('jwt')->group(function () {
    // Auth
    Route::get('/me', [AuthController::class, 'me']);
    
    // Transactions
    Route::get('/transactions', [TransactionController::class, 'index']);
    Route::post('/transactions', [TransactionController::class, 'store']);
    Route::delete('/transactions/{id}', [TransactionController::class, 'destroy']);
    
    // Categories
    Route::get('/categories', [CategoryController::class, 'index']);
    
    // Budgets
    Route::get('/budgets', [BudgetController::class, 'index']);
    Route::post('/budgets', [BudgetController::class, 'store']);
    
    // Analytics & Dashboard
    Route::get('/dashboard', [AnalyticsController::class, 'dashboard']);
    Route::get('/analytics', [AnalyticsController::class, 'analytics']);
    
    // Chatbot
    Route::post('/chatbot', [ChatbotController::class, 'message']);
});

// Admin routes (JWT + Admin role required)
Route::middleware(['jwt', 'admin'])->prefix('admin')->group(function () {
    // Users
    Route::get('/users', [AdminUserController::class, 'index']);
    Route::get('/users/{id}', [AdminUserController::class, 'show']);
    Route::patch('/users/{id}/toggle', [AdminUserController::class, 'toggleActive']);
    Route::delete('/users/{id}', [AdminUserController::class, 'destroy']);
    
    // Transactions
    Route::get('/transactions', [AdminTransactionController::class, 'index']);
    Route::delete('/transactions/{id}', [AdminTransactionController::class, 'destroy']);
    
    // Categories
    Route::get('/categories', [AdminCategoryController::class, 'index']);
    Route::post('/categories', [AdminCategoryController::class, 'store']);
    Route::put('/categories/{id}', [AdminCategoryController::class, 'update']);
    Route::delete('/categories/{id}', [AdminCategoryController::class, 'destroy']);
    
    // Analytics
    Route::get('/analytics', [AdminAnalyticsController::class, 'index']);
    
    // Settings
    Route::get('/settings', [AdminSettingsController::class, 'index']);
    Route::put('/settings', [AdminSettingsController::class, 'update']);
});


