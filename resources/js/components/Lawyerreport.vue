<template>
    <div class="col-md-12">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-block email-card">
                        <div class="col-md-12">
                           
                            <div class="row">
                                <div class="col-md-1">
                                    <div class="custom-form">
                                        <label class="float-label" style="font-size: 12px;">List of top</label>
                                        <select v-model="no" placeholder="Summary">
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="15">15</option>
                                            <option value="20">20</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="custom-form">
                                        <label class="float-label" style="font-size: 12px;">Filter by Date</label>
                                        <select  v-model="selected" placeholder="Summary">
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
                                        <div class="custom-form" style="margin-top: 17px;">
                                            <select v-if="selected == 'Monthly'" v-model="month" placeholder="Summary">
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

                                            <select v-if="selected == 'Anually'" v-model="yearr" placeholder="Summary">
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
                                                <div class="col-md-6" v-if="selected == 'Daily' || selected == 'Date Range'">
                                                    <div class="custom-form no-icons">
                                                        <input type="date" v-model="from" placeholder="Date Example : 09/12/2019">
                                                    </div>
                                                </div>
                                                <div class="col-md-6" v-if="selected == 'Date Range'">
                                                    <div class="custom-form no-icons">
                                                        <input type="date" v-model="to" placeholder="Date Example : 09/12/2019">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-5">
                                   <button class="btn btn-primary" @click="generateReport" style="float: right;">Print</button>
                                </div>
                            </div>
                            <div ref="html2Pdf" style="padding: 40px;">
                                
                                <div class="row">
                                    <div class="col-md-12" style="margin-bottom: 25px;">
                                        <center><p style="font-size: 32px;">Castillo and Climaco Law Office</p></center>
                                        <center><p style="font-size: 14px; margin-top: -15px;">Mendoza Building, Pilar St., Zamboanga City</p></center>
                                        <span style="font-size: 20px;">APPOINTMENT REPORTS</span>
                                        <img style="float: right;" class="img-fluid" :src="currentUrl+'/assets/images/logo2.png'" alt="Lawpointment" />
                                        <hr>
                                    </div>
                                    <h5>Top {{no}} Lawyers (<span v-if="selected == 'Daily'">{{ (from != '') ? from : today}}</span><span v-if="selected == 'Date Range'">{{from}} to {{to}}</span><span v-if="selected == 'Monthly'"> {{months[month.replace(/^0+/, '')-1]}} - {{yearr}}</span> <span v-if="selected == 'Anually'">{{yearr}}</span>)</h5>
                                    <table class="table table-striped" style="min-width: 100%;">
                                        <thead>
                                            <tr>
                                                <th>Rank </th>
                                                <th class="text-center">Lawyer</th>
                                                <th class="text-center">Finished Appointments</th>
                                                <th class="text-center">Accepted Appointments</th>
                                                <th class="text-center">Total no. of Appointments</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(lawyer,index) in lawyers" v-bind:key="lawyer.id">
                                                <td >{{index + 1}}</td>
                                                <td class="text-center">{{lawyer.lawyer}}</td>
                                                <td class="text-center">{{lawyer.count}}</td>
                                                <td class="text-center">{{lawyer.accepted}}</td>
                                                <td class="text-center">{{lawyer.count + lawyer.accepted}}</td>
                                            </tr>
                                        </tbody>
                                    </table><br>
                                </div>
    <br><br>
                                <div class="row">
                                    <h5>Top {{no}} Legal Practice (<span v-if="selected == 'Daily'">{{(from != '') ? from : today}}</span><span v-if="selected == 'Date Range'">{{from}} to {{to}}</span> <span v-if="selected == 'Monthly'"> {{months[month.replace(/^0+/, '')-1]}} - {{yearr}}</span> <span v-if="selected == 'Anually'">{{yearr}}</span>)</h5>
                                    <table class="table table-striped" style="min-width: 100%;">
                                        <thead>
                                            <tr>
                                                <th>Rank </th>
                                                <th class="text-center">Legal Practice</th>
                                                <th class="text-center">No. of Appointments</th>
                                                <th class="text-center">Lawyer Most Appointed on Legal Practice</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(legal,index) in legals" v-bind:key="legal.id" >
                                                <td >{{index + 1}}</td>
                                                <td class="text-center">{{legal.legalpractice}}</td>
                                                <td class="text-center">{{legal.count}}</td>
                                                <td class="text-center">{{ legal.lawyer }}</td>
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
</template>

<script>
import html2PDF from 'jspdf-html2canvas';
export default {
    data() {
        return {
            currentUrl: window.location.origin,
            errors: [],
            pagination: {},
            lawyers: [],
            legals : [],
            status: 'All',
            from: '',
            to:'',
            selected : 'Daily',
            month:("0" + ((new Date()).getMonth() + 1)).slice(-2),
            yearr: new Date().getFullYear(),
            months : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
             today:new Date().toISOString().slice(0, 10),
             no : 5
        }
    },

     created(){
        this.fetch();
        this.fetch2();
    },

     watch: {
        from: function () {
            (this.to != '' && this.from != '') ? this.type(): '';
            (this.selected == 'Daily' && this.from != '') ? this.type() : ''; 
        },

        to: function () {
            (this.to != '' && this.from != '') ? this.type(): '';
        },

        month: function(){
            this.type();
        },

        yearr: function(){
            this.type();
        },

        no: function(){
            this.type();
        },

        selected: function(){
            this.type();
        },

       
    },

  
    methods : {

        type(){
            this.fetch();
            this.fetch2();
        },

        fetch() { 
             axios.post(this.currentUrl+'/request/reports',{
                selected : this.selected,
                month: this.month,
                year: this.yearr,
                from: this.from,
                to: this.to
            })
            .then(response => {
                this.legals = response.data;
            })
            .catch(err => console.log(err));
        },   
         
        fetch2() {
             axios.post(this.currentUrl+'/request/reports2',{
                selected : this.selected,
                month: this.month,
                year: this.yearr,
                from: this.from,
                to: this.to,
                no: this.no
            })
            .then(response => {
                this.lawyers = response.data.data;
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
        }
    }, components : { html2PDF}
}
</script>

<style>
    .has-error small{
        color: red;
        font-size: 12px;
    }
    .has-error input{
        border-color: red;
    }
    .test {
        margin-left: 10px; 
        background-color:red;
    }
    .ins {
        background-color: #F8FBFE;
        border: 1px solid #eee;
        min-height: 180px;
        text-align:left;     
        padding: 20px;   
    }
    .ins h2{
        font-size:  50px;
        margin-top: -10px;
    }
    .ins2 {
        background-color: #F8FBFE;
        border: 1px solid #eee;
        min-height: 200px;
        text-align:left;     
        padding: 20px;   
    }
    .ins2 h2{
        font-size:  50px;
        margin-top: -10px;
    }
</style>