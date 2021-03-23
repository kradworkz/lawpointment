    <header class="static">
		<div class="container">
			<div class="row">
				<div class="col-lg-3 col-6">
					<div id="logo_home">
						<h1><a href="/home" title="Finlawyer">Lawpointment</a></h1>
					</div>
				</div>
				<nav class="col-lg-9 col-6">
					<a class="cmn-toggle-switch cmn-toggle-switch__htx open_close" href="#0"><span>Menu mobile</span></a>
					<ul id="top_access">
						@if(Auth::check())
						<li id="user">
							<a href="#0">
								<figure><img src="{{asset('images/avatars/'.Auth::user()->profile->avatar)}}" alt=""></figure>
								{{ Auth::user()->profile->firstname }} {{Auth::user()->profile->lastname}}
							</a>
						</li>
						@else
						<li><a href="/login"><i class="pe-7s-user"></i></a></li>
						<li><a href="/register"><i class="pe-7s-add-user"></i></a></li>
						
						@endif
					</ul>
					
					<div class="main-menu">
						<ul>	
								
								@if(Auth::check())
								<notification :usertype="'{{ auth()->user()->type }}'"></notification> |
								<li><a href="/myreports">Reports</a></li>|
								@if(Auth::user()->type == 'Client')
								<li><a href="/lawyers">Lawyers</a></li>|
								<li><a href="/myappointments">Appointments</a></li>|
								@elseif(Auth::user()->type == 'Lawyer')
								<li><a href="/myinsights">Insights</a></li>|
								<li><a href="/calendar">Calendar</a></li> |
								@endif
								<li><a href="/settings">Settings</a></li> |
								<li>
									<a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
									Logout
									</a>
									<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
										@csrf
									</form>
								</li>
							@endif
						</ul>
					</div>
					<!-- /main-menu -->
				</nav>
			</div>
		</div>
		<!-- /container -->
	</header>
	<!-- /header -->