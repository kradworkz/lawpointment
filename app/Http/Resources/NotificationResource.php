<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'status' => ($this->appointment->status == 'Rescheduled') ? $this->appointment->status : $this->status,
            'title' => $this->appointment->title,
            'reschedcount' =>  ($this->appointment->resched() != null ) ? '0' : '1',
            'reschedstatus' =>  ($this->appointment->resched() != null ) ? $this->appointment->resched()->status : 'n/a',
            'specialization' => $this->appointment->legalpractice->name,
            'details' => $this->appointment->details,
            'appointment_id' => $this->appointment->id,
            'appointment_status' => $this->appointment->status,
            'client' => ($this->status == 'Pending' || $this->status == 'Cancelled') ? $this->appointment->user->profile->firstname.' '.$this->appointment->user->profile->lastname : 'Atty. '.$this->appointment->lawyer()->lawyer->profile->firstname.' '.$this->appointment->lawyer()->lawyer->profile->lastname,
            'sub' => ($this->appointment->status == 'Rescheduled') ? $this->appointment->user->profile->firstname.' '.$this->appointment->user->profile->lastname : 'n/a',
            'avatar' => $this->appointment->user->profile->avatar,
            'created_at' => $this->appointment->created_at,
            'updated_at' => $this->appointment->updated_at,
        ];
    }
}
