<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'client_id', 'id');
    }

    public function legalpractice()
    {
        return $this->belongsTo('App\Models\Dropdown', 'legalpractice_id', 'id');
    }

    public function lawyer()
    {
        return $this->hasMany('App\Models\LawyerAppointment', 'appointment_id')->whereIn('status',['Pending','Accepted','Finished','Cancelled'])->orderBy('id','ASC')->first();
    }

    public function lawyers()
    {
        return $this->hasMany('App\Models\LawyerAppointment', 'appointment_id');
    }

    public function lawyercount()
    {
        return $this->hasMany('App\Models\LawyerAppointment', 'appointment_id')->count();
    }

    public function schedule()
    {
        return $this->hasMany('App\Models\Schedule', 'appointment_id')->whereIn('status',['Pending','Finished','Cancelled'])->first();
    }

    public function schedules()
    {
        return $this->hasMany('App\Models\Schedule', 'appointment_id');
    }

    public function reason()
    {
        return $this->hasOne('App\Models\Reason', 'appointment_id')->where('type','cancel')->first();
    }

    public function resched()
    {
        return $this->hasOne('App\Models\Reason', 'appointment_id')->where('type','reschedule')->orderBy('created_at','DESC')->first();
    }

    public function notes()
    {
        return $this->hasMany('App\Models\Note', 'appointment_id');
    }

    public function files()
    {
        return $this->hasMany('App\Models\File', 'appointment_id');
    }

    public function getUpdatedAtAttribute($value)
    {
        return date('M d, Y g:i a', strtotime($value));
    }

    public function getCreatedAtAttribute($value)
    {
        return date('M d, Y g:i a', strtotime($value));
    }

}
