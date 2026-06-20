<?php

namespace App\Http\Middleware;

use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class JwtMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $header = $request->header('Authorization');
        if (!$header || !str_starts_with($header, 'Bearer ')) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $token = substr($header, 7);
        try {
            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));

            if (!isset($decoded->sub)) {
                return response()->json(['message' => 'Invalid token'], 401);
            }

            $request->attributes->set('auth_user_id', $decoded->sub);
            
            // Also set role if present in token
            if (isset($decoded->role)) {
                $request->attributes->set('auth_user_role', $decoded->role);
            }

            return $next($request);
        } catch (\Throwable $e) {
             return response()->json(['message' => 'Invalid or expired token'], 401);
        }
    }
}