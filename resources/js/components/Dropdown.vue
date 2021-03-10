<template>
    <div class="col-md-12">
        <div class="row">
            <div class="col-md-3">
                <div class="card">
                    <div class="page-header card" style="margin-top: 20px; margin-left: 20px;">
                        <div class="page-header-title">
                            <i class="feather icon-home bg-c-blue"></i>
                            <div class="d-inline">
                                <h5>Dropdowns</h5>
                                <span>Type of dropdowns</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-block email-card">
                        <div class="user-body">
                            <ul class="page-list nav nav-tabs flex-column" role="tablist">
                                <li class="nav-item mail-section" @click="legal">
                                    <a class="nav-link waves-effect d-block active" data-toggle="pill" role="tab">
                                        <i class="icofont icofont-inbox"></i> Legal Practices
                                    </a>
                                </li>
                                <li class="nav-item mail-section" @click="language">
                                    <a class="nav-link waves-effect d-block" data-toggle="pill" href="#e-starred" role="tab">
                                        <i class="icofont icofont-star"></i> Languages
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
                        <div style="float:left; width: 350px;">
                            <form>
                                <div class="material-group">
                                    <div class="input-group">
                                        <span class="input-group-prepend">
                                            <label class="input-group-text "><i
                                                    class="icofont icofont-search"></i></label>
                                        </span>
                                        <input type="text" class="form-control" placeholder="Search" name="" v-model="keyword"
                                            @keyup="search">
                                    </div>
                                </div>
                            </form>
                        </div>
                        <button @click="createlist" class="btn btn-sm waves-effect waves-light btn-danger"
                            style="margin-bottom: 10px; float:right;">
                            <i class="icofont icofont-people"></i>Create new  {{def}}
                        </button>
                        <div class="tab-pane fade show active">
                            <div class="mail-body">
                                <div class="mail-body-content">
                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead style="font-size: 12px;">
                                                <tr>
                                                    <th>Name</th>
                                                    <th class="text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-bind:class="[lists.status == 'Active' ? 'table-success' : '']"
                                                    v-for="l in lists" v-bind:key="l.id">
                                                    <td><a class="email-name waves-effect">{{l.name}}</a></td>
                                                    <!-- <td>
                                                        <label v-if="l.status == 'Active'" class="label label-md label-success">Active</label>
                                                        <label v-else class="label label-md label-warning">Inactive</label>
                                                    </td> -->
                                                 
                                                    <td class="text-right">
                                                        <a><i class="icon feather icon-eye f-w-600 f-16 m-r-15 text-c-blue" data-modal="modal-1"></i></a>
                                                        <a @click="editlist(l)"><i class="icon feather icon-edit f-w-600 f-16 m-r-15 text-c-green"></i></a>
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

            <div class="modal fade show" id="create" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <form class="md-float-material form-material" @submit.prevent="create">
                            <div class="modal-header">
                                <h4 v-if="edit == true" class="modal-title">Edit {{ def }}</h4>
                                <h4 v-else class="modal-title">New {{ def }}</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="card-block">
                                    <div class="form-group row profile-edit-container">
                                        <div class="col-md-12">
                                            <div class="custom-form">
                                                <label>{{ def }}<i class="fa fa-user"></i> <span v-if="errors.name" style="color: red; font-size: 12px;"> ({{ errors.name[0] }})</span></label>
                                                <input type="text" v-model="list.name" placeholder="Enter a name" style="text-transform: capitalize; margin-bottom: 8px;">
                                            </div>
                                            <div class="custom-form" v-if="def == 'Legal Practice'">
                                                <label>Description <span v-if="errors.description" style="color: red; font-size: 12px;"> ({{ errors.description[0] }})</span></label>
                                                <textarea v-model="list.description" id="info" cols="30" rows="2" placeholder=""></textarea>
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
            lists: [],
            list : {
                id: '',
                name: '',
                description: '',
            },
            keyword: '',
            edit: false,
            def : 'Legal Practice'
        }
    },

    created(){
        this.fetch();
    },

    // watch : {
    //     def : function(){
            
    //     }
    // },

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

        fetch(page_url) {
            let vm = this; 

            page_url = page_url || this.currentUrl + '/request/dropdowns';
            axios.post(page_url,{
                type : this.def
            })
            .then(response => {
                this.lists = response.data.data;;
                vm.makePagination(response.data.meta, response.data.links);
            })
            .catch(err => console.log(err));
        },

        create() {
            if (this.edit === false) {
               
               const form = new FormData();
                form.append('name', this.list.name);
                form.append('type', this.def);
                form.append('status', 'New');
                (this.def == "Legal Practice") ? form.append('description', this.list.description) : '';

                axios.post(this.currentUrl + '/request/dropdowns/store', form)
                .then(response => {
                    this.fetch();
                    this.clear();
                    $('#create').modal('hide');
                })
                .catch(error => {
                    if (error.response.status == 422) {
                        this.errors = error.response.data.errors;
                    }
                });

            } else {
                const form = new FormData();
                form.append('id', this.list.id);
                form.append('name', this.list.name);
                form.append('type', this.def);
                form.append('status', 'Update');
                (this.def == "Legal Practice") ? form.append('description', this.list.description) : '';

                axios.post(this.currentUrl + '/request/dropdowns/store', form)
                .then(response => {
                    let page_url = '/request/dropdowns?page=' + this.pagination.current_page;
                    this.fetch(page_url);
                    this.clear();
                    $('#create').modal('hide');
                        
                })
                .catch(error => {
                    if (error.response.status == 422) {
                        this.errors = error.response.data.errors;
                    }
                });
            }
        },

        editlist(list){
            this.edit = true;
            this.list.id = list.id;
            this.list.name = list.name;
            (this.def == 'Legal Practice') ? this.list.description = list.description : '';
            $('#create').modal('show');
        },

        legal(){
            this.def = 'Legal Practice';
            this.fetch();
        },

        language(){
            this.def = 'Language';
            this.fetch();
        },

        createlist(){
            $("#create").modal("show");
        },

        search(){
            let vm = this;
            axios.post(this.currentUrl + '/request/dropdown/search', {
                word: this.keyword,
                type: this.def
            })
            .then(response => {
                this.lists = response.data.data;
                vm.makePagination(response.data.meta, response.data.links);
            })
            .catch(err => console.log(err));
        },

        clear(){
            this.list = {};
            this.edit = false;
        }
    }
}
</script>