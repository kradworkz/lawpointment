<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\User;
use App\Models\Appointment;
use App\Models\LawyerLegalpractice;
use Illuminate\Http\Request;
use App\Http\Requests\LawyerRequest;
use App\Http\Resources\LawyerResource;
use Hash;

class UserController extends Controller
{
    public function index($type)
    {   
        $users = User::where('type',$type)->where('status','Active')->paginate(5);
        return LawyerResource::collection($users);
    }

    public function law()
    {   
        $users = User::where('type','Lawyer')->paginate(5);
        return LawyerResource::collection($users);
    }

    public function clients()
    {   
        $users = User::where('type','Client')->where('is_walkin',1)->where('status','Active')->get();
        return LawyerResource::collection($users);
    }

    public function list($type)
    {   
        $id =  Auth::user()->id;
        $users = User::where('status','Active')->where('id','!=',$id)->where('type',$type)->get();
        return LawyerResource::collection($users);
    }


    public function solo($id)
    {   
        $users = User::find($id);
        return new LawyerResource($users);
    }

    public function store(LawyerRequest $request){

        $user = $request->isMethod('put') ? User::findOrFail($request->input('id')) : new User;
        $user->email = strtolower($request->input('email'));
        $user->type = 'Lawyer';
        $user->password = bcrypt(123456789);

        if($user->save()){
            
            if($request->input('updateimage')){
                $name = strtolower($request->input('lastname')).'-'.$user->id;
                $data = $request->input('avatar');
                $img = explode(',', $data);
                $ini =substr($img[0], 11);
                $type = explode(';', $ini);
                if($type[0] == 'png'){
                    $image = str_replace('data:image/png;base64,', '', $data);
                }else{
                    $image = str_replace('data:image/jpeg;base64,', '', $data);
                }
                $image = str_replace(' ', '+', $image);
                $imageName = $name.'.'.$type[0];
                \File::put(public_path('images/avatars'). '/' . $imageName, base64_decode($image));
            }else{
                $imageName = ($request->isMethod('put')) ? $user->profile->avatar : 'avatar.jpg';
            }

            if($request->isMethod('put')){
                $user->profile()->update([
                    'firstname' => ucwords(strtolower($request->input('firstname'))),
                    'lastname' => ucwords(strtolower($request->input('lastname'))),
                    'gender' => $request->input('gender'),
                    'birthday' => $request->input('birthday'),
                    'phone' => $request->input('mobile'),
                    'address' => $request->input('address'),
                    'avatar' => $imageName
                ]);
            }else{
                $user->profile()->create([
                    'firstname' => ucwords(strtolower($request->input('firstname'))),
                    'lastname' => ucwords(strtolower($request->input('lastname'))),
                    'gender' => $request->input('gender'),
                    'birthday' => $request->input('birthday'),
                    'phone' => $request->input('mobile'),
                    'address' => $request->input('address'),
                    'avatar' => $imageName
                ]);
            }

           

            $user->legalpractices()->create([
                'legalpractice_id' => $request->input('specialization')
            ]);

            if(!empty($request->input('legalpractices'))){
                $ids = array();
                $ids[] = $request->input('specialization');
                $legalpractices = $request->input('legalpractices');
                foreach ($legalpractices as $legalpractice) {
                    if(!$user->legalpractices->contains('legalpractice_id', $legalpractice['id'])){
                        $user->legalpractices()->create([
                            'legalpractice_id' => $legalpractice['id'],
                            'type' => 0
                        ]);
                    }
                    $ids[] = $legalpractice['id'];
                }
                $user->legalpractices()->whereNotIn('legalpractice_id', $ids)->delete();
            }

            if(!empty($request->input('languages'))){
                $ids = [];
                $languages = $request->input('languages');
                foreach ($languages as $language) {
                    if(!$user->languages->contains('language_id', $language['id'])){
                        $user->languages()->create([
                            'language_id' => $language['id']
                        ]);
                    }
                    $ids[] = $language['id'];
                }
                $user->languages()->whereNotIn('language_id', $ids)->delete();
            }
        }

        return new LawyerResource($user);

    }

    

    public function search(Request $request){

        $keyword = $request->input('word');
        $type = $request->input('type');

        $ids = LawyerLegalpractice::where('legalpractice_id',$type)->orderBy('type','DESC')->pluck('user_id')->toArray();
        $ids_ordered = implode(',', $ids);


        $users =  User::whereIn('id',$ids)->where('status','Active')->with('profile')->whereHas('profile',function($query) use ($keyword) {
            return $query->where('firstname', 'LIKE', '%'.$keyword.'%')
            ->orWhere('lastname','like','%'.$keyword.'%');
        })
        ->orderByRaw("FIELD(id, $ids_ordered)")->paginate(5);
        

        // $users1 =  User::where('type','Lawyer')->with('profile')->whereHas('profile',function($query) use ($keyword) {
        //     return $query->where('firstname', 'LIKE', '%'.$keyword.'%')
        //     ->orWhere('lastname','like','%'.$keyword.'%');
        // })->with('legalpractices')->whereHas('legalpractices',function($query) use ($type) {
        //     return $query->where('legalpractice_id',$type)->where('type',1);
        // })->pluck('id');

        // $users2 =  User::where('type','Lawyer')->with('profile')->whereHas('profile',function($query) use ($keyword) {
        //     return $query->where('firstname', 'LIKE', '%'.$keyword.'%')
        //     ->orWhere('lastname','like','%'.$keyword.'%');
        // })->with('legalpractices')->whereHas('legalpractices',function($query) use ($type) {
        //     return $query->where('legalpractice_id',$type)->where('type',0);
        // })->pluck('id');

        // return $users3 = array_merge((array) $users1,(array) $users2);

        // $users =  User::whereIn('id',$users3)->with('profile')->whereHas('profile',function($query) use ($keyword) {
        //     return $query->where('firstname', 'LIKE', '%'.$keyword.'%')
        //     ->orWhere('lastname','like','%'.$keyword.'%');
        // })->paginate(8);

        return LawyerResource::collection($users);

    }

    public function status(Request $request){

        $user = User::findOrFail($request->input('id'));
        $user->status = $request->input('type');
        $user->save();

        return new LawyerResource($user);

    }

    public function password(Request $request){

        if (!(Hash::check($request->get('current_password'), Auth::user()->password))) {
            return response()->json(['error' => 'Your current password does not matches with the password you provided. Please try again.'], 401);
        }

        if(strcmp($request->get('current_password'), $request->get('password')) == 0){
            return response()->json(['error' => 'New Password cannot be same as your current password. Please choose a different password'], 401);
        }

        $validatedData = $request->validate([
            'current_password' => 'required',
            'password' => 'required|string|min:9|confirmed',
        ]);

        User::find(auth()->user()->id)->update(['password'=> Hash::make($request->input('password'))]);

        if(Auth::user()->status == 'Inactive'){
            User::find(auth()->user()->id)->update(['status'=> 'Active']);
            return response()->json(['success' => 'First Attempt'], 200);
        }else{
            return response()->json(['success' => 'Password changed successfully !'], 200);
        }

    }

    public function count()
    {
        $user = Auth::user()->id;
        $count = Appointment::where('client_id',$user)->whereIn('status',['Pending','Accepted','Rescheduled'])->count();
        return $count;
    }

    public function availability(Request $request){

        $status = $request->input('status');
        
        if($status){
            User::find(auth()->user()->id)->update(['status'=> 'Active']);
        }else{
            User::find(auth()->user()->id)->update(['status'=> 'Inactive']);
        }

        return true;

    }
}
