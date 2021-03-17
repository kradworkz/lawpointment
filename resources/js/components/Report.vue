<template>
    <div class="col-md-12">
        <div class="row">
            <div class="col-md-3">
                <div class="card">
                    <div class="page-header card" style="margin-top: 20px; margin-left: 20px;">
                        <div class="page-header-title">
                            <i class="feather icon-home bg-c-blue"></i>
                            <div class="d-inline">
                                <h5>Reports</h5>
                                <span>List of generated reports</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-block email-card">
                        <div class="user-body">
                           <ul class="page-list nav nav-tabs flex-column" role="tablist">
                                <li class="nav-item mail-section" @click="insight">
                                    <a class="nav-link waves-effect d-block active" data-toggle="pill" role="tab">
                                        <i class="icofont icofont-inbox"></i> Insights
                                    </a>
                                </li>
                                <li class="nav-item mail-section" @click="report">
                                    <a class="nav-link waves-effect d-block" data-toggle="pill" href="#e-starred" role="tab">
                                        <i class="icofont icofont-star"></i> Reports
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-9">
                <div class="card">
                    <div class="card-block email-card">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="custom-form">
                                        <select  @click="type" v-model="selected" placeholder="Summary">
                                            <option value="Daily">Daily</option>
                                            <option value="Weekly">Weekly</option>
                                            <option value="Monthly">Monthly</option>
                                            <option value="Anually">Anually</option>
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="show == false">
                                <div class="row">
                                    <div class="col-md-4 ins" v-for="(insight,index) in ins.title" v-bind:key="insight.id">
                                        <b style="font-weight: bold; font-size: 14px;">{{insight}}</b>
                                        <p style="font-size: 12px; opacity: .7"> {{ ins.date }} </p>
                                        <h2 style="font-weight: bold; font-size: 30px;" v-if="index == 3 || index == 4 || index == 5"> {{ ins.count[index] }} </h2>
                                        <h2 v-else> {{ ins.count[index] }} </h2>
                                        <p style="font-size: 12px; opacity: .7">{{ ins.def[index] }}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6"><br>
                                        <ul class="scroll-list cards" >
                                            <li>
                                                <span style="float: right; opacity: 0.5;">#</span> 
                                                <h6 class="icon-btn"> &nbsp;TOP 5 MOST PICKED LAWYER</h6>
                                            </li>
                                            <li v-for="lawyer in lawyers" v-bind:key="lawyer.id">
                                                <span style="float: right; opacity: 0.5;">{{ lawyer.count}}</span> 
                                                <h6 class="icon-btn"><i class="fa fa-map-marker text-primary"></i> &nbsp;{{lawyer.lawyer}}</h6>
                                            </li>
                                        </ul>
                                    </div>

                                    <div class="col-md-6"><br>
                                        <ul class="scroll-list cards">
                                            <li>
                                                <span style="float: right; opacity: 0.5;">#</span> 
                                                <h6 class="icon-btn"> &nbsp;TOP 5 MOST PICKED LEGAL PRACTICE</h6>
                                            </li>
                                            <li v-for="legal in legals" v-bind:key="legal.id">
                                                <span style="float: right; opacity: 0.5;">{{ legal.count}}</span> 
                                                <h6 class="icon-btn"><i class="fa fa-map-marker text-primary"></i> &nbsp;{{legal.legalpractice}}</h6>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                    <table class="table table-striped" style="min-width: 100%; ">
                                        <thead>
                                            <tr>
                                                <th class="text-center">Client</th>
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
export default {
    data() {
        return {
            currentUrl: window.location.origin,
            errors: [],
            pagination: {},
            dates: [],
            ins: [],
            appointments: [],
            lawyers : [],
            legals : [],
            selected : 'Weekly',
            show : false,
            month: '',
            yearr: ''
        }
    },

     created(){
        this.fetchInsights();
        this.fetchReport1();
        this.fetchReport2();
    },

    methods : {
        type(){
            
              if(this.selected != 'Monthly'){
                this.month = '';
            }

            if(this.selected != 'Yearly'){
                this.year = '';
            }
            if(this.show == true){
                this.fetch();
            }else{
                this.fetchInsights();
                this.fetchReport1();
                this.fetchReport2();
            }
        },

        fetch(){
            axios.post(this.currentUrl + '/request/myreportss',{
                selected : this.selected,
                month: this.month,
                year: this.yearr
            })
            .then(response => {
                this.appointments = response.data.data;
            })
            .catch(err => console.log(err));
        },

        fetchReport1(){
            axios.post(this.currentUrl+'/request/reports',{
                selected : this.selected,
                month: this.month,
                year: this.yearr
            })
            .then(response => {
                this.legals = response.data.data;
            })
            .catch(err => console.log(err));
        },   
        
         fetchReport2(){
            axios.post(this.currentUrl+'/request/reports2',{
                selected : this.selected,
                month: this.month,
                year: this.yearr
            })
            .then(response => {
                this.lawyers = response.data.data;
            })
            .catch(err => console.log(err));
        },   

        fetchInsights() {
            axios.post(this.currentUrl+'/request/insights',{
                selected : this.selected,
                month: this.month,
                year: this.yearr
            })
            .then(response => {
                this.ins = response.data[0];
            })
            .catch(err => console.log(err));
        },    

        insight(){
            this.show = false;
        },  

        report(){
            this.show = true;
            this.fetch();
        }
    }
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