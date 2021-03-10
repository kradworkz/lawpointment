<template>
    <div class="col-md-12">
        <div class="row">
            <div class="col-md-3">
                <div class="card">
                    <div class="page-header card" style="margin-top: 20px; margin-left: 20px;">
                        <div class="page-header-title">
                            <i class="feather icon-home bg-c-blue"></i>
                            <div class="d-inline">
                                <h5>Clients</h5>
                                <span>List of Clients</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-block email-card">
                        <button class="btn waves-effect waves-light btn-info btn-sm btn-block" @click="newappointment">Add Client</button>
                    </div>
                </div>
            </div>
            <div class="col-md-9">
                <div class="card">
                    <div class="card-block email-card">
                        <div style="float:left; width: 350px;">
                            <form>
                                <div class="material-group">
                                    <div class="input-group">
                                        <span class="input-group-prepend">
                                            <label class="input-group-text "><i class="icofont icofont-search"></i></label>
                                        </span>
                                        <input type="text" class="form-control" placeholder="Search" v-model="keyword" @keyup="search">
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="tab-pane fade show active">
                            <div class="mail-body">
                                <div class="mail-body-content">
                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead style="font-size: 12px;">
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Mobile no.</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="user in users" v-bind:key="user.id">
                                                    <td><a class="email-name waves-effect">{{user.firstname}} {{user.lastname}}</a></td>
                                                    <td style="font-size: 12px;">{{user.email}}</td>
                                                    <td style="font-size: 12px;">{{user.mobile}}</td>
                                                    <td>
                                                        <a @click="viewuser(user)"><i class="icon feather icon-eye f-w-600 f-16 m-r-15 text-c-blue" data-modal="modal-1"></i></a>
                                                        <a @click="edituser(user)"><i class="icon feather icon-edit f-w-600 f-16 m-r-15 text-c-green"></i></a>
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
                        <form class="md-float-material form-material" @submit.prevent="create">
                            <div class="modal-header">
                                <h4 v-if="edit == true" class="modal-title">Edit Client</h4>
                                <h4 v-else class="modal-title">New Client</h4>
                                <button @click="clear" type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                               
                                <div class="card-block profile-edit-container">
                                    <div class="row">
                                        <div class="col-md-12" style="margin-top: 25px;">
                                            <div class="form-group row">
                                                <div class="col-md-6">
                                                    <div class="custom-form no-icons">
                                                        <input type="text" v-model="user.firstname" class="form-control fill">
                                                        <label class="float-label">Firstname <code style="color: red;"
                                                                v-if="errors.firstname">({{ errors.firstname[0] }})</code></label>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="custom-form no-icons">
                                                        <input type="text" v-model="user.lastname" class="form-control fill">
                                                        <label class="float-label">Lastname<code style="color: red;"
                                                                v-if="errors.lastname">({{ errors.lastname[0] }})</code></label>
                                                    </div>
                                                </div>
                                            </div>


                                            <div class="row" style="margin-top: -15px;">
                                                <div class="col-md-6">
                                                    <div class="custom-form no-icons">
                                                        <input type="text" v-model="user.email" class="form-control fill">
                                                        <label class="float-label">Email <code style="color: red;" v-if="errors.email">({{ errors.email[0] }})</code></label>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="custom-form no-icons">
                                                        <input type="date" v-model="user.birthday" placeholder="Date Example : 09/12/2019" class="form-control fill">
                                                        <label class="float-label">Birth Date <span v-if="errors.birthday" style="color: red; font-size: 12px;"> ({{ errors.birthday[0] }})</span></label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <div class="col-md-6">
                                                    <div class="custom-form no-icons">
                                                        <input type="text" v-model="user.mobile" class="form-control fill">
                                                        <label class="float-label">Mobile <code style="color: red;"
                                                                v-if="errors.mobile">({{ errors.mobile[0] }})</code></label>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="custom-form no-icons">
                                                        <input type="text" v-model="user.address" class="form-control fill">
                                                        <label class="float-label">Address<code style="color: red;"
                                                                v-if="errors.address">({{ errors.address[0] }})</code></label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row">
                                               
                                                <div class="col-md-6" style="margin-top: -40px;">
                                                    <div class="custom-form">
                                                        <div class="form-radio" style="margin-top: 40px;">
                                                            <div class="radio radiofill radio-primary radio-inline">
                                                                <label>
                                                                    <input type="radio" value="Male" checked="checked"
                                                                        v-model="user.gender">
                                                                    <i style="margin-top: -45px;" class="helper"></i>Male
                                                                </label>
                                                            </div>

                                                            <div class="radio radiofill radio-danger radio-inline">
                                                                <label>
                                                                    <input type="radio" value="Female" checked="checked"
                                                                        v-model="user.gender">
                                                                    <i style="margin-top: -45px;" class="helper"></i>Female
                                                                </label>
                                                            </div>
                                                            <span v-if="errors.type"
                                                                style="color: red; font-size: 12px; margin-top: -20px;">
                                                                ({{ errors.gender[0] }})</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button @click="clear" type="button" class="btn btn-default waves-effect " data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary waves-effect waves-light ">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="modal fade show" id="view" tabindex="-1" role="dialog" style="margin-top: 40px;">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">View Client</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="card-block profile-edit-container">
                                <div class="row">
                                    
                                    <div class="col-xl-4">
                                        <div class="card dashboard text-white bg-warning o-hidden h-100">
                                            <div class="card-body">
                                                <div class="mr-5"><h5>{{this.user.pending}} Pending Appointments</h5></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-4">
                                        <div class="card dashboard text-white bg-success o-hidden h-100">
                                            <div class="card-body">
                                            <div class="mr-5"><h5>{{this.user.cancelled}} Cancelled Appointments</h5></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-4">
                                        <div class="card dashboard text-white bg-danger o-hidden h-100">
                                            <div class="card-body">
                                            <div class="mr-5"><h5>{{this.user.finished}} Finished Appointments</h5></div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default waves-effect " data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import myUpload from 'vue-image-crop-upload/upload-2.vue';
