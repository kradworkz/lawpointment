<?php

namespace App\Http\Controllers;

use Auth;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Note;
use App\Models\File;
use App\Models\Appointment;
use App\Models\Schedule;
use App\Models\LawyerAppointment;
use App\Models\Reason;
use Illuminate\Http\Request;
use App\Http\Resources\DefaultResource;
use App\Http\Resources\AppointmentResource;
use App\Http\Resources\LawyerResource;
use App\Http\Resources\HistoryResource;
use App\Http\Resources\LawyerAppointmentResource;
use App\Http\Requests\AppointmentRequest;
use App\Notifications\Appointment as AppMail;
use App\Notifications\newApp;
use Notification;

class LawyerController extends Controller
{
    public function status(Request $request){

        $user_id = Auth::user()->id;
        $status = $request->input('status');
        $appointment_id = $request->input('id');

        $data = Appointment::findOrFail($appointment_id);
        $previous = $data->status;
        $data->status = $status;
        $data->is_view = 1;
        
        if($data->save()){
            // $email = $data->user->email;
            // Notification::route('mail', $email)->notify(new AppMail($status));
        

            $lawyer = LawyerAppointment::where('appointment_id',$appointment_id)->where('lawyer_id',$user_id)->first();
            $previous_lawyer = $lawyer->status;
            $lawyer->status = ($status == 'Referred') ? $previous_lawyer : $status ;

            if($lawyer->save()){
                if($status == 'Accepted'){
                    
                        if($request->input('datetime') != NULL){

                            $date = ($previous == 'Pending') ? new Schedule : Schedule::findOrFail($data->schedule()->id);
                            $date->date = $request->input('datetime');
                            $date->status = 'Pending';
                            $date->appointment_id = $appointment_id;

                            if($date->save()){

                                if($previous == 'Rescheduled'){
                                    $reason = Reason::where('appointment_id',$appointment_id)->orderBy('created_at','DESC')->first();
                                    $reason->status = 'Accepted';
                                    $reason->save();

                                    $email =  $data->user->email;
                                    $text = 'Your Appointment has been rescheduled by '.Auth::user()->profile->firstname.' '.Auth::user()->profile->lastname.', here is the scheduled time '.$date->date;
                                    $status = '';
                                    Notification::route('mail', $email)->notify(new newApp($status,$text));
                                }else{
                                    $email =  $data->user->email;
                                    $text = 'Your Appointment Request has been accepted by '.Auth::user()->profile->firstname.' '.Auth::user()->profile->lastname.', here is the scheduled time '.$date->date;
                                    $status = '';
                                    Notification::route('mail', $email)->notify(new newApp($status,$text));
                                }
                            }
                        }else{
                            $reason = Reason::where('appointment_id',$appointment_id)->orderBy('created_at','DESC')->first();
                            $reason->status = 'Declined';
                            $reason->save();

                            $email =  $data->user->email;
                            $text = 'Your Request for rescheduled was declined by '.Auth::user()->profile->firstname.' '.Auth::user()->profile->lastname.'.';
                            $status = '';
                            Notification::route('mail', $email)->notify(new newApp($status,$text));
                        }

                    $l = LawyerAppointment::where('appointment_id',$appointment_id)->where('lawyer_id','!=',$user_id)->update(['status' => 'Declined']);
                    

                }else if($status == 'Cancelled'){

                    $reason = new Reason;
                    $reason->reason = $request->input('reason');
                    $reason->appointment_id = $appointment_id;
                    $reason->user_id = $user_id;
                    $reason->save();

                    if($previous != 'Pending'){
                        $data->schedule()->update([
                            'status' => $status
                        ]);
                    }
                }else if($status == 'Referred'){

                }else{
                    $data->schedule()->update([
                        'status' => $status
                    ]);
                }

                return new LawyerAppointmentResource($lawyer);
            }
        }
    }

    public function refer(Request $request)
    {
        $lawyer = $request->input('lawyer');
        $appointment = $request->input('appid');
        $law = $request->input('lawid');

        $data =  LawyerAppointment::findOrFail($law);
        $data->type = 'Referred';
        $data->save();

        $la = new LawyerAppointment;
        $la->lawyer_id = $lawyer;
        $la->appointment_id = $appointment;

        if($la->save()){

            $user = User::findOrFail($request->input('lawyer'));
            $email = $user->email;
            $text = "You have an appointment request referred by";
            $status = Auth::user()->profile->firstname.' '.Auth::user()->profile->lastname;
            Notification::route('mail', $email)->notify(new newApp($status,$text));

            $app = Appointment::findOrFail($appointment);
            $app->status = 'Pending';
            $app->save();

            $app->schedules()->delete();

            $email = $app->user->email;
            $text = " Your selected lawyer has referred you to";
            $status = $user->profile->firstname.' '.$user->profile->lastname;
            Notification::route('mail', $email)->notify(new newApp($status,$text));
        }

        return new LawyerAppointmentResource($la);

    }

    public function search(Request $request){

        $keyword = $request->input('word');

        $users =  User::where('type','Lawyer')
            ->whereHas('profile',function($query) use ($keyword) {
            return $query->where('firstname', 'LIKE', '%'.$keyword.'%')
            ->orWhere('lastname','like','%'.$keyword.'%');
        })->paginate(8);
    
        return LawyerResource::collection($users);

    }

    public function history($id){

        $data =  Appointment::where('client_id',$id)
            ->whereHas('lawyers',function($query) {
            return $query->where('lawyer_id', Auth::user()->id);
        })->get();
    
        return HistoryResource::collection($data);

    }

    public function note(Request $request){

        $data = new Note;
        $data->note = $request->input('note');
        $data->appointment_id = $request->input('id');
        $data->save();
    
        return new DefaultResource($data);

    }

    public function notes($id){
        $data =  Note::where('appointment_id',$id)->orderBy('created_at','DESC')->get();
        return DefaultResource::collection($data);
    }

    public function file(Request $request){

        $datas = $request->file('files');
       
        foreach ($datas as $data) {
            $ext = $data->getClientOriginalExtension();
            $org = $data->getClientOriginalName();
            $fileName = pathinfo($org,PATHINFO_FILENAME).'_'.$request->input('id').'_'.date('Y-m-d').'.'.$ext;
            $data->move(public_path('images/files'), $fileName);

            $data = new File;
            $data->file =$fileName;
            $data->appointment_id = $request->input('id');
            $data->save();
        }

        // $fileName = $request->file->getClientOriginalName();
        // $request->file->move(public_path('images/files'), $fileName);

        // $data = new File;
        // $data->file =$fileName;
        // $data->appointment_id = $request->input('id');
        // $data->save();
    
        return new DefaultResource($data);

    }

    public function files($id){
        $data =  File::where('appointment_id',$id)->orderBy('created_at','DESC')->get();
        return DefaultResource::collection($data);
    }


}
