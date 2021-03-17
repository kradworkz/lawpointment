<template>
    <div class="col-md-12">
        <div class="row">
            <div class="col-md-3">
                <div class="card">
                    <div class="page-header card" style="margin-top: 20px; margin-left: 20px;">
                        <div class="page-header-title">
                            <i class="feather icon-home bg-c-blue"></i>
                            <div class="d-inline">
                                <h5>Appointments</h5>
                                <span>List of Appointment</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-block email-card">
                        <button class="btn waves-effect waves-light btn-info btn-sm btn-block"
                            @click="newappointment">Create Appointment</button><br><br>
                        <div class="user-body">
                            <ul class="page-list nav nav-tabs flex-column" role="tablist">
                                <li class="nav-item mail-section" @click="walkin">
                                    <a class="nav-link waves-effect d-block active" data-toggle="pill" role="tab">
                                        <i class="icofont icofont-inbox"></i> Walkin Appointments
                                    </a>
                                </li>
                                <li class="nav-item mail-section" @click="withhout">
                                    <a class="nav-link waves-effect d-block" data-toggle="pill" href="#e-starred"
                                        role="tab">
                                        <i class="icofont icofont-star"></i> Without Lawyer <span
                                            class="label label-primary float-right">{{count}}</span>
                                    </a>
                                </li>
                                <li class="nav-item mail-section" @click="withh">
                                    <a class="nav-link waves-effect d-block " data-toggle="pill" role="tab">
                                        <i class="icofont icofont-inbox"></i> With Lawyer
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
                        <div class="row">
                            <div class="col-md-4" style="float:left; width: 350px;">
                                <form>
                                    <div class="material-group">
                                        <div class="input-group">
                                            <span class="input-group-prepend">
                                                <label class="input-group-text "><i
                                                        class="icofont icofont-search"></i></label>
                                            </span>
                                            <input type="text" class="form-control" placeholder="Search"
                                                v-model="keyword" @keyup="search">
                                        </div>
                                    </div>
                                </form>

                            </div>
                            <div class="col-md-8">
                                <div class="row">
                                    <div class="col-md-5">
                                        <div class="custom-form no-icons">
                                            <input type="date" v-model="from" placeholder="Date Example : 09/12/2019"
                                                class="form-control fill">
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                        <div class="custom-form no-icons">
                                            <input type="date" v-model="to" placeholder="Date Example : 09/12/2019"
                                                class="form-control fill">
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <multiselect v-model="status" :options="options" placeholder="Select Status"
                                            :show-labels="false" @input="onChange">
                                        </multiselect>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade show active">
                            <div class="mail-body">
                                <div class="mail-body-content">
                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead style="font-size: 12px;">
                                                <tr>
                                                    <th>Client</th>
                                                    <th>Lawyer</th>
                                                    <th>Title</th>
                                                    <th>Booking Date</th>
                                                    <th>Scheduled at</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="appointment in appointments" v-bind:key="appointment.id">
                                                    <td><a class="email-name waves-effect">{{appointment.client}}</a>
                                                    </td>
                                                    <td><a
                                                            class="email-name waves-effect">{{appointment.lawyer_name}}</a>
                                                    </td>
                                                    <td><a class="email-name waves-effect">{{appointment.title}}</a>
                                                    </td>
                                                    <td style="font-size: 12px;">{{appointment.created_at}}</td>
                                                    <td style="font-size: 12px;">{{appointment.scheduled_at}}</td>
                                                    <td>
                                                        <span v-if="appointment.status == 'Pending'">
                                                            <label
                                                                v-if="appointment.legalpractice != 'No Legal Practice'"
                                                                class="label label-md label-warning">Pending</label>
                                                            <label v-else class="label label-md label-danger"
                                                                @click="set(appointment.id)">Set Attorney</label>
                                                        </span>

                                                        <label v-else-if="appointment.status == 'Accepted'"
                                                            class="label label-md label-info">Accepted</label>
                                                        <label v-else-if="appointment.status == 'Cancelled'"
                                                            class="label label-md label-danger">Cancelled</label>
                                                        <label v-else
                                                            class="label label-md label-success">Finished</label>
                                                    </td>
                                                    <td>
                                                        <a @click="viewappointment(appointment)"><i
                                                                class="icon feather icon-eye f-w-600 f-16 m-r-15 text-c-blue"
                                                                data-modal="modal-1"></i></a>
                                                        <!-- <a><i class="icon feather icon-edit f-w-600 f-16 m-r-15 text-c-green"></i></a> -->
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div class="card-block">
                                            <nav aria-label="Page navigation example">
                                                <ul class="pagination justify-content-end">
                                                    <li class="page-item">
                                                        <a class="page-link"
                                                            v-bind:class="[{disabled: !pagination.prev_page_url}]"
                                                            @click="fetch(pagination.prev_page_url)" href="#"
                                                            aria-label="Previous">
                                                            <span aria-hidden="true">«</span>
                                                            <span class="sr-only">Previous</span>
                                                        </a>
                                                    </li>
                                                    <li class="page-item"><a class="page-link" href="#">Page
                                                            {{ pagination.current_page }}
                                                            of {{ pagination.last_page }}</a></li>
                                                    <li class="page-item">
                                                        <a class="page-link"
                                                            v-bind:class="[{disabled: !pagination.next_page_url}]"
                                                            @click="fetch(pagination.next_page_url)" href="#"
                                                            aria-label="Next">
                                                            <span aria-hidden="true">»</span>
                                                            <span class="sr-only">Next</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade show" id="create" tabindex="-1" role="dialog" style="margin-top: 40px;">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <form class="md-float-material form-material" @submit.prevent="setAppointment">
                            <div class="modal-header">
                                <h4 class="modal-title">New Appointment</h4>
                                <button @click="clear" type="button" class="close" data-dismiss="modal"
                                    aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div class="modal-body">
                                <div class="card-block profile-edit-container">
                                    <div class="form-group row" style="margin-top: 20px;">
                                        <div class="col-md-12">
                                            <div class="form-group form-primary">
                                                <multiselect :custom-label="nameWithLang2" v-model="client"
                                                    :options="clients" placeholder="Select Client" label="name"
                                                    track-by="id">
                                                </multiselect>
                                                <label class="float-label"
                                                    v-bind:style="errors.clients ? 'color: red' : ''">Client</label>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group form-primary">
                                                <multiselect @input="onChangeSpecialization(legalpractice)"
                                                    v-model="legalpractice" :options="legalpractices"
                                                    placeholder="Select Legal Practices" label="name" track-by="id">
                                                </multiselect>
                                                <label class="float-label"
                                                    v-bind:style="errors.legalpractices ? 'color: red' : ''">Specialization</label>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group form-primary">
                                                <multiselect :custom-label="nameWithLang" v-model="lawyer"
                                                    :options="lawyers" placeholder="Select Lawyer" label="name"
                                                    track-by="id">
                                                </multiselect>
                                                <label class="float-label"
                                                    v-bind:style="errors.lawyers ? 'color: red' : ''">Lawyer</label>
                                            </div>
                                        </div>

                                        <div class="col-md-12" style="margin-top: 10px;">
                                            <div class="custom-form no-icons">
                                                <input type="text" v-model="title" class="form-control fill">
                                                <label class="float-label">Title <code style="color: red;"
                                                        v-if="errors.title">({{ errors.title[0] }})</code></label>
                                            </div>
                                        </div>

                                        <div class="col-md-12" style="margin-top: -10px;">
                                            <div class="custom-form">
                                                <label>Description <span v-if="errors.details"
                                                        style="color: red; font-size: 12px;">
                                                        ({{ errors.details[0] }})</span></label>
                                                <textarea v-model="details" id="info" cols="30" rows="2"
                                                    placeholder=""></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="modal-footer">
                                <button @click="clear" type="button" class="btn btn-default waves-effect "
                                    data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary waves-effect waves-light ">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="modal fade show" id="set" tabindex="-1" role="dialog" style="margin-top: 40px;">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <form class="md-float-material form-material" @submit.prevent="setLawyer">
                            <div class="modal-header">
                                <h4 class="modal-title">Set Lawyer</h4>
                                <button @click="clear" type="button" class="close" data-dismiss="modal"
                                    aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div class="modal-body">
                                <div class="card-block profile-edit-container">
                                    <div class="form-group row" style="margin-top: 20px;">
                                        <div class="col-md-12">
                                            <div class="form-group form-primary">
                                                <multiselect @input="onChangeSpecialization(legalpractice)"
                                                    v-model="legalpractice" :options="legalpractices"
                                                    placeholder="Select Legal Practices" label="name" track-by="id">
                                                </multiselect>
                                                <label class="float-label"
                                                    v-bind:style="errors.legalpractices ? 'color: red' : ''">Specialization</label>
                                            </div>
                                            <div class="form-group form-primary">
                                                <multiselect :custom-label="nameWithLang" v-model="lawyer"
                                                    :options="lawyers" placeholder="Select Lawyer" label="name"
                                                    track-by="id">
                                                </multiselect>
                                                <label class="float-label"
                                                    v-bind:style="errors.lawyers ? 'color: red' : ''">Lawyer</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="modal-footer">
                                <button @click="clear" type="button" class="btn btn-default waves-effect "
                                    data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary waves-effect waves-light ">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="modal fade show" id="viewapp" tabindex="-1" role="dialog" style="margin-top: 40px;">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <form class="md-float-material form-material" @submit.prevent="setLawyer">
                            <div class="modal-header">
                                <h4 class="modal-title">View Appointment</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div class="modal-body" v-if="n == false && f == false">
                                <div class="card-block">
                                    <div class="row">
                                        <div class="col-4">
                                            <p class="text-muted m-b-5">Legal Practice</p>
                                            <h6>{{app.legalpractice}}</h6>
                                        </div>
                                        <div class="col-4">
                                            <p class="text-muted m-b-5">Status</p>
                                            <h6>{{app.status}}</h6>
                                        </div>
                                        <div class="col-4">
                                            <p class="text-muted m-b-5">Schedule</p>
                                            <h6>{{app.scheduled_at}}</h6>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                                <div class="card-block profile-edit-container">
                                    <h5>{{app.title}}</h5>
                                    <p>{{app.details}}</p>
                                </div>
                                <hr>
                                <button type="button" class="btn btn-default waves-effect" @click="opennotes(app.notes)"> Notes</button>
                                <button type="button" class="btn btn-default waves-effect"  @click="openfiles(app.files)"> Files</button>
                            </div>
                            <div class="modal-body" v-if="n == true"> 
                                 <ul class="basic-list">
                                    <li class="" v-for="note in notes" v-bind:key="note.id">
                                        <h6>{{note.created_at}}</h6>
                                        <p>{{note.note}}</p>
                                    </li>
                                </ul>
                            </div>
                             <div class="modal-body" v-if="f == true"> 
                                 <ul class="basic-list">
                                    <li class="" v-for="file in files" v-bind:key="file.id">
                                        <h6>{{file.created_at}}</h6>
                                        <a :href="currentUrl+'/images/files/'+file.file" target="_blank">{{file.file}}</a>
                                    </li>
                                </ul>
                            </div>


                            <div class="modal-footer">
                                 <button v-if="n == true || f == true" type="button" class="btn btn-warning waves-effect" @click="backk">Back</button>
                                <button type="button" class="btn btn-default waves-effect "
                                    data-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            




        </div>
    </div>
