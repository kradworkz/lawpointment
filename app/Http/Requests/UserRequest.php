<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
        return [
            'firstname' => 'required|max:100',
            'lastname' => 'required|max:100',
            'birthday' => 'required',
            'gender' => 'required|max:100',
            'email' => 'required|string|max:150|unique:users,email,'.$this->id,
            'avatar' => 'required|image64:jpeg,jpg',
        ];
    }
}
