<template>
	<div v-if="$route.path !== '/auth/login' && $route.path !== '/auth/registration' && $route.path !== '/auth/reset_password' && $route.path !== '/auth/successful_registration'">

		<nav class="client-menu navbar navbar-static-top navbar-inverse navbar-fixed-top" v-if="user_type=='agent'">
			<div class="topBar">
			<div class="top">
				<div class="col-md-3 col-sm-1">
				<img src="assets/images/header_logo.png" alt="header_logo">
				</div>
				<div class="col-md-5 col-sm-6">
				<ul class="middlelinks">
					<li><a href="/#/agents/management/agent_dashboard"><img src="assets/images/client/dashboard.png" alt="">DASHBOARD</a></li>
					<li class="have-sub-menue" @click="subHideShow()"><a><img src="assets/images/client/menuIcon.png" alt="">MENU</a></li>
					<div class="submenu transition">

					<div class="subnavlink">
						<a><img src="assets/images/client/changepassIcon.png" alt=""> CLIENT</a>
						<router-link to="/agents/client/client_list"><p>Client List</p></router-link>
						<router-link to="/agents/client/client_payment"><p>Client Payment</p></router-link>
						<router-link to="/agents/client/client_transaction"><p>Client Transaction</p></router-link>
					</div>

					<div class="subnavlink">
						<a><img src="assets/images/client/reportsicon.png" alt=""> STATISTICS</a>
						<router-link to="/agents/statistics/traffic_report"><p>Detail Traffic Report</p></router-link>
						<router-link to="/agents/statistics/cdrs_search"><p>CDR Search</p></router-link>
						<router-link to="/agents/statistics/pcap_search"><p>PCAP Search</p></router-link>
						<router-link to="/agents/statistics/commission_history"><p>Commission History</p></router-link>
					</div>

					</div>
				</ul>
				</div>
				<div class="clear"></div>
				<div class="col-md-4 col-sm-5 notifications">
					<div class="avatar">
					<div class="arrowHideshow" @click="arrowHideShow()">
						<img src="assets/images/client/avtarImg.png" alt=""> <span class="username">Rosalind Carroll
						<img class="arrowbottom" src="assets/images/client/bottomarrow.png" alt=""></span>
					</div>

					<div class="HideShow transition">
						<h3><span>Balance due:<br></span>1900.50 USD</h3>
						<a href="#"><img src="assets/images/client/AddNewIPicon.png" alt=""> Pay Now</a>
						<a href="#"><img src="assets/images/client/changepassIcon.png" alt=""> Change Password</a>
						<a href="#"><img src="assets/images/client/getsupportIcon.png" alt=""> Get Support</a>
						<a href="#"><img src="assets/images/client/HElpIcon.png" alt=""> Help</a>

						<router-link to="/logout"><button class="btn btn-danger" type="button" name="logout">Logout</button></router-link>
					</div>
					</div>

				</div>
			</div>	
			</div>		
		</nav>

		<nav class="client-menu navbar navbar-static-top navbar-inverse navbar-fixed-top" v-if="user_type=='client'">
			<!--  <div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="#">
				<img src="assets/images/header_logo.png" class="header_logo">
			</a>
			<user class="visible-xs"></user>
			</div>
			<div id="navbar" class="navbar-collapse collapse">
			<ul class="nav navbar-nav navbar-center">
				<li>
					<router-link to="/clients/management/carrier_dashboard">
						<span class="dnl_icon dnl_dashboard"></span>
						Dashboard
					</router-link>
				</li>
				<li class="dropdown">
					<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
						<span class="dnl_icon dnl_menu"></span>
						Menu 
						<span class="caret"></span>
					</a>
					<ul class="dropdown-menu">
						<li>
							<router-link to="/clients/management/account_summary">Account Summary </router-link>
						</li>
						<li>
							<router-link to="/clients/management/rate_table">Rate Table </router-link>
						</li>
						<li>
							<router-link to="/clients/management/trunks">Trunks </router-link>
						</li>
						<li>
							<router-link to="/clients/management/products">Products </router-link>
						</li>
					</ul>
				</li>
			</ul>
			<user class="hidden-xs"></user>
			</div>  -->

			<div class="topBar">
			<div class="top">
				<div class="col-md-3 col-sm-1">
				<img src="assets/images/header_logo.png" alt="header_logo">
				</div>
				<div class="col-md-5 col-sm-6">
				<ul class="middlelinks">
					<li><a href="/#/clients/management/carrier_dashboard"><img src="assets/images/client/dashboard.png" alt="">DASHBOARD</a></li>
					<li class="have-sub-menue" @click="subHideShow()"><a><img src="assets/images/client/menuIcon.png" alt="">MENU</a></li>
					<div class="submenu transition">
					<div class="subnavlink">
						<a><img src="assets/images/client/changepassIcon.png" alt=""> MANAGEMENT</a>
						<router-link to="/clients/management/account_summary"><p>Account Summary</p></router-link>
						<router-link to="/clients/management/rate_table"><p>Rate Table</p></router-link>
						<router-link to="/clients/management/trunks"><p>Trunks</p></router-link>
						<router-link to="/clients/management/products"><p>Products</p></router-link>
					</div>

					<div class="subnavlink">
						<a><img src="assets/images/client/billingicon.png" alt=""> BILLING</a>
						<router-link to="/clients/billing/balance"><p>Balance</p></router-link>
						<router-link to="/clients/billing/payment"><p>Paymeny History</p></router-link>
						<router-link to="/clients/billing/online_payment"><p>Online Payment</p></router-link>
						<router-link to="/clients/billing/invoices"><p>Invoices</p></router-link>
					</div>

					<div class="subnavlink">
						<a><img src="assets/images/client/reportsicon.png" alt=""> REPORTS</a>
						<router-link to="/clients/reports/cdrs_search"><p>CDRs List</p></router-link>
						<router-link to="/clients/reports/summary_report"><p>Summary Report</p></router-link>
					</div>

					<div class="subnavlink">
						<a><img src="assets/images/client/sipicon.png" alt=""> SIP PACKET SEARCH</a>
						<router-link to="/clients/sip/sip_packet_search"><p>SIPCPacket Search</p></router-link>
					</div>

					</div>
				</ul>
				</div>
				<div class="clear"></div>
				<div class="col-md-4 col-sm-5 notifications">
					<div class="notify">
					<div class="iconAndCounter">
						<img src="assets/images/client/ring.png" alt="">
						<span>28</span>
					</div>
					<div class="iconAndCounter">
						<img src="assets/images/client/ring.png" alt="">
						<span>0</span>
					</div>
					<div class="iconAndCounter">
						<img src="assets/images/client/message.png" alt="">
						<span>2</span>
					</div>
					</div>

					<div class="avatar col-md-6">
					<div class="arrowHideshow" @click="arrowHideShow()">
						<img src="assets/images/client/avtarImg.png" alt=""> <span class="username">Rosalind Carroll
						<img class="arrowbottom" src="assets/images/client/bottomarrow.png" alt=""></span>
					</div>

					<div class="HideShow transition col-md-offset-2">
						<h3><span>Balance due:<br></span>553.62 USD</h3>
						<a href="#"><img src="assets/images/client/changepassIcon.png" alt=""> Change Password</a>
						<a href="#"><img src="assets/images/client/switchIpICON.png" alt=""> Switch IP</a>
						<a href="#"><img src="assets/images/client/AddNewIPicon.png" alt=""> Add New IP</a>
						<a href="#"><img src="assets/images/client/getsupportIcon.png" alt=""> Get Support</a>
						<a href="#"><img src="assets/images/client/HElpIcon.png" alt=""> Help</a>

						<router-link to="/logout"><button class="btn btn-danger" type="button" name="logout">Logout</button></router-link>
					</div>
					</div>

				</div>
			</div>

			<!-- <div class="bottom">
				<div class="col-sm-6">
				<a class="active" href="#">Management</a><i class="fa fa-caret-right rightarrow" aria-hidden="true"></i>
				<a href="#">Accounts</a>
				</div>

				<div class="col-sm-6">
				<div class="pull-right">
					<img src="assets/images/client/topbarBottom.png" alt="">
					<p>09/23/2016 17:34:52 +0000</p>
				</div>
				</div>
			</div> -->

			</div>			

		</nav>


    </div>
