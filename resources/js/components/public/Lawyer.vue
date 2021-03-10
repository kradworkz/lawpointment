<template>
    <div>

        <div id="results">
            <div class="container" style="padding-top: 20px; padding-bottom: 20px;">
                <div class="row">
                     <!-- <div class="col-md-6">
                        <multiselect v-model="legalpractice" :options="legalpractices"  @input="onChangeLegalpractice(legalpractice)"
                        placeholder="Filter by Legal Practices" label="name" track-by="id">
                        </multiselect>
                    </div> -->
                    <div class="col-md-12">
                        <div class="search_bar_list">
                            <input type="text" @keyup="search" v-model="keyword" class="form-control" placeholder="Enter name">
                            <input type="submit" value="Search">
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
       <div class="container margin_60_35">
           <h6>Select a Lawyer : </h6>
            <div class="row" v-if="confirm == false">

                <div class="col-lg-6">
                    <div class="strip_list wow fadeIn" v-for="lawyer in lawyers" v-bind:key="lawyer.id">
                        <!-- <a href="#0" class="wish_bt"></a> -->
                        <figure style="margin-top: 0px;">
                            <a><img :src="currentUrl+'/images/avatars/'+lawyer.avatar" alt=""></a>
                        </figure>
                        <small>{{ lawyer.specialization.name }}</small>
                        <h3>Atty. {{lawyer.firstname}} {{lawyer.lastname}}</h3>
                        <!-- <p>Hi don't hesitate to contact me, thank you! please follow me ...</p> -->
                        <!-- <span class="rating"><i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star"></i><i class="icon_star"></i> <small>(145)</small></span>
                        <a href="badges.html" data-toggle="tooltip" data-placement="top" data-original-title="Badge Level" class="badge_list_1"><img :src="currentUrl+'/frontend/img/badges/badge_1.svg'" width="15" height="15" alt=""></a> -->
                        <ul style="margin-top: 40px;">
                            <li><a class="btn_listing" @click="viewprofile(lawyer)">View Profile</a></li>
                            <li>
                                <a v-if="selected==false" @click="getlawyer(lawyer)">SELECT</a>
                                <a v-else @click="cancel">Cancel</a>
                            </li>
                        </ul>
                    </div>

                    <nav aria-label="" class="add_top_20">
                        <ul class="pagination pagination-sm">
                            <li class="page-item" v-bind:class="[{disabled: !pagination.prev_page_url}]">
                                <a class="page-link"  @click="fetch(pagination.prev_page_url)" >Previous</a>
                            </li>
                            <li class="page-item active">
                                <a class="page-link" >Page {{ pagination.current_page }} of {{ pagination.last_page }}</a>
                            </li>
                            <li class="page-item" v-bind:class="[{disabled: !pagination.next_page_url}]">
                                <a class="page-link" @click="fetch(pagination.next_page_url)" style="padding-left: 25px; padding-right: 25px;">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <aside class="col-lg-6" id="sidebar">
                    <nav id="secondary_nav">
						<div class="container">
							<ul class="clearfix">
								<li><a href="#section_1" class="active">Appointment Details</a></li>
								<li><a href="#section_2">Reviews</a></li>
							</ul>
						</div>
					</nav>
					<div id="section_1">
						<div class="box_general_3">
                            <form @submit.prevent="setAppointment">
								<div class="row">
									<div class="col-md-12">
										<div class="form-group">
                                            <span v-if="errors.lawyer" style="color: red; font-size: 12px;"> Please select a lawyer.</span>
                                            <label>Case Summary <span v-if="errors.title || errors.details || errors.legalpractice || errors.lawyer" style="color: red; font-size: 12px;"> (Please fill the form.)</span></label>
                                             <multiselect v-model="legalpractice" :options="legalpractices"  @input="onChangeLegalpractice"
                                                placeholder="Type of Legal Practices" label="name" track-by="id">
                                            </multiselect>
											<input type="text"  v-model="title" class="form-control" placeholder="Short summary of your case (required)" style="margin-top: 10px;">
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-12">
										<div class="form-group">
											<textarea rows="5" v-model="details" class="form-control" style="height:200px;" placeholder="Describe your case in detail. (required)"></textarea>
										</div>
									</div>
								</div>
                                <!-- <div class="checkbox-holder text-left">
                                    <div class="checkbox_2">
                                        <input type="checkbox" value="accept_2" id="check_2" name="check_2" checked>
                                        <label for="check_2"><span>I Agree to the <strong>Terms &amp; Conditions</strong></span></label>
                                    </div>
                                </div> -->
                                <br>
                                <button type="submit" class="btn_1" value="Submit Appointment">Submit Appointment</button>
							</form>
						</div>
					</div>
                </aside>
                
            </div>
            <div v-else class="row">
                <div class="container margin_120">
                    <div class="row justify-content-center">
                        <div class="col-lg-8">
                            <div id="confirm">
                                <div class="icon icon--order-success svg add_bottom_15">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72">
                                        <g fill="none" stroke="#8EC343" stroke-width="2">
                                            <circle cx="36" cy="36" r="35" style="stroke-dasharray:240px, 240px; stroke-dashoffset: 480px;"></circle>
                                            <path d="M17.417,37.778l9.93,9.909l25.444-25.393" style="stroke-dasharray:50px, 50px; stroke-dashoffset: 0px;"></path>
                                        </g>
                                    </svg>
                                </div>
                            <h2>Thanks for your booking!</h2>
                            <p>You will be notified prior to your booking.</p>
                            </div>
                        </div>
                    </div>
                    <!-- /row -->
                </div>
            </div>
        </div>

        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="margin-top: 150px;"> 
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{legalpractice.name}}</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>{{legalpractice.description}}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="profile" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="margin-top: 150px;"> 
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Profile</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="">
							<div class="profile">
								<div class="row">
									<div class="col-lg-5 col-md-4">
										<figure>
											<img :src="currentUrl+'/images/avatars/'+lawyer.avatar" alt="" class="img-fluid">
										</figure>
									</div>
									<div class="col-lg-7 col-md-8">
										<small>Specialization : {{lawyer.specialization.name}}</small>
										<h1>Atty. {{lawyer.firstname}} {{lawyer.lastname}}</h1>
                                        <hr>
                                        <h6>Legal Practices</h6>
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <ul class="bullets">
                                                    <li v-for="l in lawyer.legalpractices" v-bind:key="l.id">{{l.name}}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <br>
                                        <h6>Dialect Spoken / Languages</h6>
                                        <div class="row">
                                            <div class="col-lg-12">
                                              	<ul class="statistic">
                                                    <li style="margin-right: 5px;" v-for="l in lawyer.languages" v-bind:key="l.id">{{l.name}}</li>
                                                </ul> 
                                            </div>
                                        </div>
									</div>
								</div>
							</div>
						</div>
                    </div>
                </div>
            </div>
        </div>

         <loading :active.sync="isLoading" 
        :can-cancel="true" 
        loader="dots"
        background-color="black"
        :is-full-page="fullPage"></loading>
         
    </div>
