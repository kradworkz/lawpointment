<?php

namespace App\Http\Controllers;

use Auth;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Profile;
use App\Models\Appointment;
use App\Models\Schedule;
use App\Models\LawyerAppointment;
use Illuminate\Http\Request;
use App\Http\Resources\AResource;
use App\Http\Resources\DefaultResource;
use App\Http\Resources\AppointmentResource;
use App\Http\Resources\LawyerAppointmentResource;
use App\Http\Requests\AppointmentRequest;
use App\Notifications\Appointment as AppMail;
use App\Notifications\newApp;
use Notification;

class AppointmentController extends Controller
{
    
    public function appointments($type)
    { 
        if($type == 'with'){
            $data = Appointment::where('legalpractice_id', '!=',1)->orderBy('id','DESC')->paginate(5);
        }else if($type == 'without'){
            $data = Appointment::where('legalpractice_id',1)->orderBy('id','DESC')->paginate(5);
        }else{
            $data = Appointment::where('is_walkin',0)->orderBy('id','DESC')->paginate(5);
        }

        return AppointmentResource::collection($data);
    }

    public function search(Request $request){

        $keyword = $request->input('word');
        $type = $request->input('type');
        $status = $request->input('status');
        $to = ($request->input('to') == '') ? '' : Carbon::parse($request->input('to'))->startOfDay(); 
        $from =($request->input('from') == '') ? '' : Carbon::parse($request->input('from'))->startOfDay();

        $ids = Profile::where(\DB::raw('concat(firstname," ",lastname)'),'LIKE', '%'.$keyword.'%')->pluck('user_id');


        if($type == 'with'){
            if($status == 'All'){
                $data = Appointment::whereIn('client_id',$ids)->where('legalpractice_id', '!=',1)->orderBy('id','DESC')->pluck('id');
            }else{
                $data = Appointment::whereIn('client_id',$ids)->where('status',$status)->where('legalpractice_id', '!=',1)->orderBy('id','DESC')->pluck('id');
            }
        }else if($type == 'without'){
            if($status == 'All'){
                $data = Appointment::whereIn('client_id',$ids)->where('legalpractice_id',1)->orderBy('id','DESC')->pluck('id');
            }else{
                $data = Appointment::whereIn('client_id',$ids)->where('status',$status)->where('legalpractice_id',1)->orderBy('id','DESC')->pluck('id');
            }
        }else{
            if($status == 'All'){
                $data = Appointment::whereIn('client_id',$ids)->where('is_walkin',0)->orderBy('id','DESC')->pluck('id');
            }else{
                $data = Appointment::whereIn('client_id',$ids)->where('status',$status)->where('is_walkin',0)->orderBy('id','DESC')->pluck('id');
            }
        }

        if($from != '' && $to != ''){
            $apps = Appointment::whereIn('id',$data)->whereBetween('created_at',[$from.' 00:00:00',$to.' 23:59:59'])->paginate(5);
        }else{
            $apps = Appointment::whereIn('id',$data)->paginate(5);
        }
        
        return AppointmentResource::collection($apps);
    }

    public function store(AppointmentRequest $request){

        $data = $request->isMethod('put') ? Appointment::findOrFail($request->input('id')) : new Appointment;
        $data->title = ucwords($request->input('title'));
        $data->details = ucfirst($request->input('details'));
        $data->legalpractice_id = $request->input('legalpractice');
        $data->client_id = Auth::user()->id;
        $data->status = 'Pending';
        
        if($data->save()){
            if($request->input('legalpractice') != 1){
                $data->lawyers()->create([
                    'lawyer_id' => $request->input('lawyer')
                ]);
                $user = User::findOrFail($request->input('lawyer'));
                $email = $user->email;
                $text = "You have a new Appointment Request from";
                $status = Auth::user()->profile->firstname.' '.Auth::user()->profile->lastname;
                Notification::route('mail', $email)->notify(new newApp($status,$text));
            }
        }

        return new AppointmentResource($data);
    }

