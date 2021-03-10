<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\Appointment;
use App\Models\LawyerAppointment;
use Illuminate\Http\Request;
use App\Http\Resources\NotificationResource;
use App\Http\Resources\NotificationsResource;

class NotificationController extends Controller
{
    public function index(){

        $user_id = Auth::user()->id;
        // $data = Appointment::where('status','pending')->where('is_view',1)->get();

        $data =  LawyerAppointment::where('lawyer_id',$user_id)->where('type','Picked')
        ->whereHas('appointment',function($query) {
            return $query->whereIn('status',['Cancelled','Pending','Rescheduled'])
            ->where('is_view',1);
        })
        ->orderBy('id','DESC')->get();

        return NotificationResource::collection($data);
    }

    public function status(Request $request){

        $user_id = Auth::user()->id;

        $data = Appointment::findOrFail($request->input('id'));
        $data->is_view = 0;
        $data->save();

        return true;
    }

    public function clients(){

        $user_id = Auth::user()->id;
        // $data = Appointment::where('status','pending')->where('is_view',1)->get();

        $data =  LawyerAppointment::whereHas('appointment',function($query) use ($user_id) {
            return $query->where('status','Accepted')->where('client_id',$user_id)
            ->where('is_view',1);
        })
        ->orderBy('id','DESC')->get();

        return NotificationResource::collection($data);
    }

    public function secretary(){

        $user_id = Auth::user()->id;
        $data = Appointment::where('legalpractice_id',1)->where('status','pending')->where('is_view',1)->get();

        // $data =  LawyerAppointment::whereHas('appointment',function($query) {
        //     return $query->where('legalpractice_id',1)->where('status','Pending')
        //     ->where('is_view',1);
        // })
        // ->orderBy('id','DESC')->get();

        return NotificationsResource::collection($data);
    }
}
