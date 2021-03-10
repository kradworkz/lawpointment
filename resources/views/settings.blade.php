@extends('layouts.frontend.whole')
@section('content')
   
<div id="breadcrumb">
    <div class="container">
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Settings</a></li>
        </ul>
    </div>
</div>

<div class="container" style="margin-top: 30px;" >
    <div class="row">
        <div class="col-xl-12 col-lg-12">
            <nav id="secondary_nav">
                <div class="container">
                    <ul class="clearfix">
                        <li><a href="#section_1" class="active">Calendar </a></li>
                        <li><a href="#section_2">Appointments</a></li>
                        <li><a href="#sidebar"></a></li>
                    </ul>
                </div>
            </nav>
            <div id="section_1">
                <div class="box_general">
                    <div class="list_general">
                    <setting type="{{Auth::user()->type}}" status="{{Auth::user()->status}}"></setting>
                    </div>
                    <div class="list_general">
                        <password></password>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


@endsection

   