    public function storewalkin(Request $request){

        $data = $request->isMethod('put') ? Appointment::findOrFail($request->input('id')) : new Appointment;
        $data->title = ucwords($request->input('title'));
        $data->details = ucfirst($request->input('details'));
        $data->status = 'Pending';
        $data->legalpractice_id = $request->input('legalpractice');
        $data->client_id = $request->input('client');
        $data->is_walkin = 0;
        
        if($data->save()){
            $data->lawyers()->create([
                'lawyer_id' => $request->input('lawyer')
            ]);
        }

        return new AppointmentResource($data);
    }

    
    public function setatty(Request $request){

        $data = Appointment::findOrFail($request->input('id'));
        $data->status = 'Pending';
        $data->legalpractice_id = $request->input('legalpractice');
        
        if($data->save()){
            $data->lawyers()->create([
                'lawyer_id' => $request->input('lawyer')
            ]);
        }

        return new AppointmentResource($data);
    }

    public function status(Request $request){

        $status = $request->input('status');
        $appointment_id = $request->input('id');
        $user_id = Auth::user()->id;

        $data = Appointment::findOrFail($appointment_id);
        $previous = $data->status;
        $data->status = ($status == 'Resched') ? $previous : $status;
        
        if($data->save()){

            $email = $data->user->email;
            Notification::route('mail', $email)->notify(new AppMail($status));

            if($status != 'Cancelled' && $status != 'Finished'){

                $lawyer = LawyerAppointment::where('appointment_id',$appointment_id)->where('lawyer_id',$user_id)->first();
                $lawyer->status = 'Accepted';
                
                if($lawyer->save()){
                    if($request->input('datetime') != NULL){
                        $date = ($previous == 'Pending') ? new Schedule : Schedule::findOrFail($data->schedule()->id);
                        $date->date = $request->input('datetime');
                        $date->status = 'Pending';
                        $date->appointment_id = $appointment_id;
                        $date->save();
                    }
                }
                return new LawyerAppointmentResource($lawyer);
            }else{
                if($status == 'Cancelled'){

                    if($previous != 'Pending'){
                        $data->schedule()->update([
                            'status' => $status
                        ]);
                    }

                    $la = LawyerAppointment::where('appointment_id',$appointment_id)->first();
                    $la->status = 'Cancelled';
                    $la->save();

                }else if($status == 'Finished'){
                    $data->schedule()->update([
                        'status' => $status
                    ]);
                }else{

                }

                return true;
            }
        }
        
        
    }

    public function restatus(Request $request){

        $status = $request->input('status');
        $appointment_id = $request->input('id');
     

        $data = Appointment::findOrFail($appointment_id);
        $previous = $data->status;
        $data->status = ($status == 'Resched') ? $previous : $status;
        $user_id =  $data->lawyer()->lawyer_id;

        if($data->save()){

            // $email = $data->user->email;
            // Notification::route('mail', $email)->notify(new AppMail($status));

            if($status != 'Cancelled' && $status != 'Finished'){

                $lawyer = LawyerAppointment::where('appointment_id',$appointment_id)->where('lawyer_id',$user_id)->first();

                $data->schedule()->update([
                    'status' =>'Cancelled'
                ]);

                $date = new Schedule;
                $date->date = $request->input('datetime');
                $date->status = 'Pending';
                $date->flag = 'Resched';
                $date->appointment_id = $appointment_id;
                $date->save();
                
                return new LawyerAppointmentResource($lawyer);
            }else{
                if($status == 'Cancelled'){
                    $data->schedule()->update([
                        'status' => $status
                    ]);

                    $la = LawyerAppointment::where('appointment_id',$appointment_id)->first();
                    $la->status = 'Cancelled';
                    $la->save();

                }else if($status == 'Finished'){
                    $data->schedule()->update([
                        'status' => $status
                    ]);
                }else{

                }

                return true;
            }
        }
        
        
    }

    public function resched(Request $request){

        $id = $request->input('id');

        $date =  Schedule::findOrFail($id);
        $date->status = 'Pending';
        $date->flag = 'fixed';
        $date->save();
            
        return new LawyerAppointmentResource($date);
          
    }

    // public function declined(Request $request){

    //     $id = $request->input('id');

