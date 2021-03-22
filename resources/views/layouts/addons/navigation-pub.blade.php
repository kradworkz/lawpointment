<nav class="pcoded-navbar">
        <div class="pcoded-inner-navbar">
            <ul class="pcoded-item">
                @if(Auth::check())
                    @if(Auth::user()->type == 'Administrator')
                        <li class="pcoded">
                            <a href="/home" class="waves-effect waves-dark">
                                <span class="pcoded-micon"><i class="iconfont icofont-home"></i></span>
                                <span class="pcoded-mtext">Home</span>
                            </a>
                        </li>
                        {{-- <li class="pcoded-hasmenu">
                            <a href="/appointments/list" class="waves-effect waves-dark">
                                <span class="pcoded-micon"><i class="iconfont icofont-user-suited"></i></span>
                                <span class="pcoded-mtext">Appointments</span>
                            </a>
                        </li> --}}
                        <li class="pcoded-hasmenu">
                            <a href="/lawyers/list" class="waves-effect waves-dark">
                                <span class="pcoded-micon"><i class="iconfont icofont-user-suited"></i></span>
                                <span class="pcoded-mtext">Lawyers</span>
                            </a>
                        </li>
                        <li class="pcoded-hasmenu">
                            <a href="/clients" class="waves-effect waves-dark">
                                <span class="pcoded-micon"><i class="iconfont icofont-user"></i></span>
                                <span class="pcoded-mtext">Clients</span>
                            </a>
                        </li>
                        <li class="pcoded">
                            <a href="/dropdowns" class="waves-effect waves-dark">
                                <span class="pcoded-micon"><i class="iconfont icofont-listine-dots"></i></span>
                                <span class="pcoded-mtext">Dropdowns</span>
                            </a>
                        </li>
                        <li class="pcoded">
                            <a href="/reports" class="waves-effect waves-dark">
                                <span class="pcoded-micon"><i class="iconfont icofont-listine-dots"></i></span>
                                <span class="pcoded-mtext">Appointment Reports</span>
                            </a>
                        </li>
                        <li class="pcoded">
                            <a href="/reports" class="waves-effect waves-dark">
                                <span class="pcoded-micon"><i class="iconfont icofont-listine-dots"></i></span>
                                <span class="pcoded-mtext">Lawyer/Legal Practice Reports</span>
                            </a>
                        </li>
                        <li class="pcoded">
                            <a href="/insights" class="waves-effect waves-dark">
                                <span class="pcoded-micon"><i class="iconfont icofont-listine-dots"></i></span>
                                <span class="pcoded-mtext">Insights</span>
                            </a>
                        </li>
                    @elseif(Auth::user()->type == 'Client')
                        <li class="pcoded">
                            <a href="javascript:void(0)" class="waves-effect waves-dark">
                                <span class="pcoded-micon"><i class="iconfont icofont-home"></i></span>
                                <span class="pcoded-mtext">Home</span>
                            </a>
                        </li>
                        <li class="pcoded">
                            <a href="/dropdowns" class="waves-effect waves-dark">
                                <span class="pcoded-micon"><i class="iconfont icofont-list"></i></span>
                                <span class="pcoded-mtext">Appointments</span>
                            </a>
                        </li>
                    @else 
                        <li class="pcoded">
                            <a href="javascript:void(0)" class="waves-effect waves-dark">
                                <span class="pcoded-micon"><i class="iconfont icofont-home"></i></span>
                                <span class="pcoded-mtext">Home</span>
                            </a>
                        </li>
                        <li class="pcoded">
                            <a href="/dropdowns" class="waves-effect waves-dark">
                                <span class="pcoded-micon"><i class="iconfont icofont-listine-dots"></i></span>
                                <span class="pcoded-mtext">Lawyer</span>
                            </a>
                        </li>
                    @endif
                @else 
                <li class="pcoded">
                    <a href="javascript:void(0)" class="waves-effect waves-dark">
                        <span class="pcoded-micon"><i class="iconfont icofont-home"></i></span>
                        <span class="pcoded-mtext">Home</span>
                    </a>
                </li>
                
                <li class="pcoded-hasmenu">
                    <a href="/clients" class="waves-effect waves-dark">
                        <span class="pcoded-micon"><i class="iconfont icofont-user"></i></span>
                        <span class="pcoded-mtext">Lawyers</span>
                    </a>
                </li>
                @endif
            </ul>
        </div>
    </nav>
    