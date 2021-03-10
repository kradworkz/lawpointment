<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'avatar' => ['required', 'image64:jpeg,jpg'],
            'firstname' => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'gender' => ['required', 'string', 'max:6'],
            'birthday' => ['required', 'date'],
            'mobile' => ['required'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\Models\User
     */
    protected function create(array $data)
    {
        $user = User::create([
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'status' => 'Active'
        ]);

        $name = $data['firstname'].'-'.$data['lastname'].'-'.$user->id;
        $imahe = $data['avatar'];
        
        $img = explode(',', $imahe);
        $ini =substr($img[0], 11);
        $type = explode(';', $ini);
        if($type[0] == 'png'){
            $image = str_replace('data:image/png;base64,', '', $imahe);
        }else{
            $image = str_replace('data:image/jpeg;base64,', '', $imahe);
        }
        $image = str_replace(' ', '+', $image);
        $imageName1 = $name.'.'.$type[0];
        \File::put(public_path('images/avatars'). '/' . $imageName1, base64_decode($image));


        $user->profile()->create([
            'firstname' => ucwords($data['firstname']),
            'lastname' => ucwords($data['lastname']),
            'gender' =>  $data['gender'],
            'birthday' =>  $data['birthday'],
            'phone' =>  $data['mobile'],
            'avatar' => $imageName1,
        ]);

        return $user;
    }
}
