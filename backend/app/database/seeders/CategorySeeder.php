<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                'name' => 'Food',
                'icon' => 'utensils',
                'color' => '#F97316',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Transport',
                'icon' => 'car',
                'color' => '#3B82F6',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Shopping',
                'icon' => 'shopping-bag',
                'color' => '#EC4899',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bills',
                'icon' => 'receipt',
                'color' => '#EAB308',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Entertainment',
                'icon' => 'film',
                'color' => '#8B5CF6',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Health',
                'icon' => 'heart-pulse',
                'color' => '#EF4444',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Education',
                'icon' => 'graduation-cap',
                'color' => '#10B981',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Others',
                'icon' => 'circle-ellipsis',
                'color' => '#6B7280',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}