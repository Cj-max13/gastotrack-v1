<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Transaction;
use App\Models\Budget;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminUserController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');

        $users = User::when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->withCount('transactions')
            ->withSum('transactions as total_spent', 'amount')
            ->orderByDesc('created_at')
            ->paginate(20);

        return response()->json($users);
    }

    public function show($id)
    {
        $user = User::with([
                'transactions' => function ($query) {
                    $query->with('category')
                        ->orderByDesc('transaction_date')
                        ->limit(10);
                }
            ])
            ->withCount('transactions')
            ->withSum('transactions as total_spent', 'amount')
            ->findOrFail($id);

        // Get budget summary
        $budgets = Budget::where('user_id', $id)
            ->with('category')
            ->get();

        return response()->json([
            'user' => $user,
            'budgets' => $budgets,
        ]);
    }

    public function toggleActive($id)
    {
        $user = User::findOrFail($id);

        // Prevent deactivating admin accounts
        if ($user->role === 'admin') {
            return response()->json([
                'message' => 'Cannot deactivate admin accounts'
            ], 403);
        }

        $user->is_active = !$user->is_active;
        $user->save();

        return response()->json([
            'message' => 'User status updated successfully',
            'user' => $user,
        ]);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);

        // Prevent deleting admin accounts
        if ($user->role === 'admin') {
            return response()->json([
                'message' => 'Cannot delete admin accounts'
            ], 403);
        }

        // Soft delete all user transactions
        Transaction::where('user_id', $id)->delete();

        // Delete budgets
        Budget::where('user_id', $id)->delete();

        // Delete user
        $user->delete();

        return response()->json([
            'message' => 'User and all associated data deleted successfully'
        ]);
    }
}
