<?php

namespace Database\Seeders;

use App\Models\SystemSetting;
use Illuminate\Database\Seeder;

class SystemSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            [
                'key' => 'app_name',
                'value' => 'GastoTrack',
                'description' => 'Application name',
            ],
            [
                'key' => 'max_budget_categories',
                'value' => '8',
                'description' => 'Maximum number of budget categories per user',
            ],
            [
                'key' => 'ai_enabled',
                'value' => 'true',
                'description' => 'Enable AI chatbot feature',
            ],
            [
                'key' => 'registration_enabled',
                'value' => 'true',
                'description' => 'Allow new user registrations',
            ],
        ];

        foreach ($settings as $setting) {
            SystemSetting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
