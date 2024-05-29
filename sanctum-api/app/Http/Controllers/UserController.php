<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function users()
    {
        $users = User::all();

        return response([$users], 201);
    }

    public function showUser(Request $request, $id)
    {
        return response(["Show User"], 201);
    }

    public function registerUser(Request $request)
    {
        return response(["Register User"], 201);
    }

    public function editUser(Request $request, $id)
    {
        return response(["Edit User"], 201);
    }

    public function removeUser(Request $request, $id)
    {
        return response(["Remove User"], 201);
    }
}
