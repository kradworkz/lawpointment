<nav class="navbar header-navbar pcoded-header" header-theme="theme5" pcoded-header-position="fixed">
    <div class="navbar-wrapper">
        <div class="navbar-logo" logo-theme="theme5">
            <a href="/home">
                <img class="img-fluid" src="{{asset('assets/images/logo.png')}}" alt="Lawpointment" />
            </a>
            <a class="mobile-menu" id="mobile-collapse" href="#!">
                <i class="feather icon-menu icon-toggle-right"></i>
            </a>
            <a class="mobile-options waves-effect waves-light">
                <i class="feather icon-more-horizontal"></i>
            </a>
        </div>
        <div class="navbar-container container-fluid">
            
            <ul class="nav-right">
                @if(Auth::check())
                <notifications></notifications>
                {{-- <li class="header-notification">
                    <div class="dropdown-primary dropdown">
                        <div class="displayChatbox dropdown-toggle" data-toggle="dropdown">
                            <i class="feather icon-message-square"></i>
                            <span class="badge bg-c-green">3</span>
                        </div>
                    </div>
                </li> --}}
                @endif
                <li class="user-profile header-notification">
                    <div class="dropdown-primary dropdown">
                        @if(Auth::check())
                        <div class="dropdown-toggle" data-toggle="dropdown">
                            <img src="{{asset('images/avatars/'.Auth::user()->profile->avatar)}}" class="img-radius" alt="User-Profile-Image">
                            <span>{{ Auth::user()->profile->firstname }} {{Auth::user()->profile->lastname}}</span>
                            <i class="feather icon-chevron-down"></i>
                        </div>
                        <ul class="show-notification profile-notification dropdown-menu" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">
                            
                            {{-- <li>
                                <a href="/profile/password">
                                    <i class="feather icon-settings"></i> Settings
                                </a>
                            </li> --}}
                            <li>
                                <a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                    <i class="feather icon-log-out"></i> Logout
                                </a>
                                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                    @csrf
                                </form>
                            </li>
                        </ul>
                        @else 
                        <div class="dropdown-toggle">
                            
                            <a href="{{ route('login') }}"><span style="margin-right: 15px;">Sign In</span></a> | <a href="{{ route('register') }}"><span style="margin-left: 15px;">Register</span></a>
                        </div>
                        @endif
                    </div>
                </li>
            </ul>
        </div>
    </div>
</nav>