import Multiselect from 'vue-multiselect'
export default {
    data() {
        return {
            currentUrl: window.location.origin,
            errors: [],
            pagination: {},
            users : [],
            user: {
                id: '',
                firstname: '',
                lastname: '',
                gender: '',
                birthday: '',
                mobile: '',
                address: '',
                avatar: '',
                email: '',
                password: '',
                password_confirmation :'',
            },
            keyword: '',
            edit: false
        }
    },

    created()
    {
        this.fetch();
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

        fetch(page_url){
            let vm = this;
            page_url = page_url || this.currentUrl + '/request/clients';

            axios.get(page_url)
            .then(response => {
                this.users = response.data.data;
                vm.makePagination(response.data.meta, response.data.links);
            })
            .catch(err => console.log(err));
        },

        edituser(user){
            this.edit = true;
            this.user.id = user.id;
            this.user.email = user.email;
            this.user.avatar = user.avatar;
            this.user.firstname = user.firstname;
            this.user.lastname = user.lastname;
            this.user.mobile = user.mobile;
            this.user.address = user.address;
            this.user.birthday = user.birthday;
            this.user.gender = user.gender;
            $('#create').modal('show');
        },

        viewuser(user){
            this.user = user;
            $('#view').modal('show');
        },

        search(){
            axios.post(this.currentUrl + '/request/client/search', {
                word: this.keyword,
            })
            .then(response => {
                this.users = response.data.data;
            })
            .catch(error => {
                if (error.response.status == 422) {
                    this.errors = error.response.data.errors;
                }
            });
        },

        clear(){
            this.user = {};
            this.edit = false;
             $('#create').modal('hide');
        },

        newappointment(){
             $('#create').modal('show');
        },

        create() {
            if (this.edit === false) {
                axios.post(this.currentUrl + '/request/client/store', {
                    firstname: this.user.firstname,
                    lastname: this.user.lastname,
                    email: this.user.email,
                    gender: this.user.gender,
                    birthday: this.user.birthday,
                    mobile: this.user.mobile,
                    address: this.user.address
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
            } else {
                axios.put(this.currentUrl + '/request/client/store', {
                    id: this.user.id,
                    firstname: this.user.firstname,
                    lastname: this.user.lastname,
                    email: this.user.email,
                    gender: this.user.gender,
                    birthday: this.user.birthday,
                    mobile: this.user.mobile,
                    address: this.user.address
                })
                .then(response => {
                    let page_url = '/request/users?page=' + this.pagination.current_page;
                    this.fetch(page_url);
                    this.clear();
                })
                .catch(error => {
                    if (error.response.status == 422) {
                        this.errors = error.response.data.errors;
                    }
                });
            }
        },

        edit(){

        }

    },

    components: { Multiselect, myUpload }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
    .fuzone {
        position: relative;
        border: 2px dashed #eee;
        border-radius: 3px;
        background: #f9f9f9;
        transition: all 0.3s linear;
        margin-bottom: 10px;
        margin-top: 5px;
        display: inline-block;
        width: 100%;
        min-height: 150px;
        margin-top: 20px;
        float: left;
        cursor: pointer;
    }

    .fuzone input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 100;
        cursor: pointer;
    }

    .fuzone .fu-text {
        text-align: center;
        margin: 120px 0;
        font-size: 12px;
        color: #98AAB8;
        position: relative;
    }

    .fuzone .fu-text i {
        font-size: 54px;
        width: 100%;
        padding-bottom: 10px;
        transition: all 0.3s linear;
    }

</style>
