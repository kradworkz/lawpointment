<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLawyerAppointmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lawyer_appointments', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->string('type',20)->default('Picked'); //Picked || Assigned || Referred
            $table->string('status',20)->default('Pending');  //Pending || Accepted || Declined
            $table->bigInteger('lawyer_id')->unsigned()->index(); 
            $table->foreign('lawyer_id')->references('id')->on('users')->onDelete('cascade');
            $table->bigInteger('appointment_id')->unsigned()->index();
            $table->foreign('appointment_id')->references('id')->on('appointments')->onDelete('cascade');
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
        Schema::dropIfExists('lawyer_appointments');
    }
}
