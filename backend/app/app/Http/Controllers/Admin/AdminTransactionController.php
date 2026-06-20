<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;

class AdminTransactionController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $categoryId = $request->query('category_id');
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');
        $source = $request->query('source');
        $userId = $request->query('user_id');

        $transactions = Transaction::with(['user', 'category'])
            ->when($search, function ($query, $search) {
                $query->where('merchant', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })
            ->when($categoryId, function ($query, $categoryId) {
                $query->where('category_id', $categoryId);
            })
            ->when($startDate, function ($query, $startDate) {
                $query->whereDate('transaction_date', '>=', $startDate);
            })
            ->when($endDate, function ($query, $endDate) {
                $query->whereDate('transaction_date', '<=', $endDate);
            })
            ->when($source, function ($query, $source) {
                $query->where('source', $source);
            })
            ->when($userId, function ($query, $userId) {
                $query->where('user_id', $userId);
            })
            ->orderByDesc('transaction_date')
            ->orderByDesc('created_at')
            ->paginate(20);

        return response()->json($transactions);
    }

    public function destroy($id)
    {
        $transaction = Transaction::withTrashed()->findOrFail($id);
        
        // Force delete (hard delete)
        $transaction->forceDelete();

        return response()->json([
            'message' => 'Transaction permanently deleted'
        ]);
    }
}
