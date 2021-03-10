<!DOCTYPE html>
<html lang="en">

<head>
    <title>{{config('app.name')}}</title>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="description" content="Admindek Bootstrap admin template made using Bootstrap 4 and it has huge amount of ready made feature, UI components, pages which completely fulfills any dashboard needs." />
    <meta name="keywords" content="flat ui, admin Admin , Responsive, Landing, Bootstrap, App, Template, Mobile, iOS, Android, apple, creative app">
    <meta name="author" content="colorlib" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script>window.Laravel = { csrfToken: '{{ csrf_token() }}' }</script>
    <link type="text/css" rel="stylesheet" href="{{asset('css/horizontal.css')}}" />
    <link rel="shortcut icon" href="{{asset('assets/images/icon.ico')}}">
</head>

<body>
    <div id="app"> 
            <div class="loader-bg">
                <div class="loader-bar"></div>
            </div>
     
            <div id="pcoded" class="pcoded">
            <div class="pcoded-overlay-box"></div>
            <div class="pcoded-container navbar-wrapper">

                @include('layouts.addons.header')

                <div class="pcoded-main-container">
                    <div class="pcoded-wrapper">

                        @include('layouts.addons.navigation-pub')

                        <div class="pcoded-content">
                            @yield('content')
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="{{asset('js/app.js')}}"></script>
    <script src="{{asset('js/horizontal.js')}}"></script>
</body>

</html>
