<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserStoreRequest;
use App\Models\User;
use Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function store(Request $request)
    {
        try {
            $data = Validator::make($request->all(), $request->rules());

            if ($data->fails()) {
                return response()->json(['errors' => $data->messages()]);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([
                'message' => 'Usuario creado!',
                'access_token' => $token,
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al crear el usuario.'], 500);
        }
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Usuario o contraseña incorrectos'], 401);
        }
        $user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
        ]);
    }

    public function logout()
    {
        try {
            // auth()->user()->tokens()->delete();
            return response()->json(['logout' => true]);
        } catch (\Exception $e) {
            return response()->json(['logout' => false], 500);
        }
    }
}
