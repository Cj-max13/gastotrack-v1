<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Services\BudgetService;
use Illuminate\Http\Request;

class BudgetController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->attributes->get('auth_user_id');
        $month = $request->query('month', date('n'));
        $year = $request->query('year', date('Y'));

        $budgets = Budget::where('user_id', $userId)
            ->where('month', $month)
            ->where('year', $year)
            ->with('category')
            ->get();

        // Add spent_amount to each budget
        $budgets = $budgets->map(function ($budget) use ($userId, $month, $year) {
            $budgetStatus = BudgetService::checkBudget(
                $userId,
                $budget->category_id,
                $month,
                $year
            );
            
            $budget->spent_amount = $budgetStatus['spent'];
            $budget->is_exceeded = $budgetStatus['is_exceeded'];
            $budget->overage = $budgetStatus['overage'];
            
            return $budget;
        });

        return response()->json([
            'budgets' => $budgets,
            'month' => (int) $month,
            'year' => (int) $year,
        ]);
    }

    public function store(Request $request)
    {
        $userId = $request->attributes->get('auth_user_id');

        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'limit_amount' => ['required', 'numeric', 'min:1'],
            'month' => ['required', 'integer', 'min:1', 'max:12'],
            'year' => ['required', 'integer', 'min:2020', 'max:2100'],
        ]);

        $budget = Budget::updateOrCreate(
            [
                'user_id' => $userId,
                'category_id' => $validated['category_id'],
                'month' => $validated['month'],
                'year' => $validated['year'],
            ],
            [
                'limit_amount' => $validated['limit_amount'],
            ]
        );

        // Get spent amount
        $budgetStatus = BudgetService::checkBudget(
            $userId,
            $budget->category_id,
            $budget->month,
            $budget->year
        );

        $budget->load('category');
        $budget->spent_amount = $budgetStatus['spent'];
        $budget->is_exceeded = $budgetStatus['is_exceeded'];

        return response()->json([
            'message' => 'Budget saved successfully',
            'budget' => $budget,
        ], 201);
    }
}
