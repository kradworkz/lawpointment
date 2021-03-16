@extends('layouts.frontend.whole')
@section('content')
   
<myreports user="{{Auth::user()->type}}"></myreports>

@endsection
