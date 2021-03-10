<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LawyerAppointmentResource extends JsonResource
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
            'status' => $this->status,
            'title' => $this->appointment->title,
            'details' => $this->appointment->details,
            'reason' => ($this->status == 'Cancelled') ? $this->appointment->reason()->reason : 'n/a',
            'reschedreason' => ($this->appointment->status == 'Rescheduled') ? $this->appointment->resched()->reason : 'n/a',
            'reschedcount' =>  ($this->appointment->resched() != null ) ? 0 : 1,
            'appointment_id' => $this->appointment->id,
            'lawyercount' => $this->appointment->lawyercount(),
            'appointment_walkin' => $this->appointment->is_walkin,
            'appointment_status' => $this->appointment->status,
            'client' => $this->appointment->user->profile->firstname.' '.$this->appointment->user->profile->lastname,
            'client_id' => $this->appointment->user->id,
            'avatar' => $this->appointment->user->profile->avatar,
            'created_at' => $this->appointment->created_at,
            'updated_at' => $this->appointment->updated_at,
            'scheduled_at' =>($this->appointment->schedule() != NULL) ? $this->appointment->schedule()->date : 'n/a',
            'scheduled_flag' =>($this->appointment->schedule() != NULL) ? $this->appointment->schedule()->flag : 'n/a',
            'scheduled_id' =>($this->appointment->schedule() != NULL) ? $this->appointment->schedule()->id : 'n/a',
        ];
    }
}
