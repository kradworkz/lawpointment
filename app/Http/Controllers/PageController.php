<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller
{

    public function publawyers()
    {
        return view('user_client.lawyer');
    }

    public function publawyer()
    {
        return view('user_client.lawyerview');
    }

    public function pubappointments()
    {
        return view('user_client.appointment');
    }

    ////// l a w y e r //////

    public function lawyerappointments()
    {
        return view('user_lawyer.appointment');
    }

    public function calendar()
    {
        return view('user_lawyer.calendar');
    }

    ////// P u b l i c //////

    public function dropdowns()
    {
        return view('user_secretary.dropdown');
    }

    public function reports()
    {
        return view('user_secretary.report');
    }
    public function lawyerreports()
    {
        return view('user_secretary.lawyerreport');
    }

    public function insights()
    {
        return view('user_secretary.insight');
    }

    public function lawyers()
    {
        return view('user_secretary.lawyer');
    }

    public function appointments()
    {
        return view('user_secretary.appointment');
    }

    public function clients()
    {
        return view('user_secretary.client');
    }
    

    public function settings()
    {
        return view('settings');
    }

    public function myreports()
    {
        return view('myreports');
    }

    public function myinsights()
    {
        return view('myinsights');
    }
   
}
