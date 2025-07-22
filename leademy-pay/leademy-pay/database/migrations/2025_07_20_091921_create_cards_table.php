<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCardsTable extends Migration
{
    public function up()
    {
        Schema::create("cards", function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->bigInteger("user_id")->unsigned();
            $table->string("last_four_digits", 4);
            $table->string("card_token");
            $table->date("expiry_date");
            $table->decimal("balance", 10, 2);
            $table->string("status")->default("active");
            $table->timestamps();

            $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade");
        });
    }

    public function down()
    {
        Schema::dropIfExists("cards");
    }
}