<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;

class AdminCategoryController extends Controller
{
    public function index()
    {
        $categories = Category::withCount('transactions')
            ->orderBy('name')
            ->get();

        return response()->json([
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100', 'unique:categories,name'],
            'icon' => ['required', 'string', 'max:50'],
            'color' => ['required', 'string', 'max:7'], // Hex color
        ]);

        $validated['is_default'] = false;

        $category = Category::create($validated);

        return response()->json([
            'message' => 'Category created successfully',
            'category' => $category
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100', 'unique:categories,name,' . $id],
            'icon' => ['required', 'string', 'max:50'],
            'color' => ['required', 'string', 'max:7'],
        ]);

        $category->update($validated);

        return response()->json([
            'message' => 'Category updated successfully',
            'category' => $category
        ]);
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        // Check if category has transactions
        $transactionCount = Transaction::where('category_id', $id)->count();

        if ($transactionCount > 0) {
            return response()->json([
                'message' => 'Cannot delete category with existing transactions',
                'transaction_count' => $transactionCount
            ], 400);
        }

        $category->delete();

        return response()->json([
            'message' => 'Category deleted successfully'
        ]);
    }
}
