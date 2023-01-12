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

    public function join(Request $request)
    {
        $joinData = $request->validate([

            'id' => ["required", "string"],
            'password' => ["required", "string"]
        ]);
        $group = Group::where('password', $joinData['password'])->first();

        if(!isset($group))
        {
            return "Pas de groupe";
        }

        $userInGroup = GroupUser::where('user_id', $joinData["id"])->where('group_id', $group["id"])->first();

        if($userInGroup)
        {
            return "Déja rejoins";
        }

        $groupUser = $this->createGroupUser($group["id"], $joinData["id"]);

        return $groupUser;
    }

    public function createGroupUser(int $groupId, int $userId)
    {
        return GroupUser::create([

            "group_id" => $groupId,
            "user_id" => $userId,
        ]);
    }

    public function getAllGroups(int $userId)
    {
        $allGroupsId = GroupUser::select('group_id')->where('user_id', $userId)->get();
        $formatAllGroupsId = [];
        foreach ($allGroupsId as $key => $value) {
            $formatAllGroupsId[]= $value["group_id"];
        }
        return Group::whereIn('id', $formatAllGroupsId)->get();
    }

    public function getAllUsers(int $groupId)
    {
        return GroupUser::select('user_id')->where('group_id', $groupId)->get();
    }

    // Utils

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
}