<!-- <app-message></app-message> -->
</template>

<script>
	const user = require('vue!./../main_components/user.vue');
	const appMessage = require('vue!./../main_components/show_message.vue');
	const auth = require("../../auth");
	module.exports = {
		data: function() {
			return {
				user_type: '',
			}
		},
		components: {
			'user': user
			// 'app-message': appMessage
		},
		created () {
			this.user_type = auth.getType();
			console.log("created:", this.user_type);
		},
		updated () {
			this.user_type = auth.getType();
			console.log("updated:", this.user_type);
		},
		methods: {
			arrowHideShow() {
				if ($('.HideShow').css('display') == 'none') {
					$('.HideShow').css('display','block');
					$('.HideShow').css('opacity','1');
				}
				else {
					$('.HideShow').css('display','none');
					$('.HideShow').css('opacity','0');
				}
			},
			subHideShow() {
				if ($('.submenu').css('opacity') == 1) {
					$('.submenu').css('opacity','0');
					$('.submenu').css('display','none');
				}
				else {
					$('.submenu').css('opacity','1');
					$('.submenu').css('display','block');
				}
			}
		},
	}
</script>

<style>
	div#navbar .nav>li>a {
		padding: 13px 10px;
		font-size: 12px;
	}
	
	nav.admin-menu.navbar.navbar-static-top.navbar-inverse {
		background: #2b2f35;
		border: 0;
		min-height: 70px;
	}

	nav.client-menu.navbar.navbar-static-top.navbar-inverse {
		background: #243043;
		border: 0;
		min-height: 70px;
	}
	
	#navbar {
		padding-top: 10px;
	}

	.client-menu .nav.navbar-nav.navbar-center li {
		text-transform: uppercase;
	}
	
	.navbar-inverse .navbar-nav>li>a {
		font-size: 13px;
		color: #bdbfc6;
		padding: 10px;
	}
	
	ul.nav.navbar-nav.navbar-right {
		margin-right: 10px;
	}
	
	.navbar-inverse .navbar-nav>.active>a, .navbar-inverse .navbar-nav>.active>a:focus, .navbar-inverse .navbar-nav>.active>a:hover {
		color: #fff;
		background-color: transparent;
	}
	
	.navbar-nav>li>.dropdown-menu {
		margin-top: 14px;
		background: #22262b;
		box-shadow: inset 0px 7px 2px -4px #1f2227, 0px 2px 7px 0px rgba(0, 0, 0, 0.2);
		border: 0;
	}
	
	.dropdown-menu>li>a {
		color: #bdbfc6;
		font-size: 13px;
    	padding: 8px 15px;
	}
	
	.dropdown-menu>li>a:hover,
	.dropdown-menu>li>a:focus,
	.dropdown-menu>li>a.active{
		color: #03c0fc;
		background: transparent;
	}
	
	.navbar-inverse .navbar-nav>.open>a, 
	.navbar-inverse .navbar-nav>.open>a:focus, 
	.navbar-inverse .navbar-nav>.open>a:hover {
		background: transparent;
	}
	
	ul.dropdown-menu li .router-link-active {
		color: #fff;
	}
	
	/* Large desktop */
	@media (min-width: 1200px) { 
		
	}
	
	@media (max-width: 1400px) { 
		div#navbar .nav>li>a {
			padding: 13px 6px;
		}
	}

	/* Portrait tablet to landscape and desktop */
	@media (min-width: 768px) and (max-width: 979px) {

	}

	/* Landscape phone to portrait tablet */
	@media (max-width: 767px) {
		nav.admin-menu.navbar.navbar-static-top.navbar-inverse {
			min-height: 50px;
		}

		nav.client-menu.navbar.navbar-static-top.navbar-inverse {
			min-height: 50px;
		}
		
		.navbar-brand>img {
			display: block;
			height: 25px;
			margin-top: -2px;
		}
		
		span.table_time.pull-right.main_time {
			float: none !important;
		}
		
		.navbar-inverse .navbar-toggle {
			background: transparent;
			float: none;
			border: none;
			margin-top: 10px;
		}
		
		.navbar-inverse .navbar-toggle:focus, 
		.navbar-inverse .navbar-toggle:hover {
			background-color: #1d1f22;
		}
		
		#navbar {
			padding-top: 0px;
			position: absolute;
			width: 100%;
			background: #2b2f35;
		}
		
		#navbar .nav.navbar-nav {
			margin-top: 0;
		}
		
		div#navbar .nav>li>a {
			font-size: 14px;
			padding: 13px 6px 13px 15px;
		}
		
		div#navbar .nav>li>a span.caret {
			float: right;
			margin: 8px 20px;
			border-top: 5px dashed;
			border-top: 5px solid\9;
			border-right: 5px solid transparent;
			border-left: 5px solid transparent;
		}
		
		.navbar-nav .open .dropdown-menu {
			background: #1d2025;
			padding: 0;
		}
		
		.navbar-inverse .navbar-nav .open .dropdown-menu>li>a {
			color: #9d9d9d;
			padding: 12px 25px;
			border-bottom: 1px solid rgba(53, 57, 63, 0.5);
		}
		
		
	}

	/* Landscape phones and down */
	@media (max-width: 480px) {
		
	}

	/* Portrait phone to landscape phone */
	@media (min-width: 319px) and (max-width: 479px) {
		
	}
	
</style>
