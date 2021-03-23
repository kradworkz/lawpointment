<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Appointment;
use App\Models\LawyerAppointment;
use Illuminate\Http\Request;
use App\Http\Resources\InsightResource;
use App\Http\Resources\TopResource;

class InsightController extends Controller
{
    public function index(Request $request)
    {   
        $array = [];
        $date = Carbon::now()->format( 'Y-m-d' );
        $user_id =  \Auth::user()->id;
        $type = $request->input('selected');
        $month = ($request->input('month') == '') ? date('m') : $request->input('month');
        $year = ($request->input('year') == '') ? date('Y') : $request->input('year');
        $from = $request->input('from');
        $to = $request->input('to');
        $status = $request->input('status');

        if($type == 'Daily')
        {   
            ($from != '') ? $date = $from : '';
            $prods1 =  Appointment::where('is_walkin',1)->where('status','Finished')->whereDate('created_at','=',$date)->count();
            $prods2 =  Appointment::where('is_walkin',0)->where('status','Finished')->whereDate('created_at','=',$date)->count();
            $prods3 =  User::where('type','Client')->whereDate('created_at','=',$date)->count();
           
            $prods4 =  Appointment::select('legalpractice_id',\DB::raw("count(*) as count"))
            ->where('status','Finished') 
            ->where('is_walkin',1)
            ->whereDate('created_at','=',$date)
            ->groupBy('legalpractice_id')
            ->orderBy('count','DESC')
            ->limit(1)
            ->get();
            $prods4 = (!empty($prods4[0])) ? $prods4[0]->legalpractice->name: 'None';

            $prods5 =  Appointment::select('legalpractice_id',\DB::raw("count(*) as count"))
            ->where('status','Finished') 
            ->where('is_walkin',0)
            ->whereDate('created_at','=',$date)
            ->groupBy('legalpractice_id')
            ->orderBy('count','DESC')
            ->limit(1)
            ->get();
            $prods5 = (!empty($prods5[0])) ? $prods4[0]->legalpractice->name: 'None';
            
            $prods6 =  LawyerAppointment::select('lawyer_id',\DB::raw("count(*) as count"))->where('status','Finished') 
            ->whereHas('appointment',function($query) use ($date){
                $query->where('status','Finished')->whereDate('created_at','=',$date);
            }) 
            ->groupBy('lawyer_id')
            ->orderBy('count','DESC')
            ->limit(1)
            ->get();

            $prods6 = (!empty($prods6[0])) ? $prods6[0]->lawyer->profile->firstname.' '.$prods6[0]->lawyer->profile->lastname : 'None';

         

            $date =  Carbon::createFromFormat('Y-m-d', $date)->format('M d, Y');
    
        }else if($type == 'Date Range'){

            $prods1 = Appointment::where('is_walkin',1)->where('status','Finished')->whereBetween('created_at', [
                $from,
                $to,
            ])->count();
            $prods2 =  Appointment::where('is_walkin',0)->where('status','Finished')->whereBetween('created_at', [
                $from,
                $to,
            ])->count();
            $prods3 =  User::where('type','Client')->whereBetween('created_at', [
                $from,
                $to,
            ])->count();

            $prods4 =  Appointment::select('legalpractice_id',\DB::raw("count(*) as count"))
            ->where('status','Finished') 
            ->where('is_walkin',1)
            ->whereBetween('created_at', [
                $from,
                $to,
            ])
            ->groupBy('legalpractice_id')
            ->orderBy('count','DESC')
            ->limit(1)
            ->get();
            $prods4 = (!empty($prods4[0])) ? $prods4[0]->legalpractice->name: 'None';

            $prods5 =  Appointment::select('legalpractice_id',\DB::raw("count(*) as count"))
            ->where('status','Finished') 
            ->where('is_walkin',0)
            ->whereBetween('created_at', [
                $from,
                $to,
            ])
            ->groupBy('legalpractice_id')
            ->orderBy('count','DESC')
            ->limit(1)
            ->get();
            $prods5 = (!empty($prods5[0])) ? $prods5[0]->legalpractice->name: 'None';

            $prods6 =  LawyerAppointment::select('lawyer_id',\DB::raw("count(*) as count"))->where('status','Finished') 
            ->whereHas('appointment',function($query) use ($from,$to){
                $query->where('status','Finished')->whereBetween('created_at', [
                    $from,
                    $to,
                ]);
            }) 
            ->groupBy('lawyer_id')
            ->orderBy('count','DESC')
            ->limit(1)
            ->get();

            $prods6= (!empty($prods6[0])) ? $prods6[0]->lawyer->profile->firstname.' '.$prods6[0]->lawyer->profile->lastname : 'None';
    

            $date = Carbon::createFromFormat('Y-m-d', $from)->format('M d, Y') .' to '. Carbon::createFromFormat('Y-m-d', $to)->format('M d, Y');

        }else if($type == 'Monthly'){

            $prods1 = Appointment::where('is_walkin',1)->where('status','Finished')->whereMonth('created_at',$month)->count();
            $prods2 = Appointment::where('is_walkin',0)->where('status','Finished')->whereMonth('created_at',$month)->count();
            $prods3 = User::where('type','Client')->whereMonth('created_at',$month)->count();


            $prods4 =  Appointment::select('legalpractice_id',\DB::raw("count(*) as count"))
            ->where('status','Finished') 
            ->where('is_walkin',1)
            ->whereMonth('created_at',$month)
            ->groupBy('legalpractice_id')
            ->orderBy('count','DESC')
            ->limit(1)
            ->get();
            $prods4 = (!empty($prods4[0])) ? $prods4[0]->legalpractice->name: 'None';

            $prods5 =  Appointment::select('legalpractice_id',\DB::raw("count(*) as count"))
            ->where('status','Finished') 
            ->where('is_walkin',0)
            ->whereMonth('created_at',$month)
            ->groupBy('legalpractice_id')
            ->orderBy('count','DESC')
            ->limit(1)
            ->get();
            $prods5 = (!empty($prods5[0])) ? $prods5[0]->legalpractice->name: 'None';

            $prods6 =  LawyerAppointment::select('lawyer_id',\DB::raw("count(*) as count"))->where('status','Finished') 
            ->whereHas('appointment',function($query) use ($month){
                $query->where('status','Finished')->whereMonth('created_at',$month);
            }) 
            ->groupBy('lawyer_id')
            ->orderBy('count','DESC')
            ->limit(1)
            ->get();

            $prods6 = (!empty($prods6[0])) ? $prods6[0]->lawyer->profile->firstname.' '.$prods6[0]->lawyer->profile->lastname : 'None';
            
            $monthName = date('F', mktime(0, 0, 0, $month, 10));
            $date = 'Month of '.$monthName;
        }else{

            $prods1 = Appointment::where('is_walkin',1)->where('status','Finished')->whereYear('created_at',$year)->count();
            $prods2 = Appointment::where('is_walkin',0)->where('status','Finished')->whereYear('created_at',$year)->count();
            $prods3 = User::where('type','Client')->whereYear('created_at',$year)->count();

            $prods4 =  Appointment::select('legalpractice_id',\DB::raw("count(*) as count"))
            ->where('status','Finished') 
            ->where('is_walkin',1)
            ->whereYear('created_at',$year)
            ->groupBy('legalpractice_id')
            ->orderBy('count','DESC')
            ->limit(1)
            ->get();
            $prods4 = (!empty($prods4[0])) ? $prods4[0]->legalpractice->name: 'None';

            $prods5 =  Appointment::select('legalpractice_id',\DB::raw("count(*) as count"))
            ->where('status','Finished') 
            ->where('is_walkin',0)
            ->whereYear('created_at',$year)
            ->groupBy('legalpractice_id')
            ->orderBy('count','DESC')
            ->limit(1)
            ->get();
            $prods5 = (!empty($prods5[0])) ? $prods5[0]->legalpractice->name: 'None';


            $prods6 =  LawyerAppointment::select('lawyer_id',\DB::raw("count(*) as count"))->where('status','Finished') 
            ->whereHas('appointment',function($query) use ($year){
                $query->where('status','Finished')->whereYear('created_at',$year);
            }) 
            ->groupBy('lawyer_id')
            ->orderBy('count','DESC')
            ->limit(1)
            ->get();

            $prods6 = (!empty($prods6[0])) ? $prods6[0]->lawyer->profile->firstname.' '.$prods6[0]->lawyer->profile->lastname : 'None';

            $date = 'Year of '.Carbon::now()->format('Y');
        }

        $titles = ['Finished Online Appointments', 'Finished Walk-in Appointments', 'Registered Clients',' Most Selected Online Legal Practice', 'Most Selected Walk-in Legal Practice','Most Appointed Lawyer'];
        $definition = ['Number of Online Appointments','Number of walkin Appointments','Number Clients',  'Most in Online', 'Most in Walk-in','Most Appointed Lawyer',];
        
        array_push($array, $prods1, $prods2, $prods3,$prods4,$prods5,$prods6);
          $dataSet[] = [
            'date'  => $date,
            'count'    => $array,
            'title'    => $titles,
            'def' => $definition
        ];
        return $dataSet;
    }

