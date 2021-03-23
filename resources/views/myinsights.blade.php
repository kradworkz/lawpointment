@extends('layouts.frontend.whole')
@section('content')
   
<myinsights user="{{Auth::user()->type}}"></myinsights>

@endsection
