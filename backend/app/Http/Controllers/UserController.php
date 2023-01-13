<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    // JWT
    public function signIn(Request $request)
    {
        $userData = $request->validate([
            "name" => ["required", "string"],
            "email" => ["required", "email", "unique:user,email"],
            "password" => ["required", "string"],
        ]);

        $newUser = User::create([
            "name" => $userData["name"],
            "email" => $userData["email"],
            "password" => bcrypt($userData["password"]),
        ]);

        return response($newUser, 201);
    }

    //JWT
    public function logIn(Request $request)
    {
        $userData = $request->validate([
            "email" => ["required", "email"],
            "password" => ["required", "string"],
        ]); 

        $user = User::where('email', $userData["email"])->first();

        if (!isset($user)) {
            
            return response(["message" => "Le mail n'existe pas"], 401);
        }

        if (!Hash::check($userData["password"], $user->password)) {

            return response(["message" => "Le mot de passe ne correspond pas"], 401);
        }
        
        return $user;
    }
}