</template>

<script>
    import Multiselect from 'vue-multiselect';
    export default {
        data() {
            return {
                currentUrl: window.location.origin,
                errors: [],
                pagination: {},
                appointments: [],
                clients: [],
                client: '',
                lawyers: [],
                lawyer: '',
                legalpractices: [],
                legalpractice: '',
                title: '',
                details: '',
                keyword: '',
                edit: false,
                appointment: '',
                app: '',
                type: 'walkin',
                count: '',
                options: ['All', 'Pending', 'Accepted', 'Finished', 'Cancelled'],
                status: 'All',
                from: '',
                to: '',
                notes: [],
                files: [],
                n : false,
                f : false
            }
        },

        watch: {
            from: function () {
                (this.to != '' && this.from != '') ? this.search(): '';
            },

            to: function () {
                (this.to != '' && this.from != '') ? this.search(): '';
            }
        },

        created() {
            this.fetch();
            this.fetchLegalpractice();
            this.fetchClient();
            this.fetchCount();
        },

        methods: {
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

            nameWithLang({
                firstname,
                lastname,
                numberofapp
            }) {
                return `${firstname} ${lastname} | Appointments : ${numberofapp}`;
            },

            nameWithLang2({
                firstname,
                lastname
            }) {
                return `${firstname} ${lastname}`;
            },

            fetch(page_url) {
                let vm = this;
                page_url = page_url || this.currentUrl + '/request/appointments/lists/' + this.type;

                axios.get(page_url)
                    .then(response => {
                        this.appointments = response.data.data;;
                        vm.makePagination(response.data.meta, response.data.links);
                    })
                    .catch(err => console.log(err));
            },

            fetchCount(page_url) {
                let vm = this;
                page_url = page_url || this.currentUrl + '/request/appointments/lists/without';

                axios.get(page_url)
                    .then(response => {
                        this.count = response.data.data.length;
                    })
                    .catch(err => console.log(err));
            },


            fetchClient() {
                axios.get(this.currentUrl + '/request/clientss')
                    .then(response => {
                        this.clients = response.data.data;
                    })
                    .catch(err => console.log(err));
            },

            fetchLegalpractice() {
                axios.get(this.currentUrl + '/request/dropdown/' + 'Legal Practice')
                    .then(response => {
                        this.legalpractices = response.data.data;
                    })
                    .catch(err => console.log(err));
            },

            onChangeSpecialization(legalpractice) {
                this.fetchLawyer();
            },

            fetchLawyer() {
                let vm = this;
                axios.post(this.currentUrl + '/request/user/search', {
                        word: this.keyword,
                        type: this.legalpractice.id
                    })
                    .then(response => {
                        this.lawyers = response.data.data;
                        vm.makePagination(response.data.meta, response.data.links);
                    })
                    .catch(err => console.log(err));
            },

            setAppointment() {
                axios.post(this.currentUrl + '/request/appointment/walkin', {
                        legalpractice: this.legalpractice.id,
                        lawyer: this.lawyer.id,
                        client: this.client.id,
                        title: this.title,
                        details: this.details
                    })
                    .then(response => {
                        this.fetch();
                        this.clear();
                    })
                    .catch(error => {
                        if (error.response.status == 422) {
                            this.errors = error.response.data.errors;
                        }
                    });
            },

            setLawyer() {
                axios.post(this.currentUrl + '/request/appointment/setatty', {
                        id: this.appointment,
                        lawyer: this.lawyer.id,
                        legalpractice: this.legalpractice.id,
                    })
                    .then(response => {
                        this.fetch();
                        this.clear();
                        $('#set').modal('hide');
                    })
                    .catch(error => {
                        if (error.response.status == 422) {
                            this.errors = error.response.data.errors;
                        }
                    });
            },

            search() {
                let vm = this;
                axios.post(this.currentUrl + '/request/appointment/search', {
                        word: this.keyword,
                        type: this.type,
                        from: this.from,
                        to: this.to,
                        status: this.status
                    })
                    .then(response => {
                        this.appointments = response.data.data;;
                        vm.makePagination(response.data.meta, response.data.links);
                    })
                    .catch(error => {
                        if (error.response.status == 422) {
                            this.errors = error.response.data.errors;
                        }
                    });
            },

            clear() {
                this.edit = false;
                this.title = '';
                this.details = '';
                this.lawyer = '';
                this.client = '';
                this.legalpractice = '';
                $('#create').modal('hide');
            },

            newappointment() {
                $('#create').modal('show');
            },

            withh() {
                this.type = 'with'
                this.fetch();
            },

            withhout() {
                this.type = 'without'
                this.fetch();
            },

            walkin() {
                this.type = 'walkin'
                this.fetch();
            },

            set(id) {
                this.appointment = id;
                $('#set').modal('show');
                this.fetchLawyer();
            },

            viewappointment(appointment) {
                this.app = appointment;
                $('#viewapp').modal('show');
            },

            onChange() {
                this.search();
            },

            opennotes(notes){
                this.n = true;
                this.f = false;
                this.notes = notes;
            },

            openfiles(files){
                this.n = false;
                this.f = true;
                this.files = files;
            },

            backk(){
                this.n = false;
                this.f = false;
            }

        },

        components: {
            Multiselect
        }
    }

</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
