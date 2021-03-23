<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LawyerAppointment extends Model
{
    use HasFactory;

    protected $fillable = ['lawyer_id', 'appointment_id'];

    public function lawyer()
    {
        return $this->belongsTo('App\Models\User', 'lawyer_id', 'id');
    }

    public function appointment()
    {
        return $this->belongsTo('App\Models\Appointment', 'appointment_id', 'id');
    }

    // public function lawyertop(){
    //     return $this->
    // }

    public function getUpdatedAtAttribute($value)
    {
        return date('M d, Y g:i a', strtotime($value));
    }

    public function getCreatedAtAttribute($value)
    {
        return date('M d, Y g:i a', strtotime($value));
    }

}
