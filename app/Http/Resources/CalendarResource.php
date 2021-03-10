<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CalendarResource extends JsonResource
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
            'id' => $this->appointment->schedule()->id,
            'title' => $this->appointment->user->profile->firstname.' '.$this->appointment->user->profile->lastname,
            'start' => date('Y-m-d H:i:s', strtotime($this->appointment->schedule()->date)),
            'apptitle' =>  $this->appointment->title,
            'appdetails' =>  $this->appointment->details,
            'status' =>  $this->appointment->status,
            'color' => ($this->appointment->status == 'Finished') ? 'green' : 'orange',
            'editable' => ($this->appointment->status == 'Finished') ? false : true,
        ];
    }
}
