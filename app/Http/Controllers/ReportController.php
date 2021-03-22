<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\User;
use App\Models\LawyerAppointment;
use Carbon\Carbon;
use App\Models\Appointment;
use Illuminate\Http\Request;
use App\Http\Resources\ReportResource;

class ReportController extends Controller
{
    public function index(Request $request){

        $type = $request->input('selected');
        $month = ($request->input('month') == '') ? date('m') : $request->input('month');
        $year = ($request->input('year') == '') ? date('Y') : $request->input('year');

        if(Auth::user()->type == 'Lawyer'){
            $ids = Appointment::where('status','Finished')->whereHas('lawyers',function($query) {
                return $query->where('lawyer_id', Auth::user()->id);
            })->pluck('id');
        }else{
            $ids = Appointment::where('status','Finished')->where('client_id',Auth::user()->id)->pluck('id');
        }

        $query = Appointment::query();
        $query = $query->whereIn('id',$ids)->where('status','Finished');
        
        if($type == 'Daily'){
            $query = $query->whereDate('created_at',date('Y-m-d'));
        }else if($type == 'Weekly'){
            $query =  $query->whereBetween('created_at', [Carbon::parse('last monday')->startOfDay(),Carbon::parse('next friday')->endOfDay()]);
        }else if($type == 'Monthly'){
            $query = $query->whereMonth('created_at',$month);
        }else{
            $query = $query->whereYear('created_at',$year);
        }

        $data = $query->get();

        return ReportResource::collection($data);
    }


