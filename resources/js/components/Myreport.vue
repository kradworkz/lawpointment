<template>
     <div>
        <div id="breadcrumb">
            <div class="container">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Lawyer</a></li>
                    <li>Appointment Reports</li>
                </ul>
            </div>
        </div>

        <div class="filters_listing">
          
            <div class="container" style="margin-top: 30px;">
                <div class="row">
                    <div class="col-xl-12 col-lg-12">
                        <nav id="secondary_nav">
                            <div class="container">
                                <ul class="clearfix">
                                    <li><a href="#section_1" class="active">Appointments Report (day/month/year)</a></li>
                                    <li><a href="#sidebar"></a></li>
                                </ul>
                            </div>
                        </nav>
                        <div id="section_1" >
                            <div class="box_general">
                                   
                                    <div class="row">
                                        <div class="col-md-2">
                                            <div class="custom-form">
                                                <select class="form-control" @click="type" v-model="sortby" placeholder="Summary">
                                                    <option value="Booking">Booking Date</option>
                                                    <option value="Schedule">Schedule Date</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="custom-form">
                                                <select class="form-control" @click="type" v-model="status" placeholder="Summary">
                                                    <option value="All">All</option>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Accepted">Accepted</option>
                                                    <option value="Finished">Finished</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="custom-form">
                                                <select class="form-control" @click="type" v-model="selected" placeholder="Summary">
                                                    <option value="Daily">Daily</option>
                                                    <option value="Monthly">Monthly</option>
                                                    <option value="Anually">Anually</option>
                                                    <option value="Date Range">Date Range</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="custom-form">
                                                <select class="form-control" v-if="selected == 'Monthly'" @click="type" v-model="month" placeholder="Summary">
                                                    <option value="01">January</option>
                                                    <option value="02">February</option>
                                                    <option value="03">March</option>
                                                    <option value="04">April</option>
                                                    <option value="05">May</option>
                                                    <option value="06">June</option>
                                                    <option value="07">July</option>
                                                    <option value="08">August</option>
                                                    <option value="09">September</option>
                                                    <option value="10">October</option>
                                                    <option value="11">November</option>
                                                    <option value="12">December</option>
                                                </select>

                                                 <select class="form-control" v-if="selected == 'Anually'" @click="type" v-model="yearr" placeholder="Summary">
                                                    <option value="2021">2021</option>
                                                    <option value="2022">2022</option>
                                                    <option value="2023">2023</option>
                                                    <option value="2024">2024</option>
                                                    <option value="2025">2025</option>
                                                    <option value="2026">2026</option>
                                                    <option value="2027">2027</option>
                                                    <option value="2028">2028</option>
                                                    <option value="2029">2029</option>
                                                    <option value="2030">2030</option>
                                                </select>

                                                <div class="custom-form no-icons" v-if="selected == 'Date Range' || selected == 'Daily'">
                                                    <input class="form-control" type="date" v-model="from" placeholder="Date Example : 09/12/2019">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="custom-form">
                                                <div class="custom-form no-icons" v-if="selected == 'Date Range'">
                                                    <input class="form-control" type="date" v-model="to" placeholder="Date Example : 09/12/2019">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <button  class="btn btn-primary" @click="generateReport" style="float: right;">Print</button>
                                        </div>
                                    </div><br>
                                <div class="col-md-12" ref="html2Pdf">
                                    <div class="row">
                                        <h5>List of Appointments (<span v-if="selected == 'Daily'">{{ (from != '') ? from : today }}</span><span v-if="selected == 'Date Range'">{{from}} to {{to}}</span>  <span v-if="selected == 'Monthly'"> {{months[month.replace(/^0+/, '')-1]}} - {{yearr}}</span> <span v-if="selected == 'Anually'">{{yearr}}</span>)</h5>
                                        <table class="table table-striped" style="min-width: 100%;">
                                            <thead>
                                                <tr>
                                                    <th class="text-center" v-if="user == 'Lawyer'">Client</th>
                                                    <th class="text-center" v-else>Lawyer</th>
                                                    <th class="text-center" v-if="user == 'Lawyer'">Email</th>
                                                    <th class="text-center">Legal Practice</th>
                                                    <th class="text-center">Status</th>
                                                    <th class="text-center">Scheduled Date</th>
                                                    <th class="text-center">Booked Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="appointment in appointments" v-bind:key="appointment.id">
                                                    <td class="text-center" v-if="user == 'Lawyer'">{{appointment.client}}</td>
                                                    <td class="text-center" v-else>{{appointment.lawyer_name}}</td>
                                                    <td class="text-center" v-if="user == 'Lawyer'">{{appointment.email}}</td>
                                                    <td class="text-center">{{appointment.legalpractice}}</td>
                                                    <td class="text-center">{{appointment.status}}</td>
                                                    <td class="text-center">{{appointment.scheduled_at}}</td>
                                                    <td class="text-center">{{appointment.created_at}}</td>
                                                </tr>
                                            </tbody>
                                        </table><br>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </div>


</template>
<script>
import html2PDF from 'jspdf-html2canvas';
export default {
    props : ['user'],
    data(){
        return {
            currentUrl: window.location.origin,
            errors: [],
            pagination: {},
            keyword: '',
            appointments : [],
            selected : 'Daily',
            status: 'All',
            show : false,
            month:("0" + ((new Date()).getMonth() + 1)).slice(-2),
            yearr: new Date().getFullYear(),
            months : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            from: '',
            to: '',
              today:new Date().toISOString().slice(0, 10),
              sortby: 'Booking'
        }
    },

    created(){
        this.fetch();
    },

    watch: {
        from: function () {
            (this.to != '' && this.from != '') ? this.fetch(): '';
            (this.selected == 'Daily' && this.from != '') ? this.fetch() : ''; 
        },

        to: function () {
            (this.to != '' && this.from != '') ? this.fetch(): '';
        }
    },

    methods : {
        type(){
           this.fetch();
        },

        fetch(){
            axios.post(this.currentUrl + '/request/myreports',{
                selected : this.selected,
                month: this.month,
                year: this.yearr,
                status: this.status,
                from: this.from,
                to: this.to,
                sortby: this.sortby
            })
            .then(response => {
                this.appointments = response.data.data;
            })
            .catch(err => console.log(err));
        },

        generateReport () {
            html2PDF(this.$refs.html2Pdf, {
                margin: {right : .5, left: .5, top: .5},
                output: this.yearr+'_'+this.month+'_'+this.selected+'.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 4, dpi: 192, letterRendering: true },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
            })
        },

        search(){

        }
    }, components : { html2PDF}
}
</script>
