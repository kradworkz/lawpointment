<?php

namespace App\Http\Controllers;

use Auth;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Appointment;
use App\Models\Schedule;
use App\Models\LawyerAppointment;
use App\Models\Reason;
use Illuminate\Http\Request;
use App\Http\Resources\DefaultResource;
use App\Http\Resources\ClientAppointmentResource;
use App\Http\Resources\LawyerAppointmentResource;
use App\Http\Resources\ClientResource;
use App\Http\Requests\AppointmentRequest;
use App\Notifications\Appointment as AppMail;
use App\Notifications\newApp;
use Notification;

class ClientController extends Controller
{

    public function index()
    {
        $id = Auth::user()->id;    
        $data = Appointment::where('client_id',$id)->orderBy('id','DESC')->paginate(5);

        return ClientAppointmentResource::collection($data);
    }

    public function clients()
    {   
        $users = User::where('type','Client')->paginate(8);
        return ClientResource::collection($users);
    }

    public function status(Request $request){

        $user_id = Auth::user()->id;
        $status = $request->input('status');
        $appointment_id = $request->input('id');
        $type = $request->input('type');

        $data = Appointment::findOrFail($appointment_id);
        $previous = $data->status;
        $data->status = $status;

        if($data->save()){
            // $email = $data->user->email;
            // Notification::route('mail', $email)->notify(new AppMail($status));
            if($status == 'Rescheduled'){

                $reason = new Reason;
                $reason->reason = $request->input('reason');
                $reason->appointment_id = $appointment_id;
                $reason->user_id = $user_id;
                $reason->type = $type;
                $reason->save();

                $data = Appointment::findOrFail($appointment_id);
                $data->is_view = 1;
                $data->save();
                
            }else{
                $lawyer = LawyerAppointment::where('appointment_id',$appointment_id)->whereIn('status',['Pending','Accepted'])->first();
                $previous_lawyer = $lawyer->status;
                $lawyer->status = ($status == 'Referred') ? $previous_lawyer : $status ;

                if($lawyer->save()){
                    if($status == 'Cancelled'){

                        $reason = new Reason;
                        $reason->reason = $request->input('reason');
                        $reason->appointment_id = $appointment_id;
                        $reason->user_id = $user_id;
                        $reason->type = $type;
                        $reason->save();

                        if($previous != 'Pending'){
                            $data->schedule()->update([
                                'status' => $status
                            ]);
                        }

                        $data = Appointment::findOrFail($appointment_id);
                        $data->is_view = 1;
                        $data->save();

                        if($request->input('wew')){
                            $user = User::findOrFail($user_id);
                            $text = Auth::user()->profile->firstname.' '.Auth::user()->profile->lastname." cancelled your appointment that is scheduled at";
                            $text = Auth::user()->profile->firstname.' '.Auth::user()->profile->lastname." cancelled your appointment.";
                        }else{
                            $user = User::findOrFail($lawyer->lawyer_id);
                            $text = Auth::user()->profile->firstname.' '.Auth::user()->profile->lastname." cancelled his appointment that is scheduled at";
                            $text2 = Auth::user()->profile->firstname.' '.Auth::user()->profile->lastname." cancelled his appointment.";
                        }

                        $email = $user->email;
                        $status = ($previous != 'Pending') ? $data->schedule()->date : '';
                        $text = ($previous != 'Pending') ? $text : $text2;
                        Notification::route('mail', $email)->notify(new newApp($status,$text));
                    }

                    return new LawyerAppointmentResource($lawyer);
                }
            }

        }
        
    }

    public function store(Request $request){

        $user = $request->isMethod('put') ? User::findOrFail($request->input('id')) : new User;
        $user->email = strtolower($request->input('email'));
        $user->type = 'Client';
        $user->is_walkin = 1;
        $user->password = bcrypt(123456789);

        if($user->save()){
            
            if($request->isMethod('put')){
                $user->profile()->update([
                    'firstname' => ucwords(strtolower($request->input('firstname'))),
                    'lastname' => ucwords(strtolower($request->input('lastname'))),
                    'gender' => $request->input('gender'),
                    'birthday' => $request->input('birthday'),
                    'phone' => $request->input('mobile'),
                    'address' => $request->input('address')
                ]);
            }else{
                $user->profile()->create([
                    'firstname' => ucwords(strtolower($request->input('firstname'))),
                    'lastname' => ucwords(strtolower($request->input('lastname'))),
                    'gender' => $request->input('gender'),
                    'birthday' => $request->input('birthday'),
                    'phone' => $request->input('mobile'),
                    'address' => $request->input('address')
                ]);
            }
        }

        return new ClientResource($user);
    }

    public function search(Request $request){

        $keyword = $request->input('word');

        $users =  User::where('type','Client')
            ->whereHas('profile',function($query) use ($keyword) {
            return $query->where('firstname', 'LIKE', '%'.$keyword.'%')
            ->orWhere('lastname','like','%'.$keyword.'%');
        })->paginate(8);
    
        return ClientResource::collection($users);

    }

    public function getapp($id)
    { 
        $userid = Auth::user()->id;    
        $data = Appointment::where('id',$id)->where('client_id',$userid)->orderBy('id','DESC')->first();

        return new ClientAppointmentResource($data);
    }

}
