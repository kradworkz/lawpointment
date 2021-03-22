<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LawyerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
       $rules = [
            'firstname' => 'required|max:100',
            'lastname' => 'required|max:100',
            'birthday' => 'required',
            'address' => 'required',
            'specialization' => 'required',
            'gender' => 'required|max:100',
            'email' => 'required|string|max:150|unique:users,email,'.$this->id,
            'legalpractices' => ['nullable', 'array'],
            'languages' => ['required', 'array'],
        ];

        if ($this->attributes->has('updateimage')) {
            $rules['avatar'] = 'required|image64:jpeg,jpg';
        }else{
            $rules['avatar'] = 'nullable|image64:jpeg,jpg';
        }

        return $rules;
    }
}
