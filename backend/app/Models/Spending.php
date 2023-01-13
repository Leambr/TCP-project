<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Spending extends Model
{
    use HasFactory;

    protected $table = 'spending';


    protected $fillable = [

        'name',
        'amount',
        'paid_by_id',
        'paid_by',
        'group_id'
    ];
}