</template>


<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Multiselect from 'vue-multiselect'
export default {
    data(){
        return {
            currentUrl: window.location.origin,
            errors: [],
            pagination: {},
            lawyers: [],
            legalpractices : [],
            legalpractice : '',
            keyword: '',
            title: '',
            details: '',
            lawyer : {
                specialization: ''
            },
            selectedlawyer : '',
            selected : false,
            confirm : false,
            isLoading: false,
            fullPage: true
        }
    },
    
    created(){
        this.fetchLegalpractice();
        this.fetch();
        this.check();
    },

    // computed: {
    //     sortlawyers: function() {
    //          return this.lawyers.sort(function (a, b) { return a - b });
    //     },
    // },

    methods : {

        makePagination(meta, links) {
            let pagination = {
                current_page: meta.current_page,
                last_page: meta.last_page,
                next_page_url: links.next,
                prev_page_url: links.prev,
                total: meta.total
            };
            this.pagination = pagination;
        },
        
        check(){
            axios.get(this.currentUrl + '/request/count')
            .then(response => {
               if(response.data > 0){
                   window.location.href = 'myappointments';
               }
            })
            .catch(err => console.log(err));
        },

        fetchLegalpractice() {
            axios.get(this.currentUrl + '/request/dropdownpub/' + 'Legal Practice')
            .then(response => {
                this.legalpractices = response.data.data;
            })
            .catch(err => console.log(err));
        },

        onChangeLegalpractice(legalpractice){
            this.search();
            this.cancel();
            this.errors = [];
            $("#exampleModal").appendTo("body").modal('show');
        },

        fetch(page_url){
            let vm = this;
            page_url = page_url || this.currentUrl + '/request/users/Lawyer';

            axios.get(page_url)
            .then(response => {
                this.lawyers = response.data.data;;
                vm.makePagination(response.data.meta, response.data.links);
            })
            .catch(err => console.log(err));
        },

        setAppointment()
		{
            this.isLoading = true;
			axios.post(this.currentUrl + '/request/appointment/set', {
				legalpractice : this.legalpractice.id,
				lawyer: this.selectedlawyer,
				title : this.title,
				details : this.details
			})
			.then(response => {
                this.isLoading = false;
				this.confirm = true;
			})
			.catch(error => {
				if (error.response.status == 422) {
					this.errors = error.response.data.errors;
                    this.isLoading = false;
				}
			});
        },
        
        getlawyer(lawyer){

            let itemid = lawyer.specialization.id;
            let aa = this.legalpractices.map(item => item.id).indexOf(itemid) // find index of your object
            this.legalpractice = this.legalpractices[aa];
            this.selectedlawyer = lawyer.id;
            this.selected = true;
            this.lawyers = this.lawyers.filter(x => x.id == lawyer.id);
        },

        cancel(){
            this.selected = false;
            this.selectedlawyer = '';
        },

        search(){
            let vm = this;
            axios.post(this.currentUrl + '/request/user/search', {
                word: this.keyword,
                type: this.legalpractice.id
            })
            .then(response => {
                this.lawyers = response.data.data;
                vm.makePagination(response.data.meta, response.data.links);
            })
            .catch(err => console.log(err));
        },

        viewprofile(lawyer){
           this.lawyer = lawyer;
            $("#profile").appendTo("body").modal('show');
        }
    },
    
    components: { Multiselect, Loading }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>