    public function insights(Request $request){
        
            $array = [];
            $date = Carbon::now()->format( 'Y-m-d' );
            $user_id =  \Auth::user()->id;
            $month = ($request->input('month') == '') ? date('m') : $request->input('month');
            $year = ($request->input('year') == '') ? date('Y') : $request->input('year');
            $type = $request->input('selected');
            $from = $request->input('from');
            $to = $request->input('to');
            $status = $request->input('status');

    
            if($type == 'Daily')
            {   
                $query = Appointment::query();
                ($status == 'All') ? '' : $query->where('status', $status);
                $ids = $query->whereHas('lawyers',function($query) {
                    return $query->where('lawyer_id', Auth::user()->id);
                })->pluck('id');
                
                if($from == '' || $to == ''){
                    $prods1 =  Appointment::whereIn('id',$ids)->where('is_walkin',1)->whereDate('updated_at','=',$date)->count();
                    $prods2 =  Appointment::whereIn('id',$ids)->where('is_walkin',0)->whereDate('updated_at','=',$date)->whereHas('lawyers',function($query) {
                        return $query->where('lawyer_id', Auth::user()->id);
                    })->count();
                    $prods3 =  Appointment::whereIn('id',$ids)->whereDate('updated_at','=',$date)->groupBy('client_id')->count();
                }else{
                    $prods1 =  Appointment::whereIn('id',$ids)->where('is_walkin',1)->whereBetween('updated_at',[$from,$to])->count();
                    $prods2 =  Appointment::whereIn('id',$ids)->where('is_walkin',0)->whereBetween('updated_at',[$from,$to])->whereHas('lawyers',function($query) {
                        return $query->where('lawyer_id', Auth::user()->id);
                    })->count();
                    $prods3 =  Appointment::whereIn('id',$ids)->whereBetween('updated_at',[$from,$to])->groupBy('client_id')->count();
                }   
                $prods4 =  Appointment::whereIn('id',$ids)->select('legalpractice_id',\DB::raw("count(*) as count"))
                ->where('is_walkin',1)
                ->whereDate('updated_at','=',$date)
                ->groupBy('legalpractice_id')
                ->orderBy('count','DESC')
                ->limit(1)
                ->get();
                $prods4 = (!empty($prods4[0])) ? $prods4[0]->legalpractice->name: 'None';
    
                $prods5 =  Appointment::whereIn('id',$ids)->select('legalpractice_id',\DB::raw("count(*) as count"))
                ->where('is_walkin',0)
                ->whereDate('updated_at','=',$date)
                ->groupBy('legalpractice_id')
                ->orderBy('count','DESC')
                ->limit(1)
                ->get();
                $prods5 = (!empty($prods5[0])) ? $prods4[0]->legalpractice->name: 'None';
                
                $prods6 =  Appointment::whereIn('id',$ids)->select('client_id',\DB::raw("count(*) as count"))
                ->whereDate('created_at','=',$date)
                ->groupBy('client_id')
                ->orderBy('count','DESC')
                ->limit(1)
                ->get();
    
                $prods6 = (!empty($prods6[0])) ? $prods6[0]->user->profile->firstname.' '.$prods6[0]->user->profile->lastname : 'None';
    
             
    
                $date = ($from != '' || $to != '') ? $from .'-'. $to : Carbon::createFromFormat('Y-m-d', $date)->format('M d, Y');
    
            }else if($type == 'Weekly'){
                
                $ids = Appointment::where('status','Finished')->whereHas('lawyers',function($query) {
                    return $query->where('lawyer_id', Auth::user()->id);
                })->pluck('id');
                
                $prods1 = Appointment::whereIn('id',$ids)->where('is_walkin',1)->where('status','Finished')->whereBetween('created_at', [
                    Carbon::parse('last monday')->startOfDay(),
                    Carbon::parse('next friday')->endOfDay(),
                ])->count();
                $prods2 =  Appointment::whereIn('id',$ids)->where('is_walkin',0)->where('status','Finished')->whereBetween('created_at', [
                    Carbon::parse('last monday')->startOfDay(),
                    Carbon::parse('next friday')->endOfDay(),
                ])->count();
                $prods3 =  Appointment::whereIn('id',$ids)->whereBetween('created_at', [
                    Carbon::parse('last monday')->startOfDay(),
                    Carbon::parse('next friday')->endOfDay(),
                ])->groupBy('client_id')->count();
    
                $prods4 =  Appointment::whereIn('id',$ids)->select('legalpractice_id',\DB::raw("count(*) as count"))
                ->where('status','Finished') 
                ->where('is_walkin',1)
                ->whereBetween('created_at', [
                    Carbon::parse('last monday')->startOfDay(),
                    Carbon::parse('next friday')->endOfDay(),
                ])
                ->groupBy('legalpractice_id')
                ->orderBy('count','DESC')
                ->limit(1)
                ->get();
                
                $prods4 = (!empty($prods4[0])) ? $prods4[0]->legalpractice->name: 'None';
    
                $prods5 =  Appointment::whereIn('id',$ids)->select('legalpractice_id',\DB::raw("count(*) as count"))
                ->where('status','Finished') 
                ->where('is_walkin',0)
                ->whereBetween('created_at', [
                    Carbon::parse('last monday')->startOfDay(),
                    Carbon::parse('next friday')->endOfDay(),
                ])
                ->groupBy('legalpractice_id')
                ->orderBy('count','DESC')
                ->limit(1)
                ->get();

                $prods5 = (!empty($prods5[0])) ? $prods5[0]->legalpractice->name: 'None';
    
                $prods6 =  Appointment::whereIn('id',$ids)->select('client_id',\DB::raw("count(*) as count"))
                ->whereBetween('created_at', [
                    Carbon::parse('last monday')->startOfDay(),
                    Carbon::parse('next friday')->endOfDay(),
                ])
                ->groupBy('client_id')
                ->orderBy('count','DESC')
                ->limit(1)
                ->get();
    
                $prods6 = (!empty($prods6[0])) ? $prods6[0]->user->profile->firstname.' '.$prods6[0]->user->profile->lastname : 'None';
        
    
                $d1 = Carbon::parse('last monday')->startOfDay()->format('M d, Y');
                $d2 = Carbon::parse('next friday')->endOfDay()->format('M d, Y');
                $date = $d1.' - '.$d2;
    
            }else if($type == 'Monthly'){
                
                $ids = Appointment::where('status','Finished')->whereHas('lawyers',function($query) {
                    return $query->where('lawyer_id', Auth::user()->id);
                })->pluck('id');
                

                $prods1 = Appointment::whereIn('id',$ids)->where('is_walkin',1)->where('status','Finished')->whereMonth('created_at',$month)->count();
                $prods2 = Appointment::whereIn('id',$ids)->where('is_walkin',0)->where('status','Finished')->whereMonth('created_at',$month)->count();
                $prods3 =  Appointment::whereIn('id',$ids)->whereMonth('created_at',$month)->groupBy('client_id')->count();
    
    
                $prods4 =  Appointment::whereIn('id',$ids)->select('legalpractice_id',\DB::raw("count(*) as count"))
                ->where('status','Finished') 
                ->where('is_walkin',1)
                ->whereMonth('created_at',$month)
                ->groupBy('legalpractice_id')
                ->orderBy('count','DESC')
                ->limit(1)
                ->get();
                $prods4 = (!empty($prods4[0])) ? $prods4[0]->legalpractice->name: 'None';
    
                $prods5 =  Appointment::whereIn('id',$ids)->select('legalpractice_id',\DB::raw("count(*) as count"))
                ->where('status','Finished') 
                ->where('is_walkin',0)
                ->whereMonth('created_at',$month)
                ->groupBy('legalpractice_id')
                ->orderBy('count','DESC')
                ->limit(1)
                ->get();
                $prods5 = (!empty($prods5[0])) ? $prods5[0]->legalpractice->name: 'None';
    
                $prods6 =  Appointment::whereIn('id',$ids)->select('client_id',\DB::raw("count(*) as count"))
                ->whereMonth('created_at',$month)
                ->groupBy('client_id')
                ->orderBy('count','DESC')
                ->limit(1)
                ->get();
    
                $prods6 = (!empty($prods6[0])) ? $prods6[0]->user->profile->firstname.' '.$prods6[0]->user->profile->lastname : 'None';
               
                $date = 'Month of '.Carbon::now()->format('F');
            }else{

                  
                $ids = Appointment::where('status','Finished')->whereHas('lawyers',function($query) {
                    return $query->where('lawyer_id', Auth::user()->id);
                })->pluck('id');
    
                $prods1 = Appointment::whereIn('id',$ids)->where('is_walkin',1)->where('status','Finished')->whereYear('created_at',$year)->count();
                $prods2 = Appointment::whereIn('id',$ids)->where('is_walkin',0)->where('status','Finished')->whereYear('created_at',$year)->count();
                $prods3 =  Appointment::whereIn('id',$ids)->whereYear('created_at',$year)->groupBy('client_id')->count();
    
                $prods4 =  Appointment::whereIn('id',$ids)->select('legalpractice_id',\DB::raw("count(*) as count"))
                ->where('status','Finished') 
                ->where('is_walkin',1)
                ->whereYear('created_at',$year)
                ->groupBy('legalpractice_id')
                ->orderBy('count','DESC')
                ->limit(1)
                ->get();
                $prods4 = (!empty($prods4[0])) ? $prods4[0]->legalpractice->name: 'None';
    
                $prods5 =  Appointment::whereIn('id',$ids)->select('legalpractice_id',\DB::raw("count(*) as count"))
                ->where('status','Finished') 
                ->where('is_walkin',0)
                ->whereYear('created_at',$year)
                ->groupBy('legalpractice_id')
                ->orderBy('count','DESC')
                ->limit(1)
                ->get();
                $prods5 = (!empty($prods5[0])) ? $prods5[0]->legalpractice->name: 'None';
    
    
                $prods6 =  Appointment::whereIn('id',$ids)->select('client_id',\DB::raw("count(*) as count"))
                ->whereYear('created_at',$year)
                ->groupBy('client_id')
                ->orderBy('count','DESC')
                ->limit(1)
                ->get();
    
                $prods6 = (!empty($prods6[0])) ? $prods6[0]->user->profile->firstname.' '.$prods6[0]->user->profile->lastname : 'None';
    
                $date = 'Year of '.Carbon::now()->format('Y');
            }
    
            $titles = ['Online Appointments', 'Walk-in Appointments', 'No. of Clients','Online Legal Practice', 'Walk-in Legal Practice','Most Appointed Client'];
            $definition = ['Number of Online Appointments','Number of walkin Appointments','Number Clients',  'Most in Online', 'Most in Walk-in','Most Appointed Client',];
            
            array_push($array, $prods1, $prods2, $prods3,$prods4,$prods5,$prods6);
              $dataSet[] = [
                'date'  => $date,
                'count'    => $array,
                'title'    => $titles,
                'def' => $definition
            ];
            return $dataSet;
        }

