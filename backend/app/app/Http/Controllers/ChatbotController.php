<?php

namespace App\Http\Controllers;

use App\Services\GeminiService;
use App\Models\SystemSetting;
use Illuminate\Http\Request;

class ChatbotController extends Controller
{
    public function message(Request $request)
    {
        // Check if AI is enabled
        $aiEnabled = SystemSetting::get('ai_enabled', 'true');
        if ($aiEnabled !== 'true') {
            return response()->json([
                'message' => 'AI Assistant is currently unavailable'
            ], 503);
        }

        $userId = $request->attributes->get('auth_user_id');

        $validated = $request->validate([
            'message' => ['required', 'string', 'min:1', 'max:500'],
        ]);

        $aiResponse = GeminiService::chat($userId, $validated['message']);

        return response()->json([
            'response' => $aiResponse
        ]);
    }
}