    public function report(Request $request){
        $array = [];
        $date = Carbon::now()->format( 'Y-m-d' );
        $user_id =  \Auth::user()->id;
        $type = $request->input('selected');
        $month = ($request->input('month') == '') ? date('m') : $request->input('month');
        $year = ($request->input('year') == '') ? date('Y') : $request->input('year');
        $from = $request->input('from');
        $to = $request->input('to');

        if($type == 'Daily')
        {
            ($from != '') ? $date = $from : '';
            $data =  Appointment::select('legalpractice_id',\DB::raw("count(*) as count"))
            ->where('status','Finished') 
            ->whereDate('created_at','=',$date)
            ->groupBy('legalpractice_id')
            ->orderBy('count','DESC')
            ->limit(5)
            ->get();
           
            return InsightResource::collection($data);

        }else if($type == 'Weekly'){

            $data =  Appointment::select('legalpractice_id',\DB::raw("count(*) as count"))
            ->where('status','Finished') 
            ->whereBetween('created_at', [
                Carbon::parse('last monday')->startOfDay(),
                Carbon::parse('next friday')->endOfDay(),
            ])
            ->groupBy('legalpractice_id')
            ->orderBy('count','DESC')
            ->limit(5)
            ->get();
            return InsightResource::collection($data);

        }else if($type == 'Monthly'){

            $data =  Appointment::select('legalpractice_id',\DB::raw("count(*) as count"))
            ->where('status','Finished') 
            ->whereMonth('created_at',$month)
            ->groupBy('legalpractice_id')
            ->orderBy('count','DESC')
            ->limit(5)
            ->get();
            return InsightResource::collection($data);

        }else if($type == 'Anually'){

        
            $data =  Appointment::select('legalpractice_id',\DB::raw("count(*) as count"))
            ->where('status','Finished') 
            ->whereYear('created_at',$year)
            ->groupBy('legalpractice_id')
            ->orderBy('count','DESC')
            ->limit(5)
            ->get();
            return InsightResource::collection($data);

        }else{
            $data =  Appointment::select('legalpractice_id',\DB::raw("count(*) as count"))
            ->where('status','Finished') 
            ->whereBetween('created_at',[$from.' 00:00:00',$to.' 23:59:59'])
            ->groupBy('legalpractice_id')
            ->orderBy('count','DESC')
            ->limit(5)
            ->get();
            return InsightResource::collection($data);
        }

        return true;

    }

