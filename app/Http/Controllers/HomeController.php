<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        if(Auth::user()->type == "Administrator"){
            return view('user_secretary.index');
        }else if(Auth::user()->type == "Client"){
            return view('user_client.lawyer');
        }else if(Auth::user()->type == "Lawyer"){
            return view('user_lawyer.appointment');
        }else{
            return view('user_admin.index');
        }
    }
}
