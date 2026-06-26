<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Transaction;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminAnalyticsController extends Controller
{
    public function index()
    {
        // Total registered users
        $totalUsers = User::count();

        // Transactions today
        $transactionsToday = Transaction::whereDate('created_at', today())->count();

        // Transactions this month
        $transactionsThisMonth = Transaction::whereMonth('created_at', date('n'))
            ->whereYear('created_at', date('Y'))
            ->count();

        // Total amount processed
        $totalAmount = Transaction::sum('amount');

        // Most used e-wallet source
        $mostUsedSource = Transaction::select('source', DB::raw('COUNT(*) as count'))
            ->where('source', '!=', 'manual')
            ->groupBy('source')
            ->orderByDesc('count')
            ->first();

        // Top spending category across all users
        $topCategory = Transaction::select('category_id', DB::raw('SUM(amount) as total'))
            ->where('type', 'expense')
            ->groupBy('category_id')
            ->orderByDesc('total')
            ->with('category')
            ->first();

        // New user registrations per month (last 6 months)
        $newUsersByMonth = User::select(
                DB::raw('EXTRACT(MONTH FROM created_at) as month'),
                DB::raw('EXTRACT(YEAR FROM created_at) as year'),
                DB::raw('COUNT(*) as count')
            )
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get()
            ->map(function ($item) {
                return [
                    'month' => date('M Y', mktime(0, 0, 0, $item->month, 1, $item->year)),
                    'count' => $item->count,
                ];
            });

        // Source distribution
        $sourceDistribution = Transaction::select('source', DB::raw('COUNT(*) as count'))
            ->groupBy('source')
            ->get()
            ->map(function ($item) {
                return [
                    'source' => $item->source,
                    'count' => $item->count,
                ];
            });

        return response()->json([
            'total_users' => $totalUsers,
            'transactions_today' => $transactionsToday,
            'transactions_this_month' => $transactionsThisMonth,
            'total_amount' => (float) $totalAmount,
            'most_used_source' => $mostUsedSource ? [
                'source' => $mostUsedSource->source,
                'count' => $mostUsedSource->count,
            ] : null,
            'top_category' => $topCategory ? [
                'id' => $topCategory->category_id,
                'name' => $topCategory->category->name,
                'total' => (float) $topCategory->total,
            ] : null,
            'new_users_by_month' => $newUsersByMonth,
            'source_distribution' => $sourceDistribution,
        ]);
    }
}
