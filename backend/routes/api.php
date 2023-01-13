<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\SpendingController;
use App\Http\Controllers\RefundController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// User
Route::post("/user/signIn", [UserController::class, "signIn"]);
Route::post("/user/logIn", [UserController::class, "logIn"]);
Route::post("/user/{id}/group", [GroupController::class, "create"]);
Route::get("/user/{id}/groups", [GroupController::class, "getAllGroups"]);
Route::post("user/group", [GroupController::class, "join"]);

// Group 
Route::post("/group/{id}/spending", [SpendingController::class, "create"]);
Route::get("/group/{id}/spendings", [SpendingController::class, "getAllSpendings"]);

// Spending
Route::patch("/spending/refund/{id}", [RefundController::class, "refundComfirmed"]);






Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
