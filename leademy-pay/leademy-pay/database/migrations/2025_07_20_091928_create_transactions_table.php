<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransactionsTable extends Migration
{
    public function up()
    {
        Schema::create("transactions", function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->bigInteger("card_id")->unsigned();
            $table->string("gateway_transaction_id")->unique();
            $table->decimal("amount", 10, 2);
            $table->string("description");
            $table->timestamps();

            $table->foreign("card_id")->references("id")->on("cards")->onDelete("cascade");
        });
    }

    public function down()
    {
        Schema::dropIfExists("transactions");
    }
}