        public function reports(Request $request){

            $type = $request->input('selected');
            $lawyer = $request->input('lawyer');
            $month = ($request->input('month') == '') ? date('m') : $request->input('month');
            $year = ($request->input('year') == '') ? date('Y') : $request->input('year');
            $status = $request->input('status');
            $from = $request->input('from');
            $to = $request->input('to');

            if($lawyer != ''){
                $ids = Appointment::whereHas('lawyers',function($query) use ($lawyer) {
                    return $query->where('lawyer_id', $lawyer);
                })->pluck('id');
            } 

            $query = Appointment::query();
            ($status == 'All') ? '' : $query->where('status', $status);
            ($lawyer == '') ? '' : $query->whereIn('id', $ids);
            
            if($type == 'Daily'){
                if($from == '' || $to == ''){
                    $query = $query->whereDate('created_at',date('Y-m-d'));
                }else{
                    $query->whereBetween('created_at',[$from,$to]);
                }
            }else if($type == 'Weekly'){
                $query =  $query->whereBetween('created_at', [Carbon::parse('last monday')->startOfDay(),Carbon::parse('next friday')->endOfDay()]);
            }else if($type == 'Monthly'){
                $query = $query->whereMonth('created_at',$month);
            }else{
                $query = $query->whereYear('created_at',$year);
            }
            
            $query = $query->orderBy('client_id');
            $data = $query->get();
            
    
            return ReportResource::collection($data);
        }
        
    
}
