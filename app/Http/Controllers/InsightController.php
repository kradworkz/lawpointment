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

        $titles = ['Finished Online Appointments', 'Finished Walk-in Appointments', 'Registered Clients',' Frequently Requested Online Legal Practice', 'Frequently Requested Walk-in Legal Practice','Lawyer with most Appointments'];
        $definition = ['Number of Online Appointments','Number of walkin Appointments','Number Clients',  'Most in Online', 'Most in Walk-in','Lawyer with most Appointments',];
        
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
        $dataSet = [];
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
            ->orderBy('count','ASC')
            ->limit(5)
            ->get();
           
            $prods = InsightResource::collection($data);
            if($prods->count() != 0){
                foreach($prods as $prod){
                    $id =  $prod->legalpractice->id;

                    $query = Appointment::query();
                    $query->where('status', 'Finished')->where('legalpractice_id',$id);
                    ($from != '') ? $d = $from : $d = date('Y-m-d');
                    $query = $query->whereDate('created_at',$d);
                    $ids = $query->pluck('id');
                    
            
                    $prods6 =  LawyerAppointment::whereIn('appointment_id',$ids)->select('lawyer_id',\DB::raw("count(*) as count"))
                    ->groupBy('lawyer_id')
                    ->orderBy('count','ASC')
                    ->limit(1)
                    ->get();

                    $dataSet[] = [
                        'count'  => $prod->count,
                        'legalpractice'  => $prod->legalpractice->name,
                        'lawyer'    => $prods6[0]->lawyer->profile->firstname.' '.$prods6[0]->lawyer->profile->lastname
                    ];
                }
            }
            return $dataSet;

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
            $prods = InsightResource::collection($data);
            
            if($prods->count() != 0){
                foreach($prods as $prod){
                    $id =  $prod->legalpractice->id;

                    $query = Appointment::query();
                    $query->where('status', 'Finished')->where('legalpractice_id',$id);
                    $query = $query->whereMonth('created_at',$month);
                    $ids = $query->pluck('id');
                    
            
                    $prods6 =  LawyerAppointment::whereIn('appointment_id',$ids)->select('lawyer_id',\DB::raw("count(*) as count"))
                    ->groupBy('lawyer_id')
                    ->orderBy('count','DESC')
                    ->limit(1)
                    ->get();

                    $dataSet[] = [
                        'count'  => $prod->count,
                        'legalpractice'  => $prod->legalpractice->name,
                        'lawyer'    => $prods6[0]->lawyer->profile->firstname.' '.$prods6[0]->lawyer->profile->lastname
                    ];
                }
            }

            return $dataSet;

        }else if($type == 'Anually'){

        
            $data =  Appointment::select('legalpractice_id',\DB::raw("count(*) as count"))
            ->where('status','Finished') 
            ->whereYear('created_at',$year)
            ->groupBy('legalpractice_id')
            ->orderBy('count','DESC')
            ->limit(5)
            ->get();
            $prods = InsightResource::collection($data);
            if($prods->count() != 0){
                foreach($prods as $prod){
                    $id =  $prod->legalpractice->id;

                    $query = Appointment::query();
                    $query->where('status', 'Finished')->where('legalpractice_id',$id);
                    $query = $query->whereYear('created_at',$year);
                    $ids = $query->pluck('id');
                    
            
                    $prods6 =  LawyerAppointment::whereIn('appointment_id',$ids)->select('lawyer_id',\DB::raw("count(*) as count"))
                    ->groupBy('lawyer_id')
                    ->orderBy('count','DESC')
                    ->limit(1)
                    ->get();

                    $dataSet[] = [
                        'count'  => $prod->count,
                        'legalpractice'  => $prod->legalpractice->name,
                        'lawyer'    => $prods6[0]->lawyer->profile->firstname.' '.$prods6[0]->lawyer->profile->lastname
                    ];
                }
            }

            return $dataSet;

        }else{
            $data =  Appointment::select('legalpractice_id',\DB::raw("count(*) as count"))
            ->where('status','Finished') 
            ->whereBetween('created_at',[$from.' 00:00:00',$to.' 23:59:59'])
            ->groupBy('legalpractice_id')
            ->orderBy('count','DESC')
            ->limit(5)
            ->get();

            $prods = InsightResource::collection($data);
            
            if($prods->count() != 0){
                foreach($prods as $prod){
                    $id =  $prod->legalpractice->id;

                    $query = Appointment::query();
                    $query->where('status', 'Finished')->where('legalpractice_id',$id);
                    $query = $query->whereBetween('created_at',[$from.' 00:00:00',$to.' 23:59:59']);
                    $ids = $query->pluck('id');
                    
            
                    $prods6 =  LawyerAppointment::whereIn('appointment_id',$ids)->select('lawyer_id',\DB::raw("count(*) as count"))
                    ->groupBy('lawyer_id')
                    ->orderBy('count','DESC')
                    ->limit(1)
                    ->get();

                    $dataSet[] = [
                        'count'  => $prod->count,
                        'legalpractice'  => $prod->legalpractice->name,
                        'lawyer'    => $prods6[0]->lawyer->profile->firstname.' '.$prods6[0]->lawyer->profile->lastname
                    ];
                }
            }

            return $dataSet;
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
        $date = Carbon::now()->format( 'Y-m-d' );
        $type = $request->input('selected');
        $month = ($request->input('month') == '') ? date('m') : $request->input('month');
        $year = ($request->input('year') == '') ? date('Y') : $request->input('year');


        $query = Appointment::query();
        $query->where('status', 'Finished')->where('legalpractice_id',$id);
        if($type == 'Daily'){
            ($from != '') ? $d = $from : $d = date('Y-m-d');
            $query = $query->whereDate('created_at',$d);
        }else if($type == 'Monthly'){
            $query = $query->whereMonth('created_at',$month);
        }else if($type == 'Anually'){
            $query->whereYear('created_at',$year);
        }else{
            $query->whereBetween('created_at',[$from.' 00:00:00',$to.' 23:59:59']);
        }
        $ids = $query->pluck('id');
        

        $prods6 =  LawyerAppointment::whereIn('appointment_id',$ids)->select('lawyer_id',\DB::raw("count(*) as count"))
        ->groupBy('lawyer_id')
        ->orderBy('count','DESC')
        ->limit(1)
        ->get();

        return $prods6 = (!empty($prods6[0])) ? $prods6[0]->lawyer->profile->firstname.' '.$prods6[0]->lawyer->profile->lastname : 'None';

    }   
}
