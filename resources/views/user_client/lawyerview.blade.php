@extends('layouts.frontend.whole')
@section('content')
   
    <pub-lawyerview :lawyer_id="{{ request()->route('id') }}"></pub-lawyerview>

@endsection

   