    public function report2(Request $request){
        $array = [];
        $date = Carbon::now()->format( 'Y-m-d' );
        $user_id =  \Auth::user()->id;
        $type = $request->input('selected');
        $month = ($request->input('month') == '') ? date('m') : $request->input('month');
        $year = ($request->input('year') == '') ? date('Y') : $request->input('year');
        $from = $request->input('from');
        $to = $request->input('to');

        if($type == 'Daily')
        {
            ($from != '') ? $date = $from : '';
            $data =  LawyerAppointment::select('lawyer_id',\DB::raw("count(*) as count"))->where('status','Finished') 
            ->whereHas('appointment',function($query) use ($date){
                $query->where('status','Finished')->whereDate('created_at','=',$date);
            }) 
            ->groupBy('lawyer_id')
            ->orderBy('count','DESC')
            ->limit(5)
            ->get();

            return TopResource::collection($data);

        }else if($type == 'Weekly'){

            $data =  LawyerAppointment::select('lawyer_id',\DB::raw("count(*) as count"))->where('status','Finished') 
            ->whereHas('appointment',function($query) use ($date){
                $query->where('status','Finished')->whereBetween('created_at', [
                    Carbon::parse('last monday')->startOfDay(),
                    Carbon::parse('next friday')->endOfDay(),
                ]);
            }) 
            ->groupBy('lawyer_id')
            ->orderBy('count','DESC')
            ->limit(5)
            ->get();

            return TopResource::collection($data);


        }else if($type == 'Monthly'){

            $data =  LawyerAppointment::select('lawyer_id',\DB::raw("count(*) as count"))->where('status','Finished') 
            ->whereHas('appointment',function($query) use ($month){
                $query->where('status','Finished')->whereMonth('created_at',$month);
            }) 
            ->groupBy('lawyer_id')
            ->orderBy('count','DESC')
            ->limit(5)
            ->get();

            return TopResource::collection($data);

        }else if($type == 'Anually'){

            $data =  LawyerAppointment::select('lawyer_id',\DB::raw("count(*) as count"))->where('status','Finished') 
            ->whereHas('appointment',function($query) use ($year){
                $query->where('status','Finished')->whereYear('created_at',$year);
            }) 
            ->groupBy('lawyer_id')
            ->orderBy('count','DESC')
            ->limit(5)
            ->get();

            return TopResource::collection($data);

        }else{
            $data =  LawyerAppointment::select('lawyer_id',\DB::raw("count(*) as count"))
            ->whereHas('appointment',function($query) use ($from,$to){
                $query->where('status','Finished')->whereBetween('created_at',[$from.' 00:00:00',$to.' 23:59:59']);
            }) 
            ->groupBy('lawyer_id')
            ->orderBy('count','DESC')
            ->limit(5)
            ->get();

            return TopResource::collection($data);
        }

        return true;

    }

    public function toplawyer(Request $request){
        $id = $request->input('id');
        $from = $request->input('from');
        $to = $request->input('to');

        $prods6 =  LawyerAppointment::select('lawyer_id',\DB::raw("count(*) as count"))->where('status','Finished') 
        ->whereHas('appointment',function($query) use ($id){
            $query->where('status','Finished')->where('legalpractice_id',$id);
        }) 
        ->groupBy('lawyer_id')
        ->orderBy('count','DESC')
        ->limit(1)
        ->get();

        return $prods6 = (!empty($prods6[0])) ? $prods6[0]->lawyer->profile->firstname.' '.$prods6[0]->lawyer->profile->lastname : 'None';

    }   
}
