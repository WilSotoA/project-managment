<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function store(Request $request)
    {
        $data = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:4',
        ]);

        if ($data->fails()) {
            return response()->json(['errors' => $data->messages()], '400');
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => 2
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'role' => $user->role_id,
            'message' => 'Usuario creado!',
            'access_token' => $token,
        ]);
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Usuario o contraseña incorrectos'], 401);
        }
        $user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'role' => $user->role_id,
            'access_token' => $token,
        ]);
    }

    public function logout()
    {
        try {
            auth()->user()->currentAccessToken()->delete();
            return response()->json(['logout' => true]);
        } catch (\Exception $e) {
            return response()->json(['logout' => false], 500);
        }
    }
}
