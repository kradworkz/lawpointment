<template>
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h5>Client Information</h5>
            </div>
            <div class="card-block profile-edit-container">
                <form class="md-float-material form-material" @submit.prevent="register">
                    <div class="row">
                        <div class="col-md-4">
                            <myUpload field="img" @crop-success="cropSuccess" v-model="photo.show" :width="500"
                                :height="500" :params="params" :headers="headers" lang-type="en" img-format="jpeg">
                            </myUpload>
                            <div @click="toggleShow" class="fuzone" style="width: 310px; height: 310px;">
                                <div v-if="photo.url != ''">
                                    <img :src="photo.url" style="width: 300px; height: 300x;">
                                </div>
                                <div v-else-if="user.avatar != '' && photo.url == '' && user.avatar != undefined">
                                    <img :src="currentUrl+'/images/avatars/'+user.avatar" style="width: 300px; height: 300px;">
                                </div>
                                <div v-else class="fu-text" @click="toggleShow">
                                    <span><i class="fa fa-picture"></i> Click here to upload<br> 
                                        <span v-if="errors.avatar" style="color: red; font-size: 12px; margin-top: -20px;">({{ errors.avatar[0] }})</span>
                                    </span>
                                </div>
                            </div>   
                        </div>

                        <div class="col-md-8">
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
                                        <input type="text" v-model="user.address" class="form-control fill">
                                        <label class="float-label">Address <code style="color: red;"
                                                v-if="errors.address">({{ errors.address[0] }})</code></label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="custom-form no-icons">
                                        <input type="text" v-model="user.mobile" class="form-control fill">
                                        <label class="float-label">Mobile<code style="color: red;"
                                                v-if="errors.mobile">({{ errors.mobile[0] }})</code></label>
                                    </div>
                                </div>
                            </div>

                            <div class="row" >
                                <div class="col-md-6">
                                    <div class="custom-form no-icons">
                                        <input type="date" v-model="user.birthday" placeholder="Date Example : 09/12/2019" class="form-control fill">
                                        <label class="float-label">Birth Date <span v-if="errors.birthday" style="color: red; font-size: 12px;"> ({{ errors.birthday[0] }})</span></label>
                                    </div>
                                </div>
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
                            <h4 class="sub-title">Login Information</h4>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="custom-form no-icons">
                                        <input type="text" v-model="user.email" class="form-control fill">
                                        <label class="float-label">Email <code style="color: red;" v-if="errors.email">({{ errors.email[0] }})</code></label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="custom-form no-icons">
                                        <input type="password" v-model="user.password" class="form-control fill">
                                        <label class="float-label">Password <code style="color: red;" v-if="errors.password">({{ errors.password[0] }})</code></label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="custom-form no-icons">
                                        <input type="password" v-model="user.password_confirmation" class="form-control fill">
                                        <label class="float-label">Re-enter Password <code style="color: red;" v-if="errors.password_confirmation">({{ errors.password[0] }})</code></label>
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
</template>
<script>
    import myUpload from 'vue-image-crop-upload/upload-2.vue';
    export default {
        data(){
            return {
                currentUrl: window.location.origin,
                errors: [],
                user: {
                    id: '',
                    firstname: '',
                    lastname: '',
                    gender: '',
                    birthday: '',
                    avatar: '',
                    email: '',
                    mobile: '',
                    password: '',
                    password_confirmation :'',
                },
                photo : {
                    show : false,
                    url : '',
                    signature: '',
                },
                params: {
                    token: '123456798',
                    name: 'avatar'
                },
                headers: {
                    smail: '*_~'
                },
            }
        },

        methods : {
            toggleShow() {
                this.photo.show = !this.photo.show;
            },

            cropSuccess(imgDataUrl, field) {
                this.photo.url = imgDataUrl;
            },

            register() {
                if(this.photo.url == ''){
                    Vue.$toast.error('<i class="feather icon-alert-triangle"></i> <strong>Please upload a Picture</strong>', {})
                }else{
                    this.errors = [];
                    axios.post(this.currentUrl + '/register', {
                        firstname: this.user.firstname,
                        lastname: this.user.lastname,
                        gender: this.user.gender,
                        birthday: this.user.birthday,
                        email: this.user.email,
                        mobile: this.user.mobile,
                        password: this.user.password,
                        password_confirmation : this.user.password_confirmation,
                        avatar : this.photo.url
                    })
                    .then(response => {
                        window.location.href = this.currentUrl + '/home';
                    })
                    .catch(error => {
                        if (error.response.status == 422) {
                            this.errors = error.response.data.errors;
                        }
                    });
                }
                
            },

            clear(){
                
            }
        },

        components: { myUpload }
    }

</script>