    //     $date =  Schedule::findOrFail($id);
    //     $appointment_id = $date->appointment_id;
    //     $date->delete();

    //     $old =  Schedule::where('status','Cancelled')->where('appointment_id',$appointment_id)->orderBy('created_at','DESC')->first();
    //     $old->status = 'Pending';
    //     $old->save();

    //     return new LawyerAppointmentResource($date); 
     
    // }

    public function lawyerappointments()
    { 
        $user_id = Auth::user()->id;
        $data = LawyerAppointment::where('lawyer_id',$user_id)->where('type','!=','Referred')->orderBy('id','DESC')->paginate(5);

        return LawyerAppointmentResource::collection($data);
    }


    public function getapp($id)
    { 
        $user_id = Auth::user()->id;

        $data =  LawyerAppointment::where('lawyer_id',$user_id)->where('status','!=','Declined')->orderBy('id','DESC')
        ->whereHas('appointment',function($query) use ($id) {
            return $query->where('id', $id);
        })
        ->first();
        return new LawyerAppointmentResource($data);
    }

    public function lawyersearch(Request $request){

        $keyword = $request->input('word');
        $status = ($request->input('status') == 'All') ? 'All' : $request->input('status');
        $to = ($request->input('to') == '') ? '' : $request->input('to'); 
        $from =($request->input('from') == '') ? '' : $request->input('from');
        
        $user_id = Auth::user()->id;

        // $data = LawyerAppointment::where('lawyer_id',$user_id)->orderBy('id','DESC')->paginate(5);
        // $data = Appointment::where('client_id',$user_id)->where('title', 'LIKE', '%'.$keyword.'%')->where('status',$status)->paginate(5);
        $ids = Profile::where(\DB::raw('concat(firstname," ",lastname)'),'LIKE', '%'.$keyword.'%')->pluck('user_id');

        $data =  LawyerAppointment::where('lawyer_id',$user_id)->orderBy('id','DESC')
        ->whereHas('appointment',function($query) use ($ids) {
            return $query->whereIn('client_id',$ids);
        })
        ->pluck('appointment_id');

        if($from != '' && $to != ''){

            $query = Appointment::query();
            ($status == 'All') ? '' : $query->where('status', $status);
            $apps = $query->whereBetween('created_at',[$from.' 00:00:00',$to.' 23:59:59'])->paginate(8);

        }else{
            $query = Appointment::query();
            ($status == 'All') ? '' : $query->where('status', $status);
            $apps = $query->whereIn('id',$data)->paginate(8);
        }
        return AResource::collection($apps);
    }

    public function checkslot(Request $request){
        
        // $userId = Auth::id();
        // $user = Booking::where('start','=',$d8)->where('status','Pending')->get();
        //         $count = count($user);
        $user_id = Auth::user()->id;
        $datenow = Carbon::now()->format( 'Y-m-d' );
        $result = '';
        $date = $request->input('chosendate');
        
        $range=range(strtotime("08:00"),strtotime("17:00"),60*60);
        $range2=range(strtotime("09:00"),strtotime("18:00"),60*60);

        $ids = LawyerAppointment::where('status','!=','Declined')->where('lawyer_id',$user_id)->pluck('appointment_id');

           foreach(array_combine($range, $range2) as $time => $time2){
                $d8 = $date.' '.date("H:i:s",$time);
                $book = Schedule::where('date','=',$d8)->where('date','>=',$datenow)->whereIn('status', ['Pending','Accepted','Finished'])
                ->whereIn('appointment_id', $ids)
                ->get();
                $count = count($book);
                if($count == 0){
                    $status = 'Available';
                    $s = '';
                }else{
                    $status = 'Not Available';
                    $s= 'disabled';
                }
                
                $data[] = array(
                    "time" => date("h:i A",$time),
                    "value" => $d8,
                    "status" => $status
                );
                
                // $result .= '<label class="col-xs-10"> <span class="col-xs-7"><input type="radio" v-model="start" name="start" value="'.$d8.'" '.$s.'> <span> '.date("h:i",$time).'</span></span>'.$status.'</label>';
           }

        return response()->json($data);
    }
}
