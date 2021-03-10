<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\Schedule;
use App\Models\Activity;
use App\Models\LawyerAppointment;
use Illuminate\Http\Request;
use App\Http\Resources\DefaultResource;
use App\Http\Resources\CalendarResource;
use App\Http\Resources\ActivityResource;

class CalendarController extends Controller
{
    public function index(){
        $id = Auth::user()->id;    
        $data = LawyerAppointment::where('lawyer_id',$id)->whereIn('status',['Accepted','Finished'])->orderBy('id','DESC')->get();

        return CalendarResource::collection($data);
    }

    public function update(Request $request){
        $id = $request->input('schedid');    

        $data = Schedule::findOrFail($id);
        $data->date = $request->input('newsched');    
        $data->save();
      
        return new DefaultResource($data);
    }

    public function store(Request $request){
          
        $data = new Activity;
        $data->date = $request->input('date');    
        $data->title = $request->input('title');    
        $data->content = $request->input('content');  
        $data->user_id = Auth::user()->id;  
        $data->save();
      
        return new DefaultResource($data);
    }

    public function activity(){
        $id = Auth::user()->id;    
        $data = Activity::where('user_id',$id)->orderBy('id','DESC')->get();

        return ActivityResource::collection($data);
    }

    public function activityupdate(Request $request){
        $id = $request->input('schedid');    

        $data = Activity::findOrFail($id);
        $data->date = $request->input('newsched');    
        $data->save();
      
        return new DefaultResource($data);
    }

}
