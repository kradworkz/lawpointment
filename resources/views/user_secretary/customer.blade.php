@extends('layouts.backend-horizontal')
@section('content')
{{-- 
<div class="page-header card">
    <div class="row align-items-end" style="margin-top: -25px;">
        <div class="col-lg-8">
            <div class="page-header-title"><i style="width: 30px; height: 30px; font-size: 17px;" class="feather icon-home bg-c-blue"></i>
                <div class="d-inline">
                    <span style="font-size: 20px;">Customers</span>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="page-header-breadcrumb">
                <ul class=" breadcrumb breadcrumb-title">
                    <li class="breadcrumb-item"><a href="/home"><i class="feather icon-home"></i></a></li>
                    <li class="breadcrumb-item"><a href="/customers">Dropdown List</a></li>
                </ul>
            </div>
        </div>
    </div>
</div> --}}

<div class="pcoded-inner-content" style="margin-top: 50px;">
    <div class="main-body">
        <div class="page-wrapper">
            <div class="page-body">
                <div class="row"> 
                    <cro-customer agency="{{$agency->address->region_id}}"></cro-customer>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection
