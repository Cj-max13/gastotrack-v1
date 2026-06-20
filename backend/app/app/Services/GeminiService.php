<?php

namespace App\Services;

use App\Models\Transaction;
use App\Models\Budget;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    public static function chat($userId, $userMessage)
    {
        try {
            $apiKey = env('GEMINI_API_KEY');
            
            if (!$apiKey) {
                return "AI service is currently unavailable. Please contact support.";
            }

            // Get user's spending summary
            $currentMonth = date('n');
            $currentYear = date('Y');

            $totalSpent = Transaction::where('user_id', $userId)
                ->where('type', 'expense')
                ->whereMonth('transaction_date', $currentMonth)
                ->whereYear('transaction_date', $currentYear)
                ->sum('amount');

            $categoryBreakdown = Transaction::where('user_id', $userId)
                ->where('type', 'expense')
                ->whereMonth('transaction_date', $currentMonth)
                ->whereYear('transaction_date', $currentYear)
                ->join('categories', 'transactions.category_id', '=', 'categories.id')
                ->select('categories.name', \Illuminate\Support\Facades\DB::raw('SUM(transactions.amount) as total'))
                ->groupBy('categories.name')
                ->get()
                ->map(function ($item) {
                    return $item->name . ': ₱' . number_format($item->total, 2);
                })
                ->join(', ');

            $budgetStatus = Budget::where('user_id', $userId)
                ->where('month', $currentMonth)
                ->where('year', $currentYear)
                ->count();

            $spendingSummary = "Total spent this month: ₱" . number_format($totalSpent, 2) . "\n";
            $spendingSummary .= "Category breakdown: " . ($categoryBreakdown ?: 'No expenses yet') . "\n";
            $spendingSummary .= "Active budgets: " . $budgetStatus;

            // Build system prompt
            $systemPrompt = "You are GastoTrack's personal finance assistant helping a Filipino user manage their expenses. ";
            $systemPrompt .= "The user's spending data this month:\n" . $spendingSummary . "\n\n";
            $systemPrompt .= "Respond in a friendly, practical tone with actionable advice. ";
            $systemPrompt .= "Answer in English or Filipino based on the user's message language. ";
            $systemPrompt .= "Keep responses concise (under 150 words).";

            // Call Gemini API
            $client = new Client();
            $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" . $apiKey;

            $response = $client->post($url, [
                'json' => [
                    'contents' => [
                        [
                            'parts' => [
                                ['text' => $systemPrompt . "\n\nUser: " . $userMessage]
                            ]
                        ]
                    ],
                    'generationConfig' => [
                        'temperature' => 0.7,
                        'maxOutputTokens' => 500,
                    ]
                ],
                'headers' => [
                    'Content-Type' => 'application/json',
                ]
            ]);

            $result = json_decode($response->getBody()->getContents(), true);

            if (isset($result['candidates'][0]['content']['parts'][0]['text'])) {
                return $result['candidates'][0]['content']['parts'][0]['text'];
            }

            return "I'm having trouble processing that right now. Could you try asking in a different way?";

        } catch (\Exception $e) {
            Log::error('Gemini API Error: ' . $e->getMessage());
            return "I'm having trouble connecting right now. Please try again in a moment.";
        }
    }
}
