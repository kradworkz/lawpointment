<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AResource extends JsonResource
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
            'title' => $this->title,
            'details' => $this->details,
            'reason' => ($this->status == 'Cancelled') ? $this->reason()->reason : 'n/a',
            'reschedreason' => ($this->status == 'Rescheduled') ? $this->resched()->reason : 'n/a',
            'reschedcount' =>  ($this->resched() != null ) ? 0 : 1,
            'appointment_id' => $this->id,
            'lawyercount' => $this->lawyercount(),
            'appointment_walkin' => $this->is_walkin,
            'appointment_status' => $this->status,
            'client' => $this->user->profile->firstname.' '.$this->user->profile->lastname,
            'client_id' => $this->user->id,
            'avatar' => $this->user->profile->avatar,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'scheduled_at' =>($this->schedule() != NULL) ? $this->schedule()->date : 'n/a',
            'scheduled_flag' =>($this->schedule() != NULL) ? $this->schedule()->flag : 'n/a',
            'scheduled_id' =>($this->schedule() != NULL) ? $this->schedule()->id : 'n/a',
        ];
    }
}
