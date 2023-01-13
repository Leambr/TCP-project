<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('spending', function (Blueprint $table) {

            $table->id();
            $table->timestamps();
            $table->string('name');
            $table->unsignedBigInteger('amount');
            $table->unsignedBigInteger('paid_by_id');
            $table->string('paid_by');
            $table->unsignedBigInteger('group_id');
            $table->boolean('refunded')->default(false);

            $table->foreign('group_id')->references('id')->on('group');
        }); 
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('spending');
    }
};
