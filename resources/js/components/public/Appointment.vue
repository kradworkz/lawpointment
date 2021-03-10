<template>
<div>
    <div id="breadcrumb">
        <div class="container">
            <ul>
                <li><a href="#">Home</a></li>
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
                        <input type="text" @keyup="search" v-model="keyword" class="form-control" placeholder="Enter name">
                    </div>
                </div>
                <div class="col-md-6">

                </div>
                <div class="col-md-3" >
                    <h6 style="font-size: 12px; font-size: .75rem; color: #999; margin-left: 80%;">Sort by</h6>
                    <multiselect v-model="status" :options="options" :show-labels="false"  placeholder="Pick a status" @input="onChange"></multiselect>
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
                <div id="section_1">
                    <div class="box_general">
                        
                        <div class="list_general" v-if="viewappointment == false">
                            <ul>
                                <li v-for="appointment in appointments" v-bind:key="appointment.id">
                                    <figure><img :src="currentUrl+'/images/avatars/'+appointment.lawyer_avatar" alt=""></figure>
                                    <h4>{{ appointment.lawyer_name}} 
                                        <i v-if="appointment.status == 'Pending'" class="pending">{{ appointment.status }}</i>
                                        <i v-if="appointment.status == 'Cancelled'" class="cancel">{{ appointment.status }}</i>
                                        <i v-if="appointment.status == 'Finished'" class="successful">{{ appointment.status }}</i>
                                        <i v-if="appointment.status == 'Accepted'" class="approved">{{ appointment.status }}</i>
                                        <i v-if="appointment.status == 'Rescheduled'" class="pending">Request for Rescheduled</i>
                                    </h4>
                                    <ul class="booking_details">
                                        <li><strong>Booking Title</strong> {{ appointment.title }}</li>
                                        <li><strong>Booking Date</strong> {{ appointment.created_at }}</li>
                                        <li><strong>Scheduled Date</strong> {{ appointment.scheduled_at }}</li>
                                    </ul>
                                    <ul class="buttons">
                                        <!-- <li><a href="#0" class="btn_1 gray approve"><i class="fa fa-fw fa-check-circle-o"></i> Approve</a></li> -->
                                        <li @click="view(appointment)"><a class="btn_1 gray delete"><i class="fa fa-fw fa-times-circle-o"></i> View</a></li>
                                        <li v-if="appointment.status == 'Accepted' || appointment.status == 'Pending'" @click="cancel('Cancelled',appointment.id)"><a class="btn_1 gray delete"><i class="fa fa-fw fa-times-circle-o"></i> Cancel</a></li>
                                        <li v-if="appointment.status == 'Accepted'" @click="approve(appointment.id,'Rescheduled')"><a href="#" class="btn_1 gray delete"><i class="fa fa-fw fa-times-circle-o"></i> Request Re-Schedule</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <nav aria-label="" class="add_top_20">
                                <ul class="pagination pagination-sm" style="float: right;">
                                    <li class="page-item"  v-bind:class="[{disabled: !pagination.prev_page_url}]">
                                        <a class="page-link" style="cursor: pointer;" @click="fetch(pagination.prev_page_url)" >Previous</a>
                                    </li>
                                    <li class="page-item active">
                                        <a class="page-link">Page {{ pagination.current_page }} of {{ pagination.last_page }}</a>
                                    </li>
                                    <li class="page-item" v-bind:class="[{disabled: !pagination.next_page_url}]">
                                        <a class="page-link" @click="fetch(pagination.next_page_url)" style="padding-left: 25px; padding-right: 25px; cursor: pointer;">Next</a>
                                    </li>
                                </ul>
                            </nav>
                            <br><br><br>
                        </div>
                        <div v-else>
                            
                            <br>
                            <div>
                                <h4>{{ viewapp.lawyer_name }}  
                                    <i v-if="viewapp.appointment_status == 'Pending'" class="pending">{{ viewapp.appointment_status }}</i>
                                    <i v-if="viewapp.appointment_status == 'Referred'" class="cancel">{{ viewapp.appointment_status }}</i>
                                    <i v-if="viewapp.appointment_status == 'Confirmed'" class="approved">{{ viewapp.appointment_status }}</i>
                                    <i v-if="viewapp.appointment_status == 'Approved'" class="approved">{{ viewapp.appointment_status }}</i>
                                    <i v-if="viewapp.appointment_status == 'Cancelled'" class="cancel">{{ viewapp.appointment_status }}</i>
                                </h4>

                                <p>Date Created: <span style="color: black; font-weight: 600;">{{ viewapp.created_at}}</span> <span style="padding-left:15px; padding-right: 15px;">|</span> Schedule Date: <span style="color: black; font-weight: 600;">{{ viewapp.scheduled_at}}</span></p>
                                <ul class="buttons" style="margin-top:55px;">
                                    <li @click="viewappointment = false"><a class="btn_1 gray approve"><i class="fa fa-fw fa-check-circle-o"></i>Back</a></li>
                                </ul>
                            </div>
                            <div>
                                <h6>{{ viewapp.title }}</h6>
                                <p>{{ viewapp.details }}</p>
                                <br>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="margin-top: 150px;"> 
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Request Reschedule</h5>
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
                                <button type="submit" class="btn btn-primary">Request</button>
                            </div>
                        </form>
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
                                <button type="submit" class="btn btn-primary">Confirm</button>
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
    </div>
