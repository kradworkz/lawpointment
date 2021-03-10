<template>
    <div class="card">
        <div class="card-block">
            
            <div class="profile-edit-header" style="margin-top: 30px;">
                <center v-if="success.length > 0">
					<div id="confirm">
                        <p class="text-success">{{success}}</p>
					</div>
                </center>
                <form @submit.prevent="changepassword">
                    <div class="form-group">
                        <label>Current Password</label>
                        <input type="password" class="form-control"  v-model="current_password" placeholder="Your password">
                    </div>
                    
                    <div class="form-group">
                        <label>Password <b v-if="errors.password" style="color: red; font-size: 12px;"> ({{ errors.password[0] }})</b></label>
                        <input type="password" class="form-control" v-model="password" placeholder="Your password">
                    </div>
                    <div class="form-group">
                        <label>Confirm password</label>
                        <input type="password" class="form-control" v-model="password_confirmation" placeholder="Confirm password">
                    </div>
                    
                    <div class="form-group text-center add_top_30">
                        <input class="btn_1" type="submit" value="Submit">
                    </div>
                    <p class="text-center"><small>Please don't share your password to anyone.</small></p>
                </form>
                
            </div>

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            currentUrl: window.location.origin,
            errors: [],
            current_password : '',
            password : '',
            password_confirmation: '',
            success : ''
        }
    },

    methods : {
        changepassword(){
            axios.post(this.currentUrl + '/request/changepassword', {
                current_password: this.current_password,
                password: this.password,
                password_confirmation: this.password_confirmation,
            })
            .then(response => {
                this.current_password = '';
                this.password = '';
                this.password_confirmation = '';
                this.errors = [];
                this.success = response.data.success;
            })
            .catch(error => {
                if (error.response.status == 422) {
                    this.errors = error.response.data.errors;
                } 
                
                if(error.response.status == 401){
                    Vue.$toast.error('<i class="feather icon-alert-triangle"></i> <strong>'+error.response.data.error+'</strong>', {});
                }
            });
        }
    }
}
</script>