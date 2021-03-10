<template>
    <div>
        <div id="breadcrumb">
            <div class="container">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Lawyer</a></li>
                    <li>Appointments</li>
                </ul>
            </div>
        </div>

        <div class="filters_listing">
            <div class="container">

                <div class="row">
                    <div class="col-md-3">
                        <h6 style="font-size: 12px; font-size: .75rem; color: #999;">Search</h6>
                        <div class="search_bar_list">
                            <input type="submit" value="Search">
                            <input type="text" @keyup="search" v-model="keyword" class="form-control"
                                placeholder="Enter Title">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row">
                            <div class="col-md-6">
                                <h6 style="font-size: 12px; font-size: .75rem; color: #999;">From</h6>
                                <input type="date" v-model="from" placeholder="Date Example : 09/12/2019" class="form-control fill">
                            </div>
                            <div class="col-md-6">
                                <h6 style="font-size: 12px; font-size: .75rem; color: #999;">To</h6>
                                <input type="date" v-model="to" placeholder="Date Example : 09/12/2019" class="form-control fill">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <h6 style="font-size: 12px; font-size: .75rem; color: #999; margin-left: 80%;">Sort by</h6>
                        <multiselect v-model="selected" :options="options" :show-labels="false"
                            placeholder="Pick a status" @input="onChange"></multiselect>
                    </div>
                </div>
            </div>
        </div>


        <div class="container" style="margin-top: 30px;">
            <div class="row">
                <div class="col-xl-12 col-lg-12">
                    <nav id="secondary_nav">
                        <div class="container">
                            <ul class="clearfix">
                                <li><a href="#section_1" class="active">Appointments</a></li>
                                <li><a href="#sidebar"></a></li>
                            </ul>
                        </div>
                    </nav>
                    <div id="section_1" v-if="viewappointment == false">
                        <div class="box_general">

                            <div class="list_general">
                                <ul>
                                    <li v-for="appointment in appointments" v-bind:key="appointment.id">
                                        <figure><img :src="currentUrl+'/images/avatars/'+appointment.avatar" alt="">
                                        </figure>
                                        <h4>{{ appointment.client}}
                                            <i v-if="appointment.status == 'Cancelled'" class="cancel">
                                                {{ appointment.status}}
                                            </i>
                                            <i v-if="appointment.status != 'Cancelled'">
                                                <i v-if="appointment.appointment_status == 'Pending'"
                                                    class="pending">{{ appointment.appointment_status }} {{(appointment.lawyercount > 1) ? '(Referred)' : ''}}</i>
                                                <i v-if="appointment.appointment_status == 'Referred'"
                                                    class="cancel">{{ appointment.appointment_status }}</i>
                                                <i v-if="appointment.appointment_status == 'Finished'"
                                                    class="successful">{{ appointment.appointment_status }}</i>
                                                <i v-if="appointment.appointment_status == 'Accepted'"
                                                    class="approved">{{ appointment.appointment_status }}</i>
                                                <i v-if="appointment.appointment_status == 'Rescheduled'"
                                                    class="pending">Request for Rescheduled</i>
                                                <i v-if="appointment.appointment_status == 'Cancelled'"
                                                    class="cancel">{{ appointment.appointment_status }}</i>
                                            </i>
                                        </h4>
                                        <ul class="booking_details">
                                            <li><strong>Appointment Title</strong> {{ appointment.title }}</li>
                                            <li><strong>Booking Date</strong> {{ appointment.created_at }}</li>
                                            <li v-if="appointment.scheduled_flag == 'fixed'"><strong>Schedule Date</strong> {{ appointment.scheduled_at }}</li>
                                            <li  v-else style="color: red;"><strong>Schedule Date</strong> {{ appointment.scheduled_at }}</li>
                                            <!-- <p v-if="appointment.scheduled_flag == 'Resched'" style="color: green; margin-top: 30px;">
                                                <strong>Customer requested a new schedule.</strong> <br><br>
                                                <a href="#0" @click="status(appointment.scheduled_id,'Accepted')" class="btn_1 red add-pricing-list-item"><i class="fa fa-fw fa-plus-circle"></i>Accept</a>
                                                <a href="#0" @click="status(appointment.scheduled_id,'Reffer')" class="btn_1 gray add-pricing-list-item"><i class="fa fa-fw fa-plus-circle"></i>Declined</a>
                                            </p> -->
                                        </ul>
                                        <ul class="buttons">
                                            <!-- && new Date(appointment.scheduled_at) >= new Date() -->
                                            <li v-if="appointment.appointment_status == 'Accepted'" @click="status(appointment.appointment_id,'Finished')"><a class="btn_1 gray approve"><i class="fa fa-fw fa-check-circle-o"></i>Set as Finished</a></li>
                                            <li v-if="appointment.appointment_status == 'Accepted'" @click="refer(appointment.appointment_id,appointment.id)"><a class="btn_1 gray delete"><i class="fa fa-fw fa-check-circle-o"></i>Refer</a></li>
                                            <li v-if="appointment.appointment_status == 'Accepted' || appointment.appointment_status == 'Rescheduled'"  @click="approve(appointment.appointment_id,'Accepted')"><a class="btn_1 gray approve"><i class="fa fa-fw fa-check-circle-o"></i> Resched</a></li>
                                            <li @click="view(appointment)"><a class="btn_1 gray approve"><i class="fa fa-fw fa-check-circle-o"></i> View</a></li>
                                        </ul>
                                    </li>
                                </ul>
                                <nav aria-label="" class="add_top_20">
                                    <ul class="pagination pagination-sm" style="float: right;">
                                        <li class="page-item" v-bind:class="[{disabled: !pagination.prev_page_url}]">
                                            <a class="page-link" style=" pointer: cursor;" @click="fetch(pagination.prev_page_url)">Previous</a>
                                        </li>
                                        <li class="page-item active">
                                            <a class="page-link" href="#">Page {{ pagination.current_page }} of
                                                {{ pagination.last_page }}</a>
                                        </li>
                                        <li class="page-item"  v-bind:class="[{disabled: !pagination.next_page_url}]">
                                            <a class="page-link"  @click="fetch(pagination.next_page_url)"
                                                style="padding-left: 25px; padding-right: 25px; pointer: cursor;">Next</a>
                                        </li>
                                    </ul>
                                </nav>
                                <br><br><br>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div id="section_1">
                            <div class="box_general">
                                <br>
                                <div>
                                    <h4>{{ viewapp.client }}  
                                        <i v-if="viewapp.appointment_status == 'Pending'" class="pending">{{ viewapp.appointment_status }} {{(viewapp.lawyercount > 1) ? '(Referred)' : '' }} </i>
                                        <i v-if="viewapp.appointment_status == 'Accepted'" class="approved">{{ viewapp.appointment_status }}</i>
                                        <i v-if="viewapp.appointment_status == 'Cancelled'" class="cancel">{{ viewapp.appointment_status }}</i>
                                        <i v-if="viewapp.appointment_status == 'Finished'" class="successful">{{ viewapp.appointment_status }}</i>
                                    </h4>

                                    <p>Date Created: <span style="color: black; font-weight: 600;">{{ viewapp.created_at}}</span> <span style="padding-left:15px; padding-right: 15px;">|</span> Schedule Date: <span style="color: black; font-weight: 600;">{{ viewapp.scheduled_at}}</span></p>
                                    <ul class="buttons" style="margin-top:55px;">
                                        <li @click="back"><a class="btn_1 gray approve"><i class="fa fa-fw fa-check-circle-o"></i>Back</a></li>
                                        <li @click="history(viewapp.client_id)"><a class="btn_1 gray approve"><i class="fa fa-fw fa-check-circle-o"></i>History</a></li>
                                        <li v-if="viewapp.appointment_status == 'Accepted'" @click="getnotes(viewapp.appointment_id)"><a class="btn_1 gray approve"><i class="fa fa-fw fa-check-circle-o"></i>Notes</a></li>
                                        <li v-if="viewapp.appointment_status == 'Accepted'" @click="getfiles(viewapp.appointment_id)"><a class="btn_1 gray approve"><i class="fa fa-fw fa-check-circle-o"></i>Files</a></li>
                                        <li v-if="viewapp.appointment_status == 'Accepted' || viewapp.appointment_status == 'Rescheduled'"  @click="approve(viewapp.appointment_id,'Accepted')"><a class="btn_1 gray approve"><i class="fa fa-fw fa-check-circle-o"></i> Resched</a></li> 
                                        <li v-if="viewapp.appointment_status == 'Rescheduled'"  @click="status(viewapp.appointment_id,'Accepted')"><a class="btn_1 gray approve"><i class="fa fa-fw fa-check-circle-o"></i>Deny Resched</a></li>
                                        <li v-if="viewapp.appointment_status == 'Pending'" @click="refer(viewapp.appointment_id,viewapp.id)"><a class="btn_1 gray delete"><i class="fa fa-fw fa-times-circle-o"></i> Refer</a></li>
                                        <li v-if="viewapp.appointment_status == 'Pending'" @click="approve(viewapp.appointment_id,'Accepted')"><a class="btn_1 gray approve"><i class="fa fa-fw fa-check-circle-o"></i>Accept</a></li>
                                        <li v-if="viewapp.appointment_status == 'Accepted'" @click="cancel(viewapp.appointment_id,'Cancelled')"><a class="btn_1 gray delete"><i class="fa fa-fw fa-check-circle-o"></i>Cancel</a></li>
                                    </ul>
                                </div>
                                <div>
                                    
                                <div style="color: red; margin-bottom: 20px;" v-if="viewapp.status == 'Cancelled'">Reason: {{viewapp.reason}}<br></div>
                                <div style="color: red; margin-bottom: 20px;" v-if="viewapp.appointment_status == 'Rescheduled'">Rescheduled reason: {{viewapp.reschedreason}}<br></div>
                                    <h6>{{ viewapp.title }}</h6>
                                    <p>{{ viewapp.details }}</p>
                                    <br>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="margin-top: 150px;"> 
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Approve and Schedule it</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <div class="">
                            <div class="main_title_4">
                                <h3><i class="icon_circle-slelected"></i>Select your date and time</h3>
                            </div>
                            
                            <div class="row add_bottom_45">
                                <div class="col-lg-7">
                                    <div class="form-group">
                                        <div style="width: 100%;">
                                        <datepicker v-model="appointmentdate"  :inline="true" :bootstrap-styling="true" :disabled-dates="disabledDates" calendar-class="test"></datepicker>
                                        </div>
                                        <!-- <ul class="legend" style="margin-top: 10px; margin-left: 20px;">
                                            <li><strong></strong>Available</li>
                                            <li><strong></strong>Not available</li>
                                        </ul> -->
                                    </div>
                                </div>
                                <div class="col-lg-5">
                                    <ul class="time_select version_2 add_top_20">

                                        <li v-for="(slot,index) in slots" v-bind:key="slot.id" @click="slotselected(slot.value)" :class="{ 'disabled' : slot.status == 'Not Available'}">
                                            <input type="radio" :id="`radio${index}`" v-model="datetime" :value="slot.value">
										    <label :class="{ 'disabled' : slot.status == 'Not Available'}" :for="`radio${index}`">{{ slot.time }}</label>
                                        </li>
                                      
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <form class="md-float-material form-material" @submit.prevent="confirm">
                            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <button type="submitf" :disabled="datetime == ''" class="btn btn-primary">Accept</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="reason" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="margin-top: 150px;"> 
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Reason for Cancel</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <form class="md-float-material form-material" @submit.prevent="appointmentstatus">
                        <div class="modal-body">
                            <div class="form-group row profile-edit-container">
                                <div class="col-md-12">
                                    <div class="custom-form">
                                        <label>Reason: <span v-if="errors.reason" style="color: red; font-size: 12px;"> ({{ errors.reason[0] }})</span></label>
                                        <textarea v-model="reason" id="info" cols="30" rows="2" placeholder=""></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-primary">Approve</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="modal fade" id="refer" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="margin-top: 150px;"> 
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Refer</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="indent_title_in">
                            <i class="pe-7s-cash"></i>
                            <h4>{{viewapp.title}}</h4>
                            <p>{{viewapp.details}}</p>
                        </div>

                        <br>
                        <center>
                        <div class="col-md-10">
                        <multiselect v-model="lawyer" :options="lawyers" :custom-label="nameWithLang"
                        placeholder="Select a Lawyer" label="name" track-by="id">
                        </multiselect>
                        </div></center>

                    </div>
                    <div class="modal-footer">
                        <form class="md-float-material form-material" >
                            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <button @click="referit" type="button" class="btn btn-primary">Confirm</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="history" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="margin-top: 150px;"> 
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Client History</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    
                    <div class="modal-body" style="overflow: auto; max-height: 300px;">
                        <table class="table table-responsive table-striped">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Legal Practice</th>
                                    <th>Status</th>
                                    <th>Booked Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="history in histories" v-bind:key="history.id">
                                    <td>{{history.title}}</td>
                                    <td>{{history.legalpractice}}</td>
                                    <td>{{history.status}}</td>
                                    <td>{{history.created_at}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="notes" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="margin-top: 150px;"> 
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Notes</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    
                    <div class="modal-body">
                        <div v-if="n==false">
                             <div class="reviews-container" style="overflow: auto; max-height: 300px;">
                            <div class="" v-for="note in notes" v-bind:key="note.id" style="margin-bottom: 5px;">
                                <div class="rev-content" >
                                    <div class="rev-info">
                                        {{note.created_at}}
                                    </div>
                                    <div class="rev-text">
                                        <p>
                                             {{note.note}}
                                        </p>
                                    </div>
                                </div>
                            </div>
                             </div>
                        </div>
                        <div v-else>
                            <div class="form-group row profile-edit-container">
                                <div class="col-md-12">
                                    <div class="custom-form">
                                        <label>Note: <span v-if="errors.note" style="color: red; font-size: 12px;"> ({{ errors.note[0] }})</span></label>
                                        <textarea v-model="note" id="info" cols="30" rows="2" placeholder=""></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                            <button class="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
                            <button v-if="n==false" @click="n=true" type="button" class="btn btn-primary">Add Notes</button>
                        <form class="md-float-material form-material" @submit.prevent="addnote" >
                            <button v-if="n==true" type="submit" class="btn btn-primary">Save Notes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="files" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="margin-top: 150px;"> 
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <form class="md-float-material form-material" ref="file" @submit.prevent="addfile" enctype="multipart/form-data">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Files</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    
                    <div class="modal-body">
                        <div v-if="f==false">
                             <div class="reviews-container" style="overflow: auto; max-height: 300px;">
                            <div class="" v-for="file in all" v-bind:key="file.id" style="margin-bottom: 5px;">
                                <div class="rev-content" >
                                    <div class="rev-info">
                                       {{file.created_at}}
                                    </div>
                                    <div class="rev-text">
                                        <p>
                                             <a :href="currentUrl+'/images/files/'+file.file" target="_blank">{{file.file}}</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                             </div>
                        </div>
                        <div v-else>
                            <div class="form-group row profile-edit-container">
                                <div class="col-md-12">
                                    <input type="file" ref="file" multiple>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
                        <button v-if="f==false" @click="f=true" type="button" class="btn btn-primary">Add File</button>
                        <button v-if="f==true" type="submit" class="btn btn-primary">Save File</button>
                    </div>
                    </form>
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
    import Multiselect from 'vue-multiselect'
    import Datepicker from 'vuejs-datepicker'
    import moment from 'moment';
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    export default {
        data() {
            return {
                currentUrl: window.location.origin,
                errors: [],
                pagination: {},
                appointments: [],
                viewapp: {},
                selected: 'All',
                options: ['All','Pending', 'Accepted', 'Finished', 'Cancelled'],
                keyword: '',
                viewappointment: false,
                disabledDates: {
                    days: [0], 
                    to: new Date(Date.now())
                },
                slots: '',
                appointmentdate: new Date().getTime() + 24 * 60 * 60 * 1000,
                datetime: '',
                selectedappointment : '',
                selectedstatus : '',
                lawyers: [],
                lawyer: '',
                appid: '',
                lawid: '',
                isLoading: false,
                fullPage: true,
                histories: [],
                reason: '',
                note: '',
                notes: [],
                files: [],
                all: [],
                file: '',
                n : false,
                f: false,
                from: '',
                to: ''
            }
        },

        watch: {
            appointmentdate: function(val) {
                this.datetime = '';
                this.check();
            },

            from: function(){
                (this.to != '' && this.from != '') ? this.search() : '';
            },

            to: function(){
                (this.to != '' && this.from != '') ? this.search() : '';
            }
        },

        created() {
            this.fetch();
            this.check();
            this.fetchLawyer();
        },

        methods: {
        
            nameWithLang ({ firstname, lastname, numberofapp }) {
                return `${firstname} ${lastname} | Appointments : ${numberofapp}`;
            },

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

            test(id){
                let itemid = id;
                let aa = this.appointments.map(item => item.id).indexOf(itemid) // find index of your object

                axios.get(this.currentUrl + '/request/appointmentid/'+id)
                .then(response => {
                     this.viewapp = response.data.data;
                })
                .catch(err => console.log(err));
                
                this.view(this.viewapp);
            },

            fetchLawyer(){
                axios.get(this.currentUrl + '/request/user/list/Lawyer')
                .then(response => {
                    this.lawyers = response.data.data;;
                })
                .catch(err => console.log(err));
            },

            slotselected(val){
                this.datetime = val;
            },

            fetch(page_url) {
                let vm = this;
                page_url = page_url || this.currentUrl + '/request/appointments/lawyer';

                axios.get(page_url)
                .then(response => {
                    this.appointments = response.data.data;
                    vm.makePagination(response.data.meta, response.data.links);
                })
                .catch(err => console.log(err));
            },

            search() {
                let vm = this;
                axios.post(this.currentUrl + '/request/appointment/lawyersearch', {
                    word: this.keyword,
                    status: this.selected,
                    from: this.from,
                    to: this.to
                })
                .then(response => {
                    this.appointments = response.data.data;
                    vm.makePagination(response.data.meta, response.data.links);
                })
                .catch(err => console.log(err));
            },

            check(){
                axios.post(this.currentUrl + '/request/appointment/checkslot', {
                    chosendate: moment(this.appointmentdate).format('YYYY-MM-DD')
                })
                .then(response => {
                    this.slots = response.data;
                })
                .catch(err => console.log(err));
            },

            onChange() {
                this.search();
            },

            view(appointment) {
                this.viewappointment = true;
                this.viewapp = appointment;

                // if(viewapp.appointment_is_view == 1){
                //     axios.post(this.currentUrl + '/request/notification/update',{
                //         id : appointment.appointment_id
                //     })
                //     .then(response => {
                //         console.log(response);
                //     })
                //     .catch(err => console.log(err));
                // }
            },

            approve(id,status){
                $("#exampleModal").appendTo("body").modal('show');
                this.selectedappointment = id;
                this.selectedstatus = status;
            },

            confirm() {
                $("#exampleModal").modal('hide');
                this.isLoading = true;
                
                axios.post(this.currentUrl + '/request/appointment/status', {
                    id: this.selectedappointment,
                    status: this.selectedstatus,
                    datetime: this.datetime
                })
                .then(response => {
                    (this.selectedstatus != 'Resched') ? this.view(response.data.data) : '';
                    this.fetch();
                    this.datetime = '';
                    this.check();
                    this.isLoading = false;
                })
                .catch(err => console.log(err));
            },

            status(id,status) {
                axios.post(this.currentUrl + '/request/appointment/status', {
                    id: id,
                    status: status,
                })
                .then(response => {
                    this.fetch();
                    this.viewappointment = false;
                })
                .catch(err => console.log(err));
            },


            refer(appid,lawid) {
                $("#refer").appendTo("body").modal('show');
                this.appid = appid;
                this.lawid = lawid;
            },

            referit(){
                
                $("#refer").appendTo("body").modal('hide');
                this.isLoading = true;
                axios.post(this.currentUrl + '/request/app/refer', {
                    lawyer: this.lawyer.id,
                    appid: this.appid,
                    lawid: this.lawid
                })
                .then(response => {
                    this.fetch();
                    this.isLoading = false;
                })
                .catch(err => console.log(err));
            },

            back() {
                this.viewappointment = false;
            },

        cancel(id,status){
            this.selectedappointment = id;
            this.selectedstatus = status;
            $("#reason").appendTo("body").modal('show');
        },

        history(id){
           axios.get(this.currentUrl + '/request/appointment/history/'+id)
            .then(response => {
                this.histories = response.data.data;
                $("#history").appendTo("body").modal('show');
            })
            .catch(err => console.log(err));
        },

        getnotes(id){
            this.selectedappointment = id;
            axios.get(this.currentUrl + '/request/appointment/notes/'+id)
            .then(response => {
                this.notes = response.data.data;
                $("#notes").appendTo("body").modal('show');
            })
            .catch(err => console.log(err));
        },

        addnote(){
            axios.post(this.currentUrl + '/request/appointment/note/add', {
                id: this.selectedappointment,
                note: this.note,
            })
            .then(response => {
               this.n = false;
            })
            .catch(err => console.log(err));
        },

        getfiles(id){
            this.selectedappointment = id;
            axios.get(this.currentUrl + '/request/appointment/files/'+id)
            .then(response => {
                this.all = response.data.data;
                $("#files").appendTo("body").modal('show');
            })
            .catch(err => console.log(err));
        },

        addfile(e){

            e.preventDefault();
            let currentObj = this;
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }
            let formData = new FormData();
            for( var i = 0; i < this.$refs.file.files.length; i++ ){
                let file = this.$refs.file.files[i];
                formData.append('files[' + i + ']', file);
                formData.append('id', this.selectedappointment);
            }

            axios.post(this.currentUrl+'/request/appointment/file/add', formData, config)
            .then(response => {
                alert('File Uploaded');
            })
            .catch(function (error) {
                currentObj.output = error;
            });
        },

        appointmentstatus(status,id){
            $("#exampleModal").modal('hide');
            $("#reason").modal('hide');
            this.isLoading = true;
            axios.post(this.currentUrl + '/request/appointment/client/status', {
                id: this.selectedappointment,
                status: this.selectedstatus,
                reason: this.reason,
                type: 'cancel'
            })
            .then(response => {
                this.fetch();
                this.isLoading = false;
                this.selectedappointment = '';
                this.selectedstatus = '';
            })
            .catch(err => console.log(err));
        },

        },
        components: {
            Multiselect, Datepicker , Loading 
        }
    }

</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.vdp-datepicker .test {
    width: 100%;
    border: 0 !important;
}

.selectedslot {
    background-color: #333;
    color: #fff
}

.vld-overlay.is-full-page {
    z-index: 1051 !important;
}
</style>