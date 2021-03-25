<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TopResource extends JsonResource
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
            'count' => $this->count,
            'accepted' => $this->lawyer->acceptedreport(),
            'lawyer' => $this->lawyer->profile->firstname.' '.$this->lawyer->profile->lastname
        ];
    }
}
