<nav class="pcoded-navbar" navbar-theme="theme1" active-item-theme="theme1" sub-item-theme="theme2" active-item-style="style0" pcoded-navbar-position="fixed">
    <div class="nav-list">
        <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: 100%; height: 100%;">
            <div class="pcoded-inner-navbar main-menu">
            @if(Auth::user()->status != 'Inactive')
                @if(Auth::user()->type == 'Administrator')
                <div class="pcoded-navigation-label"  menu-title-theme="theme1">Navigation</div>
                <ul class="pcoded-item pcoded-left-item" item-border="true" item-border-style="solid" subitem-border="false">
                    <li class="{{ active('home','active') }}">
                        <a href="/home" class=" waves-dark">
                            <span class="pcoded-micon">
                                <i class="feather icon-menu"></i>
                            </span>
                            <span class="pcoded-mtext">Home</span>
                        </a>
                    </li>
                    <li class="{{ active('users','active') }}">
                        <a href="/users" class=" waves-dark">
                            <span class="pcoded-micon"><i class="feather icon-menu"></i></span>
                            <span class="pcoded-mtext">Users</span>
                        </a>
                    </li>
                    <li class="{{ active('chatbox','active') }}">
                        <a href="/chatbox" class=" waves-dark">
                            <span class="pcoded-micon"><i class="feather icon-menu"></i></span>
                            <span class="pcoded-mtext">Chatbox</span>
                        </a>
                    </li>
                </ul>
                <div class="pcoded-navigation-label"  menu-title-theme="theme1">Syncables</div>
                <ul class="pcoded-item pcoded-left-item">
                    <li class="{{ active('agencies','active') }}">
                        <a href="/agencies" class=" waves-dark">
                            <span class="pcoded-micon"><i class="feather icon-menu"></i></span>
                            <span class="pcoded-mtext">Agency</span>
                        </a>
                    </li>
                    <li class="{{ active('dropdownlists','active') }}">
                        <a href="/dropdownlists" class=" waves-dark">
                            <span class="pcoded-micon"><i class="feather icon-menu"></i></span>
                            <span class="pcoded-mtext">Master Data</span>
                        </a>
                    </li>
                </ul>
                

                {{-- ////////////  -------------------- DIVIDER  ---------------------- /////////// --}}

                @elseif(Auth::user()->type == 'Customer Relations Officer') 
                <div class="pcoded-navigation-label"  menu-title-theme="theme1">Navigation</div>
                <ul class="pcoded-item pcoded-left-item" item-border="true" item-border-style="solid" subitem-border="false">
                    <li class="{{ active('home','active') }}">
                        <a href="/home" class=" waves-dark">
                            <span class="pcoded-micon">
                                <i class="feather icon-menu"></i>
                            </span>
                            <span class="pcoded-mtext">Home</span>
                        </a>
                    </li>
                
                    <li class="{{ active('requests','active') }}">
                        <a href="/requests" class=" waves-dark">
                            <span class="pcoded-micon"><i class="feather icon-menu"></i></span>
                            <span class="pcoded-mtext">Requests</span>
                        </a>
                    </li>
                    <li class="{{ active('chatbox','active') }}">
                        <a href="/chatbox" class=" waves-dark">
                            <span class="pcoded-micon"><i class="feather icon-menu"></i></span>
                            <span class="pcoded-mtext">Chatbox</span>
                        </a>
                    </li>
                </ul>

                {{-- ////////////  -------------------- DIVIDER  ---------------------- /////////// --}}
                @else 

                @endif
            @endif
            </div>
        </div>
    </div>
</nav>
