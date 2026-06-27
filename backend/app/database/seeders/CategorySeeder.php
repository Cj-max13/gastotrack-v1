<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Food & Dining',
                'icon' => '🍔',
                'color' => '#FF6B6B',
                'type' => 'expense',
                'is_default' => true,
            ],
            [
                'name' => 'Transportation',
                'icon' => '🚗',
                'color' => '#4ECDC4',
                'type' => 'expense',
                'is_default' => true,
            ],
            [
                'name' => 'Shopping',
                'icon' => '🛍️',
                'color' => '#FFE66D',
                'type' => 'expense',
                'is_default' => true,
            ],
            [
                'name' => 'Bills & Utilities',
                'icon' => '💡',
                'color' => '#95E1D3',
                'type' => 'expense',
                'is_default' => true,
            ],
            [
                'name' => 'Entertainment',
                'icon' => '🎮',
                'color' => '#F38181',
                'type' => 'expense',
                'is_default' => true,
            ],
            [
                'name' => 'Healthcare',
                'icon' => '💊',
                'color' => '#AA96DA',
                'type' => 'expense',
                'is_default' => true,
            ],
            [
                'name' => 'Education',
                'icon' => '📚',
                'color' => '#FCBAD3',
                'type' => 'expense',
                'is_default' => true,
            ],
            [
                'name' => 'Load & Mobile Data',
                'icon' => '📱',
                'color' => '#A8D8EA',
                'type' => 'expense',
                'is_default' => true,
            ],
            [
                'name' => 'Salary',
                'icon' => '💰',
                'color' => '#6BCF7F',
                'type' => 'income',
                'is_default' => true,
            ],
            [
                'name' => 'Allowance',
                'icon' => '💵',
                'color' => '#8FD14F',
                'type' => 'income',
                'is_default' => true,
            ],
            [
                'name' => 'Side Hustle',
                'icon' => '💼',
                'color' => '#12CBC4',
                'type' => 'income',
                'is_default' => true,
            ],
            [
                'name' => 'Others',
                'icon' => '📦',
                'color' => '#C7CEEA',
                'type' => 'expense',
                'is_default' => true,
            ],
        ];

        $now = Carbon::now();

        foreach ($categories as &$category) {
            $category['created_at'] = $now;
            $category['updated_at'] = $now;
        }

        DB::table('categories')->insert($categories);
    }
}
