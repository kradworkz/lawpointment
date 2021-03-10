<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LawyerResource extends JsonResource
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
            'email' => $this->email,
            'status' => $this->status,
            'numberofapp' => $this->accepted(),
            'firstname' => $this->profile->firstname,
            'lastname' => $this->profile->lastname,
            'gender' => $this->profile->gender,
            'birthday' => $this->profile->birthday,
            'mobile' => $this->profile->phone,
            'address' => $this->profile->address,
            'avatar' => $this->profile->avatar,
            'legalpractices' => LegalpracticeResource::collection($this->legalpracticesonly()),
            'languages' => LanguageResource::collection($this->languages),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'specialization' => new LegalpracticeResource($this->specialization()),
        ];
    }
}
