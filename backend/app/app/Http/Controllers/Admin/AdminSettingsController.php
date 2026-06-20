<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SystemSetting;
use Illuminate\Http\Request;

class AdminSettingsController extends Controller
{
    public function index()
    {
        $settings = SystemSetting::all()->pluck('value', 'key');

        return response()->json([
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'app_name' => ['sometimes', 'string', 'max:100'],
            'registration_enabled' => ['sometimes', 'in:true,false'],
            'ai_enabled' => ['sometimes', 'in:true,false'],
            'max_budget_categories' => ['sometimes', 'integer', 'min:1', 'max:20'],
        ]);

        foreach ($validated as $key => $value) {
            SystemSetting::where('key', $key)->update(['value' => $value]);
        }

        return response()->json([
            'message' => 'Settings updated successfully',
            'settings' => $validated
        ]);
    }
}
