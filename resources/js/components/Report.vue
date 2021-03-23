<template>
    <div class="col-md-12">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-block email-card">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="custom-form">
                                        <select @click="type" v-model="status">
                                            <option value="All">All</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Accepted">Accepted</option>
                                            <option value="Finished">Finished</option>
                                        </select>
                                    </div>
                                </div>
                                 <div class="col-md-3">
                                    <div class="custom-form">
                                        <select @click="type" v-model="lawyer" placeholder="Summary">
                                            <option value="" disabled selected hidden>Select a Lawyer</option>
                                            <option v-for="lawyer in lawyers" v-bind:key="lawyer.id" v-bind:value="lawyer.id">{{lawyer.firstname}} {{lawyer.lastname}}</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="col-md-6">
                                   <button class="btn btn-primary" @click="generateReport" style="float: right;">Print</button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="custom-form">
                                        <select  @click="type" v-model="selected" placeholder="Summary">
                                            <option value="Daily">Daily</option>
                                            <!-- <option value="Weekly">Weekly</option> -->
                                            <option value="Monthly">Monthly</option>
                                            <option value="Anually">Anually</option>
                                            <option value="Date Range">Date Range</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="custom-form">
                                        <div class="custom-form">
                                            <select v-if="selected == 'Monthly'" @click="type" v-model="month" placeholder="Summary">
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

                                            <select v-if="selected == 'Anually'" @click="type" v-model="yearr" placeholder="Summary">
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
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="custom-form no-icons" v-if="selected == 'Daily' || selected == 'Date Range'">
                                                        <input type="date" v-model="from" placeholder="Date Example : 09/12/2019">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="custom-form no-icons" v-if="selected == 'Date Range'">
                                                        <input type="date" v-model="to" placeholder="Date Example : 09/12/2019">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                           
                            <div class="col-md-12" ref="html2Pdf" style="padding: 40px;">
                                <h5>List of Appointments  (<span v-if="selected == 'Daily'">{{ (from == '') ? today : from }}</span> <span v-if="selected == 'Date Range'">{{from}} to {{to}}</span> <span v-if="selected == 'Monthly'"> {{months[month.replace(/^0+/, '')-1]}} - {{yearr}}</span> <span v-if="selected == 'Anually'">{{yearr}}</span>)</h5><br>
                                <table class="table table-striped" style="min-width: 100%; ">
                                    <thead>
                                        <tr>
                                            <th class="text-center">Client</th>
                                            <th class="text-center">Email</th>
                                            <th class="text-center">Lawyer</th>
                                            <th class="text-center">Legal Practice</th>
                                            <th class="text-center">Status</th>
                                            <th class="text-center">Scheduled Date</th>
                                            <th class="text-center">Booked Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="appointment in appointments" v-bind:key="appointment.id">
                                            <td class="text-center">{{appointment.client}}</td>
                                             <td class="text-center">{{appointment.email}}</td>
                                            <td class="text-center">{{appointment.lawyer_name}}</td>
                                            <td class="text-center">{{appointment.legalpractice}}</td>
                                            <td class="text-center">{{appointment.status}}</td>
                                            <td class="text-center">{{appointment.scheduled_at}}</td>
                                            <td class="text-center">{{appointment.created_at}}</td>
                                        </tr>
                                    </tbody>
                                </table>
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
import moment from 'moment';
export default {
    data() {
        return {
            currentUrl: window.location.origin,
            errors: [],
            pagination: {},
            lawyers: [],
            appointments: [],
            status: 'All',
            lawyer: '',
            selected : 'Daily',
            month:("0" + ((new Date()).getMonth() + 1)).slice(-2),
            yearr: new Date().getFullYear(),
            months : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            from: '',
            to: '',
             today:new Date().toISOString().slice(0, 10)
        }
    },

     created(){
        this.fetch();
        this.fetchLawyers();
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

        fetchLawyers(){
            axios.get(this.currentUrl + '/request/user/list/Lawyer')
            .then(response => {
                this.lawyers = response.data.data;;
            })
            .catch(err => console.log(err));
        },

        fetch(){
            axios.post(this.currentUrl + '/request/myreportss',{
                selected : this.selected,
                month: this.month,
                year: this.yearr,
                status: this.status,
                lawyer: this.lawyer,
                from : this.from,
                to: this.to
            })
            .then(response => {
                this.appointments = response.data.data;
            })
            .catch(err => console.log(err));
        },
         
        generateReport () {
            html2PDF(this.$refs.html2Pdf, {
                margin: {right : .5, left: .5},
                output: this.yearr+'_'+this.month+'_'+this.selected+'.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 4, dpi: 192, letterRendering: true },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
            })
        },


    }, components : { html2PDF}
}
</script>
