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
                        <div id="section_1" >
                            <div class="box_general">
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
                                        <div class="col-md-9">
                                            <button @click="generateReport" style="float: right;">Print</button>
                                        </div>
                                    </div>
                                </div><br>
                                <div class="col-md-12" ref="html2Pdf">
                                     <div class="row" v-if="user == 'Lawyer'">
                                        <div class="col-md-4 ins" v-for="(insight,index) in ins.title" v-bind:key="insight.id">
                                            <b style="font-weight: bold; font-size: 14px;">{{insight}}</b>
                                            <p style="font-size: 12px; opacity: .7"> {{ ins.date }} </p>
                                            <h2 style="font-weight: bold; font-size: 30px;" v-if="index == 3 || index == 4 || index == 5"> {{ ins.count[index] }} </h2>
                                            <h2 v-else> {{ ins.count[index] }} </h2>
                                            <p style="font-size: 12px; opacity: .7">{{ ins.def[index] }}</p>
                                        </div>
                                        <br>
                                    </div>
                                    <br>
                                    <table class="table table-striped" style="min-width: 100%; ">
                                        <thead>
                                            <tr>
                                                <th class="text-center" v-if="user == 'Lawyer'">Client</th>
                                                <th class="text-center" v-else>Lawyer</th>
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


</template>
<script>
import VueHtml2pdf from 'vue-html2pdf';
import html2PDF from 'jspdf-html2canvas';
export default {
    props : ['user'],
    data(){
        return {
            currentUrl: window.location.origin,
            errors: [],
            pagination: {},
            keyword: '',
            dates: [],
            lawyers : [],
            legals : [],
            appointments : [],
            ins: [],
            selected : 'Weekly',
            show : false
        }
    },

    created(){
        this.fetch();
        this.fetchInsights();
    },

    methods : {
        type(){
           this.fetchInsights();
           this.fetch();
        },
        fetch(){
            axios.get(this.currentUrl + '/request/myreports/'+this.selected)
            .then(response => {
                this.appointments = response.data.data;
            })
            .catch(err => console.log(err));
        },

        fetchInsights(page_url) {
            page_url = page_url || this.currentUrl+'/request/myreports/insights/'+this.selected;

            axios.get(page_url)
            .then(response => {
                this.ins = response.data[0];
            })
            .catch(err => console.log(err));
        },    

        generateReport () {
            html2PDF(this.$refs.html2Pdf, {
                margin: 2,
                filename: 'document.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 4, dpi: 192, letterRendering: true },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
            })
        },

        search(){

        }
    }, components : {  VueHtml2pdf, html2PDF}
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
        font-size:  30px;
        margin-top: -10px;
    }
    .ins2 {
        background-color: #F8FBFE;
        border: 1px solid #eee;
        min-height: 200px;
        text-align:left;     
        padding: 10px;   
    }
    .ins2 h2{
        font-size:  30px;
        margin-top: -10px;
    }
</style>