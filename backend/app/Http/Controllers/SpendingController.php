<?php

namespace App\Http\Controllers;

use App\Models\Spending;
use App\Models\User;
use App\Http\Controllers\RefundController;
use Illuminate\Http\Request;

class SpendingController extends Controller
{
    //JWT
    public function create(Request $request, int $groupId)
    {
        $spendingData = $request->validate([
            'name' => ["required", "string"],
            'amount' => ["required", "integer"],
            'paid_by_id' => ["required", "integer"],
        ]);
        
        $user = User::where('id', $spendingData["paid_by_id"])->first();
        
        $newSpending = Spending::create([
            
            "name" => $spendingData["name"],
            "amount" => $spendingData["amount"],
            "paid_by_id" => $spendingData["paid_by_id"],
            "paid_by" => $user->name,
            "group_id" => $groupId
        ]);
        
        (new RefundController)->create($newSpending["id"], $newSpending["amount"], $spendingData["paid_by_id"], $groupId, $newSpending["paid_by"]);

        return $newSpending;
    }

    public function getAllSpendings(int $groupId)
    {
        return Spending::where('group_id', $groupId)->where('refunded', false)->get();
    }

    public function RefundSpending(int $spendingId)
    {
        Spending::where('id', $spendingId)->update(['refunded' => true]);
    }
}
