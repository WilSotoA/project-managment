<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserStoreRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\QueryException;

class AuthController extends Controller
{
    public function store(UserStoreRequest $request)
    {
        try {
            $data = $request->validated();

            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => bcrypt($data['password'])
            ]);
            return response()->json(['message' => 'Usuario creado exitosamente!']);
        } catch (\Exception $e) {
            $errorCode = $e->getCode();
            if ($errorCode === '23000') {
                return response()->json(['message' => 'El correo electrónico ya está en uso.'], 400);
            }
            return response()->json(['error' => $errorCode, 'message' => 'Error al crear el usuario.'], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);

            if (Auth::attempt($credentials)) {
                return response()->json(['login' => true]);
            }
            return response()->json(['login' => false, 'message' => 'Usuario o contraseña incorrectos'], 401);
        } catch (\Exception $e) {
            $errorCode = $e->getCode();
            if ($errorCode === '23000') {
                return response()->json(['message' => 'El correo electrónico ya está en uso.'], 400);
            }
            return response()->json(['error' => $errorCode, 'message' => 'Error al iniciar sesión'], 500);
        }
    }
}
