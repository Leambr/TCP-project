<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\GroupUser;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    public function create(Request $request, int $userId)
    {
        $groupData = $request->validate([

            'name' => ["required", "string"]
        ]);

        // Generer groupPassword
        $groupPassword = $this->checkPassword();

        // inserer dans group
        $newGroup = Group::create([

            "name" => $groupData['name'],
            "password" => $groupPassword,
            "admin_id" => $userId
        ]);

        // inserer dans group_user
        $groupUser = $this->createGroupUser($newGroup->id, $userId);

        return $newGroup;
    }

    public function generateGroupPassword()
    {
        $groupNumber = '';
        for ($i=0; $i < 6; $i++) { 
            
            $number = rand(1, 9);
            if($number ==  0 && $i == 0)
            {
                $number = rand(1, 9);
                $i -= 1;
            }
            $groupNumber .= strval($number);
        }
        
        return $groupNumber;
    }

    public function checkPassword()
    {
        $groupPassword = $this->generateGroupPassword();
        $passwordCheck = false;

        while (!$passwordCheck) {
            $password = Group::where('password', $groupPassword)->first();

            if (isset($password)) {

                $groupPassword = $this->generateGroupPassword();   
            }
            else {
                $passwordCheck = true;
            }
        }
        return $groupPassword;
    }

    public function createGroupUser(int $groupId, int $userId)
    {
        return GroupUser::create([

            "group_id" => $groupId,
            "user_id" => $userId,
        ]);
    }
}
