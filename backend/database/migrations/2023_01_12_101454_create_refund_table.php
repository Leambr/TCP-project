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
        Schema::create('refund', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('from');
            $table->string('to');
            $table->unsignedBigInteger('from_id');
            $table->unsignedBigInteger('to_id');
            $table->boolean('confirmed')->default(false);
            $table->unsignedBigInteger('amount');
            $table->unsignedBigInteger('spending_id');

            $table->foreign('spending_id')->references('id')->on('spending');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('refund');
    }
};
