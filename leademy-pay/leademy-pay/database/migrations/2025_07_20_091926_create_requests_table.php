<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRequestsTable extends Migration
{
    public function up()
    {
        Schema::create("requests", function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->bigInteger("user_id")->unsigned();
            $table->string("type");
            $table->string("status")->default("pending");
            $table->decimal("amount", 10, 2);
            $table->json("details")->nullable();
            $table->timestamps();

            $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade");
        });
    }

    public function down()
    {
        Schema::dropIfExists("requests");
    }
}