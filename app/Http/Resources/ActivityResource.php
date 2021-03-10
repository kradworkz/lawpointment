<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ActivityResource extends JsonResource
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
            'start' => date('Y-m-d H:i:s', strtotime($this->date)),
            'apptitle' =>  $this->title,
            'appdetails' =>  $this->content,
            'status' =>  'activity',
            'color' => 'blue',
            'editable' => ($this->date < now()) ? false : true,
        ];
    }
}
