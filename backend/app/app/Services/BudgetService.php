<?php

namespace App\Services;

use App\Models\Budget;
use App\Models\Transaction;

class BudgetService {
    public static function checkBudget($userId, $categoryId, $month, $year) {
        $budget = Budget::where('user_id', $userId)
            ->where('category_id', $categoryId)
            ->where('month', $month)
            ->where('year', $year)
            ->first();

        $spent = Transaction::where('user_id', $userId)
            ->where('category_id', $categoryId)
            ->where('type', 'expense')
            ->whereNull('deleted_at')
            ->whereMonth('transaction_date', $month)
            ->whereYear('transaction_date', $year)
            ->sum('amount');

        $limit = $budget ? $budget->limit_amount : null;
        $isExceeded = $limit !== null && $spent > $limit;
        $overage = $isExceeded ? $spent - $limit : 0;

        return [
            'is_exceeded' => $isExceeded,
            'spent' => (float) $spent,
            'limit' => $limit !== null ? (float) $limit : null,
            'overage' => (float) $overage,
        ];
    }
}
