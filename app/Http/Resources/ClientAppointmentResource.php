<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ClientAppointmentResource extends JsonResource
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
            'title' => $this->title,
            'details' => $this->details,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'scheduled_at' =>($this->schedule() != NULL) ? $this->schedule()->date : 'n/a',
            'lawyer_name' => ($this->lawyer()) ? 'Atty. '.$this->lawyer()->lawyer->profile->firstname.' '.$this->lawyer()->lawyer->profile->lastname : 'N/A',
            'lawyer_avatar' =>($this->lawyer()) ?  $this->lawyer()->lawyer->profile->avatar : 'N/A',
            'lawyer_status' => ($this->lawyer()) ? $this->lawyer()->status : 'N/A',
            'lawyers' => ($this->lawyers) ? $this->lawyers : 'N/A'
        ];
    }
}