</div>
    
</template>

<script>
import Multiselect from 'vue-multiselect'
import Datepicker from 'vuejs-datepicker'
import moment from 'moment';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
    data(){
        return{
            currentUrl: window.location.origin,
            errors: [],
            pagination: {},
            appointments : [],
            slots: [],
            status: '',
            options: ['Pending', 'Accepted', 'Finished', 'Cancelled'],
            keyword: '',
            disabledDates: {
                days: [0], 
                to: new Date(Date.now())
            },
            datetime: '',
            appointmentdate: new Date().getTime() + 24 * 60 * 60 * 1000,
            selectedappointment : '',
            selectedstatus : '',
            reason : '',
            viewappointment : false,
            viewapp : '',
            isLoading: false,
            fullPage: true,
            type: 'cancel'
        }
    },

    created(){
        this.fetch();
        this.check();
    },

    watch: {
        appointmentdate: function(val) {
            this.datetime = '';
            this.check();
        }
    },

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
            axios.post(this.currentUrl + '/request/appointment/checkslot', {
                chosendate: moment(this.appointmentdate).format('YYYY-MM-DD')
            })
            .then(response => {
                this.slots = response.data;
            })
            .catch(err => console.log(err));
        },

        fetch(page_url){
            let vm = this;
            page_url = page_url || this.currentUrl + '/request/appointments';

            axios.get(page_url)
            .then(response => {
                this.appointments = response.data.data;
                vm.makePagination(response.data.meta, response.data.links);
            })
            .catch(err => console.log(err));
        },

        search(){
            let vm = this;
            axios.post(this.currentUrl + '/request/appointment/search', {
                word: this.keyword,
                status: this.status
            })
            .then(response => {
                this.appointments = response.data.data;
                vm.makePagination(response.data.meta, response.data.links);
            })
            .catch(err => console.log(err));
        },

        cancel(status,id){
            this.selectedappointment = id;
            this.selectedstatus = status;
            $("#reason").appendTo("body").modal('show');
        },

        appointmentstatus(status,id){
            $("#exampleModal").modal('hide');
            $("#reason").modal('hide');
            this.isLoading = true;
            axios.post(this.currentUrl + '/request/appointment/client/status', {
                id: this.selectedappointment,
                status: this.selectedstatus,
                reason: this.reason,
                type: this.type
            })
            .then(response => {
                this.fetch();
                this.isLoading = false;
                this.selectedappointment = '';
                this.selectedstatus = '';
            })
            .catch(err => console.log(err));
        },

        onChange() {
            this.search();
        },

        approve(id,status){
            $("#exampleModal").appendTo("body").modal('show');
            this.selectedappointment = id;
            this.selectedstatus = status;
            this.type = 'reschedule'
        },

        slotselected(val){
            this.datetime = val;
        },

        test(id){
            let itemid = id;
            let aa = this.appointments.map(item => item.id).indexOf(itemid) // find index of your object

            axios.get(this.currentUrl + '/request/appointmentdi/'+id)
            .then(response => {
                    this.viewapp = response.data.data;
            })
            .catch(err => console.log(err));
            
            this.view(this.viewapp);
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

        
        confirm() {
            axios.post(this.currentUrl + '/request/appointment/restatus', {
                id: this.selectedappointment,
                status: this.selectedstatus,
                datetime: this.datetime
            })
            .then(response => {
                (this.selectedstatus != 'Resched') ? this.view(response.data.data) : '';
                this.fetch();
                this.datetime = '';
                this.check();
                $("#exampleModal").modal('hide');
            })
            .catch(err => console.log(err));
        },

    }, components: { Multiselect ,Datepicker, Loading}
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>