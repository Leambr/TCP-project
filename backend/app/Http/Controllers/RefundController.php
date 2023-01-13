<?php

namespace App\Http\Controllers;

use App\Models\Refund;
use App\Models\User;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\SpendingController;
use Illuminate\Http\Request;

class RefundController extends Controller
{
    public function create(int $spendingId, int $amount, int $paidById, int $groupId, string $paidBy)
    {
        $users = (new GroupController)->getAllUsers($groupId);

        $dividedAmount = $amount / count($users); 
        
        for ($i = 0; $i < count($users); $i++) { 
            
            if ($users[$i]["user_id"] != $paidById) {
                
                $userId = $users[$i]["user_id"];
                
                $user = User::where('id', $userId)->first();
                
                Refund::create([
                    
                    "from" => $user->name,
                    "from_id" => $userId,
                    "to" => $paidBy,
                    "to_id" => $paidById,
                    "amount" => $dividedAmount,
                    "spending_id" => $spendingId
                ]);  
            }    
        }
    }

    public function refundComfirmed(int $refundId)
    {

        $refund = Refund::where('id', $refundId)->first();

        Refund::where('id', $refundId)->update(['confirmed' => true]);

        $refundsNotConfirmed = Refund::where('spending_id', $refund["spending_id"])->where('confirmed', false)->get();

        if (count($refundsNotConfirmed) == 0)
        {
            (new SpendingController)->RefundSpending($refund["spending_id"]);
        }

        return $refundsNotConfirmed;
    }
}
