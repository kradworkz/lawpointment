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
                                 <div class="col-md-6">
                                   <button class="btn btn-primary" @click="generateReport" style="float: right;">Print</button>
                                </div>
                            </div>
                            <div ref="html2Pdf" style="padding: 40px;">
                                <div class="row">
                                    <h5>Insights (<span v-if="selected == 'Daily'">{{(from != '') ? from : today}}</span><span v-if="selected == 'Date Range'">{{from}} to {{to}}</span> <span v-if="selected == 'Monthly'"> {{months[month.replace(/^0+/, '')-1]}} - {{yearr}}</span> <span v-if="selected == 'Anually'">{{yearr}}</span>)</h5>
                                <br>
                                </div>
                                <div class="row">
                                    <div class="col-md-4 ins" v-for="(insight,index) in ins.title" v-bind:key="insight.id">
                                        <b style="font-weight: bold; font-size: 14px;">{{insight}}</b>
                                        <p style="font-size: 12px; opacity: .7"> {{ ins.date }} </p>
                                        <h2 style="font-weight: bold; font-size: 30px;" v-if="index == 3 || index == 4 || index == 5"> {{ ins.count[index] }} </h2>
                                        <h2 v-else> {{ ins.count[index] }} </h2>
                                        <p style="font-size: 12px; opacity: .7">{{ ins.def[index] }}</p>
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
            status: 'All',
            from: '',
            to:'',
            selected : 'Daily',
            show : false,
            month:("0" + ((new Date()).getMonth() + 1)).slice(-2),
            yearr: new Date().getFullYear(),
            months : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            today:new Date().toISOString().slice(0, 10)
        }
    },

     created(){
        this.fetchInsights();
        // this.fetchReport1();
        // this.fetchReport2();
    },

     watch: {
        from: function () {
            (this.to != '' && this.from != '') ? this.fetchInsights(): '';
            (this.selected == 'Daily' && this.from != '') ? this.fetchInsights() : ''; 
        },

        to: function () {
            (this.to != '' && this.from != '') ? this.fetchInsights(): '';
        }
    },

    methods : {
        type(){
            this.fetchInsights();
        },

        fetchInsights() {
            axios.post(this.currentUrl+'/request/insights',{
                selected : this.selected,
                month: this.month,
                year: this.yearr,
                status: this.status,
                from: this.from,
                to: this.to
            })
            .then(response => {
                this.ins = response.data[0];
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