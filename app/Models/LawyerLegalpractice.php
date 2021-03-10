<?php

namespace App\Models;

use Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LawyerLegalpractice extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $fillable = ['legalpractice_id', 'user_id', 'type'];

    public function legalpractice()
    {
        return $this->belongsTo('App\Models\Dropdown', 'legalpractice_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id', 'id');
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
