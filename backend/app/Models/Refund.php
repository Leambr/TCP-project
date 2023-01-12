<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Refund extends Model
{
    use HasFactory;

    protected $table = 'refund';

    protected $fillable = [

        'from',
        'from_id',
        'to',
        'to_id',
        'amount',
        'spending_id'
    ];
}
