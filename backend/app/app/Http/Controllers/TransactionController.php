<?php

namespace App\Http\Controllers;

use App\Services\BudgetService;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller{

    public function index(Request $request) {
        $userId = $request->attributes->get('auth_user_id');
        $search = $request->query('search');
        $categoryId = $request->query('category_id');
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');
        $type = $request->query('type');

        $transactions = Transaction::where('user_id', $userId)
            ->with('category')
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('merchant', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($categoryId, function ($query, $categoryId) {
                $query->where('category_id', $categoryId);
            })
            ->when($startDate, function ($query, $startDate)  {
                $query->whereDate('transaction_date', '>=', $startDate);
            })
            ->when($endDate, function($query, $endDate) {
                $query->whereDate('transaction_date', '<=', $endDate);
            })
            ->when($type, function($query, $type) {
                $query->where('type', $type);
            })
            ->orderByDesc('transaction_date')
            ->orderByDesc('created_at')
            ->paginate(20);
        
        return response()->json($transactions);
    }

    public function store(Request $request) {
        $userId = $request->attributes->get('auth_user_id');

        $validated = $request->validate([
            'amount' => ['required', 'numeric', 'gt:0'],
            'category_id' => ['required', 'exists:categories,id'],
            'transaction_date' => ['required', 'date'],
            'type' => ['required', 'in:expense,income'],
            'merchant' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'source' => ['nullable', 'in:manual,gcash,maya,grabpay'],
        ]);

        $validated['user_id'] = $userId;
        
        if (!isset($validated['source'])) {
            $validated['source'] = 'manual';
        }

        $transaction = Transaction::create($validated);
    
        $budgetStatus = null;

        if ($transaction->type === 'expense') {
            $month = date('n', strtotime($transaction->transaction_date));
            $year = date('Y', strtotime($transaction->transaction_date));

            $budgetStatus = BudgetService::checkBudget(
                $userId,
                $transaction->category_id,
                $month,
                $year
            );
        }

        return response()->json([
            'message' => 'Transaction created successfully',
            'transaction' => $transaction->load('category'),
            'budget_status' => $budgetStatus,
        ], 201);
    }

        public function destroy(Request $request, $id) {
            $userId = $request->attributes->get('auth_user_id');
            
            $transaction = Transaction::where('id', $id)
                ->where('user_id', $userId)
                ->first();

            if (!$transaction) {
                return response()->json([
                    'message' => 'Transaction not found or access denied'
                ], 404);
            }

            $transaction->delete(); // Soft delete

            return response()->json([
                'message' => 'Transaction deleted successfully'
            ]);
        }
    }