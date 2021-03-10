<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppointmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->string('title',100);
            $table->longText('details');
            $table->string('status',20);
            $table->boolean('is_refer')->default(1);
            $table->boolean('is_walkin')->default(1);
            $table->boolean('is_view')->default(1);
            $table->integer('legalpractice_id')->unsigned()->index();
            $table->foreign('legalpractice_id')->references('id')->on('dropdowns')->onDelete('cascade');
            $table->bigInteger('client_id')->unsigned()->index();
            $table->foreign('client_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('appointments');
    }
}
