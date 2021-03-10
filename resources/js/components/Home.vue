<template>
    <div class="col-md-12">
        <div class="row">
            <div class="col-md-3">
             
            </div>
            <div class="col-md-9">
                <div class="card">
                    <div class="card-block email-card">
                        <div class="col-md-12">
                            <div class="row">
                               
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
            lawyers : [],
            legals : [],
            selected : 'Weekly',
            show : false
        }
    },

     created(){
        this.fetchInsights();
    },

    methods : {
        type(){
           this.fetchInsights();
        },

        fetchReport1(page_url) {
            page_url = page_url || this.currentUrl+'/request/reports/'+this.selected;

            axios.get(page_url)
            .then(response => {
                this.legals = response.data.data;
            })
            .catch(err => console.log(err));
        },   
        
         fetchReport2(page_url) {
            page_url = page_url || this.currentUrl+'/request/reports2/'+this.selected;

            axios.get(page_url)
            .then(response => {
                this.lawyers = response.data.data;
            })
            .catch(err => console.log(err));
        },   

        fetchInsights(page_url) {
            page_url = page_url || this.currentUrl+'/request/insights/'+this.selected;

            axios.get(page_url)
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
            this.fetchReport1();
            this.fetchReport2();
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