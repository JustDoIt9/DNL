<template>
    <div class="container-fluid">
        <div class="row">
            <div class="wrapper single">
                <time-display></time-display>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="#">Client</a>
                    </li>
                    <li class="breadcrumb-item active">Client List</li>
                </ol>
                <h1 class="page-header">Client List</h1>
                <spinner v-show="loading" class="spinner"></spinner>
				<div class="timeline">
					<div class="chart_select_header grided">
					<!-- <div class="advanced_search_filter_panel bottom_0"> -->
						<div class="col-md-4 col-sm-4">
							<label>Referral link:</label>
							<input readonly type="text" name="link" v-model="link" class="form-control"> 
						</div>
						<div class="clearfix little-space"></div>
						<div class="col-md-2 col-sm-4">
							<label>Type:</label>
							<select2 :options="options" v-model="type">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="col-md-2 col-sm-4">
							<label>Terms:</label>
							<select2 :options="options" v-model="terms">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="col-md-2 col-sm-4">
							<label>Name:</label>
							<input type="text" name="name" v-model="name" class="form-control" placeholder="Enter Name">
						</div>
						<div class="clearfix little-space"></div>
						<div class="col-md-12">
							<div class="white_pad m-bottom-10">
								<div class="row">
									<div class="col-md-4 col-sm-4">
										<label for="end-date">Registered On:</label>
										<el-date-picker style="width: 100%;" type="date" v-model="register_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
									</div>
									<div class="col-md-4 col-sm-4">
										<label>Payment Terms:</label>
										<select2 :options="options" v-model="payment_terms">
											<option disabled value="0">Select one</option>
										</select2>
									</div>
									<div class="col-md-4 col-sm-4">
										<label for="end-date">Last Login On:</label>
										<el-date-picker style="width: 100%;" type="date" v-model="last_login" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
									</div>
								</div>
							</div>
						</div>
						<div class="clearfix"></div>
						<div class="col-md-12 col-sm-12">
							<div class="button_set">
								<a class="btn btn-primary">
									Query
								</a>
							</div>
						</div>
						<div class="clearfix"></div>							
					<!-- </div> -->
					</div>
					<div class="clearfix"></div>
					<div class="chart_content">
					<div class="table-responsive marged-30">
						<table class="table table-striped table-hover aliases">
							<thead>
								<tr>
									<!-- <th class="width-65">
										<div class="checkbox checkbox-success">
											<input type="checkbox" id="checker" name="checker" v-model="checker" @click="toggleChecker()">
											<label for="checker"></label>
										</div>
									</th> -->
									<th>Name</th>
									<th>Available Balance</th>
									<th>Credit Limit</th>
									<th>Registered On</th>
									<th>Created On</th>
									<th>Status</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								<tr v-if="!reports.length">
									<td style="text-align: center" colspan="7">No Data Found</td>
								</tr>										
								
								<tr v-for="report in reports">
									<!-- <td class="centred_checkbox">
										<div class="checkbox checkbox-success">
											<input :id="report.id" :name="report.id" type="checkbox" v-model="report.selected">
											<label :for="report.id"></label>
										</div>
									</td> -->
									<td>{{report.name}}</td>
									<td>{{report.balance}}</td>
									<td>{{report.limit}}</td>
									<td>{{report.registered}}</td>
									<td>{{report.created}}</td>
									<td>{{report.status}}</td>
									<td></td>
								</tr>
							</tbody>
						</table>
					</div>
					</div>
					 <div class="pull-right pagination">
						<pagination :current-page="pageOne.currentPage" :total-pages="pageOne.totalPages" @page-changed="pageOneChanged">
						</pagination>
					</div> 
					<div class="clearfix"></div>
				</div>				
            </div>
        </div>
    </div>
</template>

<script>   
const vTabs = require('vue!../../main_components/tabs.vue'),
    vTab = require('vue!../../main_components/tab.vue'),
    vSelect = require('vue!../../main_components/select.vue'),
    Pagination = require('vue!../../main_components/pagination.vue'),
	api = require("../../../api"),
	auth = require("../../../auth"),
	vSpinner = require('vue!../../main_components/fadeloader.vue');
_ = require('lodash');
import {mapGetters,	mapActions} from 'vuex'

module.exports = {
    components: {
        'tabs': vTabs,
        'tab': vTab,
        'select2': vSelect,
        'pagination': Pagination,
        'spinner': vSpinner
    },
    data: function () {
        return {
            loading: false,
			apiUrl: '',
			link: '',
			type: '',
			terms: '',
			name: '',
			register_date: '',
			payment_terms: '',
			last_login: '',

            selected1: 1,
            options1: [
                { id: 1, text: '10' },
                { id: 2, text: '20' },
                { id: 3, text: '30' },
                { id: 4, text: '50' },
                { id: 5, text: '100' }
            ],
            pageOne: {
                currentPage: 1,
                totalPages: 10,
                cntpage: 10,
            },
            reports: [
				{id: 1, name:'name', balance: 0, limit: 0, registered:'2017-07-01', created:'2017-07-01', status:'registered'},
				{id: 1, name:'name', balance: 0, limit: 0, registered:'2017-07-01', created:'2017-07-01', status:'registered'},
				{id: 1, name:'name', balance: 0, limit: 0, registered:'2017-07-01', created:'2017-07-01', status:'registered'},
			],
        }
    },
    methods: {
        ...mapActions({
            setAsyncConfirm: 'async_confirm/setAsyncConfirm',
            setMessage: 'app_message/setAppMessage'
        }),
        fetchreports() {
            var page = this.pageOne.currentPage - 1;
            var per_page = this.pageOne.cntpage;
            console.log("page => " + page + " , per_page => " + per_page);
            this.loading = true;

            this.$http.get(api.getEndpointUrl() + this.apiUrl + "?page=" + page + "&per_page=" + per_page + "&order_by=id&order_dir=desc",
                {
                    headers: {
                        "X-Auth-Token": auth.getToken()
                    }
                }).then(function (response) {
                    this.loading = false;
                    //todo: check success flag? validation errors?
                    var reports = response.body.payload.items;
                    console.log(reports);
                    this.reports = reports;
                    var total_page = response.body.payload.total;
                    this.pageOne.currentPage = response.body.payload.page + 1;
                    this.pageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
                    console.log("total pages => " + this.pageOne.totalPages);
                }, function (error) {
                    this.loading = false;
                    console.log(error);
                }
            );
        },
        pageOneChanged(pageNum) {
            if (pageNum !== this.pageOne.currentPage) {
                this.pageOne.currentPage = pageNum
                this.$nextTick(this.fetchreports)
            }
        },
        changePageCount (countPerPage) {
            if (countPerPage !== this.pageOne.cntpage) {
                this.pageOne.cntpage = countPerPage
                this.$nextTick(this.fetchreports)
            }
        },
    },
    mounted: function () {
        $('[data-toggle="tooltip"]').tooltip();
    },
	// updated: function () {
	// 	document.querySelector('.el-select > .el-input > input').placeholder = 'Show/Hide Columns';
	// },
    created: function () {
        this.fetchreports();
    }
}
</script>

<style>
.el-select__tags {
	display: none;
}
</style>
