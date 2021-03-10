<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="Find easily a doctor and book online an appointment">
	<meta name="author" content="Ansonika">
	<meta name="csrf-token" content="{{ csrf_token() }}">
    <script>window.Laravel = { csrfToken: '{{ csrf_token() }}' }</script>
    <title>{{config('app.name')}}</title>
    

	<!-- Favicons-->
	
    <link rel="shortcut icon" href="{{asset('assets/images/icon.ico')}}">
	<link rel="apple-touch-icon" type="image/x-icon" href="{{asset('frontend/img/apple-touch-icon-57x57-precomposed.png')}}">
	<link rel="apple-touch-icon" type="image/x-icon" sizes="72x72" href="{{asset('frontend/img/apple-touch-icon-72x72-precomposed.png')}}">
	<link rel="apple-touch-icon" type="image/x-icon" sizes="114x114" href="{{asset('frontend/img/apple-touch-icon-114x114-precomposed.png')}}">
	<link rel="apple-touch-icon" type="image/x-icon" sizes="144x144" href="{{asset('frontend/img/apple-touch-icon-144x144-precomposed.png')}}">

    <!-- BASE CSS -->
    <link type="text/css" rel="stylesheet" href="{{asset('css/frontend.css')}}" />

</head>

<body>
	<div id="app">
		<div class="layer"></div>

		<div id="preloader">
			<div data-loader="circle-side"></div>
		</div>
    
		@include('layouts.frontend.header')

			<main>
				@yield('content')
			</main>
			
		{{-- @include('layouts.frontend.footer') --}}

		<div id="toTop"></div>
		
	</div>
    
    <script src="{{asset('js/app.js')}}"></script>
    <script src="{{asset('js/frontend.js')}}"></script>

</body>
</html>