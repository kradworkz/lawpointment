<template>
    <div class="card">
        <div class="card-block">
            
            <div class="profile-edit-header" style="margin-top: 30px;">
               
                <toggle-button v-if="type == 'Lawyer'" @change="onChangeEventHandler" :value="yes" :font-size="20" :width="220" :height="40" :labels="{checked: 'Available', unchecked: 'Unavailable'}"/>
                
            </div>

        </div>
    </div>
</template>
<script>
export default {
    props : ['type','status'],
    data(){
        return{
            currentUrl: window.location.origin,
            errors: [],
            yes : true
          
        }
    },

    created(){
        this.check();
    },

    methods : {
       onChangeEventHandler(value){

            axios.post(this.currentUrl + '/request/user/availability', {
                status: value.value,
            })
            .then(response => {
                
            })
            .catch(err => console.log(err));
       },

       check(){
           (this.status == 'Active') ? this.yes  = true : this.yes = false;
       }
    },
}
</script>