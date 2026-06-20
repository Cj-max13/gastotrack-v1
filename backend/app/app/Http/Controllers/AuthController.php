<?php

namespace App\Http\Controllers;

use App\Models\User;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Check if registration is enabled
        $registrationEnabled = \App\Models\SystemSetting::get('registration_enabled', 'true');
        if ($registrationEnabled !== 'true') {
            return response()->json([
                'message' => 'Registration is currently disabled'
            ], 403);
        }

        $request->validate([
            'name'=>'required|string|max:50',
            'email'=>'required|string|email|max:70|unique:users,email',
            'password'=>'required|string|min:8',
        ]);

        if(User::where('email', $request->email)->exists()) {
            return response()->json([
                'message' => 'email already exists'
            ], 409);
        }
        
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user',
        ]);
        
        return response()->json([
            'message' => 'User registered successfully',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
        ], 201);
    }


    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);  

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        // Check if account is active
        if (!$user->is_active) {
            return response()->json([
                'message' => 'Account is deactivated'
            ], 403);
        }

        $payload = [
            'sub' => $user->id,
            'role' => $user->role,
            'iat' => time(),
            'exp' => time() + 60 * 60 * 24, // 24 hours
        ];

        $token = JWT::encode($payload, env('JWT_SECRET'), 'HS256');
        
        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
        ]);
    }

    public function me(Request $request)
    {
        $userId = $request->attributes->get('auth_user_id');
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'is_active' => $user->is_active,
            ],
        ]);
    }  

}
