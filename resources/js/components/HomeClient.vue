<template>
    <div class="row">
        <!-- <section class="login-block offline-404">

            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12">

                        <div class="card auth-box">
                            <div class="card-block text-center">
                               <form class="md-float-material form-material">
                                    <h2 class="m-b-15 text-muted">Set your Appointment Now!</h2>
                                    <br><br>
                                    <div class="form-group form-primary" style="margin-top: -10px;">
                                        <multiselect v-model="legalpractice" :options="legalpractices" 
                                        placeholder="Select Legal Practices" label="name" track-by="id">
                                        </multiselect>
                                        <label class="float-label" v-bind:style="errors.legalpractices ? 'color: red' : ''">Legal Practices</label>
                                    </div>
                                    <a href="index.html" class="btn btn-inverse m-t-30">Back to Home</a>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section> -->
        <div class="col-xl-8 col-md-12">
            <div class="card sale-card">
                <div class="card-header">
                    <h5>Deals Analytics</h5>
                </div>
                <div class="card-block">
                    <div class="row">
                        <div class="col-sm-8">
                            <div id="allocation-map" class="chart-shadow" style="height:215px"></div>
                        </div>
                        <div class="col-sm-4">
                            <div id="allocation-chart" class="chart-shadow" style="height:215px"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-4 col-md-12">
            <div class="card prod-p-card card-red">
                <div class="card-body">
                    <div class="row align-items-center m-b-30">
                        <div class="col">
                            <h6 class="m-b-5 text-white">Total Profit</h6>
                            <h3 class="m-b-0 f-w-700 text-white">$1,783</h3>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-money-bill-alt text-c-red f-18"></i>
                        </div>
                    </div>
                    <p class="m-b-0 text-white"><span class="label label-danger m-r-10">+11%</span>From Previous Month
                    </p>
                </div>
            </div>
            <div class="card prod-p-card card-blue">
                <div class="card-body">
                    <div class="row align-items-center m-b-30">
                        <div class="col">
                            <h6 class="m-b-5 text-white">Total Orders</h6>
                            <h3 class="m-b-0 f-w-700 text-white">15,830</h3>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-database text-c-blue f-18"></i>
                        </div>
                    </div>
                    <p class="m-b-0 text-white"><span class="label label-primary m-r-10">+12%</span>From Previous Month
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Multiselect from 'vue-multiselect'
    export default {
        data() {
            return {
                currentUrl: window.location.origin,
                errors: [],
                legalpractices : [],
                legalpractice : '',
                user: {
                    id: '',
                    firstname: '',
                    lastname: '',
                    gender: '',
                    birthday: '',
                    avatar: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                },
            }
        },

        created(){
            this.fetchLegalpractice();
        },

        methods: {
            fetchLegalpractice() {
                axios.get(this.currentUrl + '/request/dropdown/' + 'Legal Practice')
                .then(response => {
                    this.legalpractices = response.data.data;
                })
                .catch(err => console.log(err));
            },
        },

        components: { Multiselect }

    }

</script>
