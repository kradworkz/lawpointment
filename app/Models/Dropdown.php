<?php

namespace App\Models;

use Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dropdown extends Model
{
    use HasFactory;

    public function legalpractice()
    {
        return $this->hasMany('App\Models\Appointment', 'legalpractice_id');
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
