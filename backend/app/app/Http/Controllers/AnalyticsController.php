<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Budget;
use App\Models\Category;
use App\Services\BudgetService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    public function dashboard(Request $request)
    {
        $userId = $request->attributes->get('auth_user_id');
        $currentMonth = date('n');
        $currentYear = date('Y');

        // Total spent this month
        $totalSpent = Transaction::where('user_id', $userId)
            ->where('type', 'expense')
            ->whereMonth('transaction_date', $currentMonth)
            ->whereYear('transaction_date', $currentYear)
            ->sum('amount');

        // Total income this month
        $totalIncome = Transaction::where('user_id', $userId)
            ->where('type', 'income')
            ->whereMonth('transaction_date', $currentMonth)
            ->whereYear('transaction_date', $currentYear)
            ->sum('amount');

        // Top spending category
        $topCategory = Transaction::where('user_id', $userId)
            ->where('type', 'expense')
            ->whereMonth('transaction_date', $currentMonth)
            ->whereYear('transaction_date', $currentYear)
            ->select('category_id', DB::raw('SUM(amount) as total'))
            ->groupBy('category_id')
            ->orderByDesc('total')
            ->with('category')
            ->first();

        // Budget health
        $budgets = Budget::where('user_id', $userId)
            ->where('month', $currentMonth)
            ->where('year', $currentYear)
            ->get();

        $budgetsOnTrack = 0;
        $totalBudgets = $budgets->count();

        foreach ($budgets as $budget) {
            $status = BudgetService::checkBudget(
                $userId,
                $budget->category_id,
                $currentMonth,
                $currentYear
            );
            if (!$status['is_exceeded']) {
                $budgetsOnTrack++;
            }
        }

        // Recent 5 transactions
        $recentTransactions = Transaction::where('user_id', $userId)
            ->with('category')
            ->orderByDesc('transaction_date')
            ->orderByDesc('created_at')
            ->limit(5)
            ->get();

        return response()->json([
            'total_spent' => (float) $totalSpent,
            'total_income' => (float) $totalIncome,
            'top_category' => $topCategory ? [
                'id' => $topCategory->category_id,
                'name' => $topCategory->category->name,
                'icon' => $topCategory->category->icon,
                'color' => $topCategory->category->color,
                'amount' => (float) $topCategory->total,
            ] : null,
            'budget_health' => [
                'on_track' => $budgetsOnTrack,
                'total' => $totalBudgets,
                'percentage' => $totalBudgets > 0 ? round(($budgetsOnTrack / $totalBudgets) * 100) : 100,
            ],
            'recent_transactions' => $recentTransactions,
        ]);
    }

    public function analytics(Request $request)
    {
        $userId = $request->attributes->get('auth_user_id');
        $period = $request->query('period', 'month'); // week, month, year

        $startDate = null;
        $endDate = now();

        switch ($period) {
            case 'week':
                $startDate = now()->startOfWeek();
                break;
            case 'year':
                $startDate = now()->startOfYear();
                break;
            case 'month':
            default:
                $startDate = now()->startOfMonth();
                break;
        }

        // Category breakdown
        $categoryBreakdown = Transaction::where('user_id', $userId)
            ->where('type', 'expense')
            ->whereBetween('transaction_date', [$startDate, $endDate])
            ->select('category_id', DB::raw('SUM(amount) as total'))
            ->groupBy('category_id')
            ->with('category')
            ->get()
            ->map(function ($item) {
                return [
                    'category_id' => $item->category_id,
                    'name' => $item->category->name,
                    'color' => $item->category->color,
                    'icon' => $item->category->icon,
                    'value' => (float) $item->total,
                ];
            });

        // Daily spending trend
        $dailyTrend = Transaction::where('user_id', $userId)
            ->where('type', 'expense')
            ->whereBetween('transaction_date', [$startDate, $endDate])
            ->select(DB::raw('DATE(transaction_date) as date'), DB::raw('SUM(amount) as total'))
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(function ($item) {
                return [
                    'date' => $item->date,
                    'label' => date('M d', strtotime($item->date)),
                    'value' => (float) $item->total,
                ];
            });

        // Monthly trend (last 6 months)
        $monthlyTrend = Transaction::where('user_id', $userId)
            ->where('type', 'expense')
            ->where('transaction_date', '>=', now()->subMonths(6))
            ->select(
                DB::raw('EXTRACT(MONTH FROM transaction_date) as month'),
                DB::raw('EXTRACT(YEAR FROM transaction_date) as year'),
                DB::raw('SUM(amount) as total')
            )
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get()
            ->map(function ($item) {
                return [
                    'month' => date('M Y', mktime(0, 0, 0, $item->month, 1, $item->year)),
                    'value' => (float) $item->total,
                ];
            });

        return response()->json([
            'period' => $period,
            'category_breakdown' => $categoryBreakdown,
            'daily_trend' => $dailyTrend,
            'monthly_trend' => $monthlyTrend,
        ]);
    }
}
