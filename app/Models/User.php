<?php

namespace App\Models;

use Carbon;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'password', 'type', 'status'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function profile()
    {
        return $this->hasOne('App\Models\Profile', 'user_id');
    }

    public function languages()
    {
        return $this->hasMany('App\Models\LawyerLanguage', 'user_id');
    }
    
    public function legalpractices()
    {
        return $this->hasMany('App\Models\LawyerLegalpractice', 'user_id');
    }

    public function legalpracticesonly()
    {
        return $this->hasMany('App\Models\LawyerLegalpractice', 'user_id')->where('type','!=',1)->get();
    }

    public function specialization()
    {
        return $this->hasMany('App\Models\LawyerLegalpractice', 'user_id')->where('type',1)->first();
    }

    function appointment()
    {
        return $this->hasMany('App\Models\LawyerAppointment', 'lawyer_id');
    }

    function accepted()
    {
        return $this->hasMany('App\Models\LawyerAppointment', 'lawyer_id')->whereIn('status',['Pending','Accepted'])->count();
    }

    function clientappointment()
    {
        return $this->hasMany('App\Models\Appointment', 'client_id');
    }

    function pending()
    {
        return $this->hasMany('App\Models\Appointment', 'client_id')->where('status','Pending')->count();
    }

    function cancelled()
    {
        return $this->hasMany('App\Models\Appointment', 'client_id')->where('status','Cancelled')->count();
    }

    function finished()
    {
        return $this->hasMany('App\Models\Appointment', 'client_id')->where('status','Successful')->count();
    }



    public function getUpdatedAtAttribute($value)
    {
        return Carbon\Carbon::parse($value)->format('M d, Y g:i a');
    }

    public function getCreatedAtAttribute($value)
    {
        return Carbon\Carbon::parse($value)->format('M d, Y g:i a');
    }
}
