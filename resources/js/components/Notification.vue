<template>
    <li>
        <a style="cursor: pointer;" @click="shows">Notifications <i class="cancel" v-if="all.length > 0"> {{all.length}}</i></a>
         <div class="modal fade" id="profiles" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="margin-top: 150px;"> 
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Notifications</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div v-for="noti in notifications" v-bind:key="noti.id">
                            <a style="cursor: pointer;" class="dropdown-item" @click="status(noti.appointment_id,noti.id)">
                            <strong v-if="usertype == 'Lawyer'">
                                <small>
                                    <span v-if="noti.status == 'Pending'">You have a new Appointment Request from </span>
                                    <span v-else-if="noti.status == 'Rescheduled'">Your Appointment wants to be re scheduled by </span>
                                    <span v-else>You Appointment Request is cancelled by </span>
                                </small>
                                <span v-if="noti.appointment_status == 'Rescheduled'">{{noti.sub}}</span> 
                                <span v-else>{{noti.client}}</span> 
                                <small>({{noti.specialization}})</small>
                            </strong>
                            <strong v-else>
                                <small> 
                                    <span v-if="noti.reschedcount != 0"> Your Appointment has been {{noti.status}} by </span>
                                    <span v-else>Your request for reschedule is {{noti.reschedstatus}} by </span>
                                </small>
                                {{noti.client}} <small>({{noti.specialization}})</small></strong>
                            <span class="small float-right text-muted">{{noti.created_at}}</span>
                            </a>
                            <div class="dropdown-divider"></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
export default {
    props: ['usertype'],
    data(){
        return{
            currentUrl: window.location.origin,
            errors: [],
            all: [],
            notifications: [],
        }
    },

    created(){
        this.fetch();
    },

    mounted: function () {
        window.setInterval(() => {
            this.fetch();
        }, 5000)
    },

    methods : {

        fetch(){
            let page_url;
            if(this.usertype == 'Lawyer'){
                 page_url = this.currentUrl + '/request/notifications';
            }else{
                 page_url = this.currentUrl + '/request/notification/client';
            }

            axios.get(page_url)
            .then(response => {
                this.all = response.data.data;

                for(var i=0; i < this.all.length; i++){
                    let x = this.notifications.some(
                        not => (
                            not.id === this.all[i].id
                        )
                    )
                    if(!x){
                        this.notifications.push(this.all[i]);
                    }
                } 

                for(var i=0; i < this.notifications.length; i++){
                    let x = this.all.some(
                        a => (
                            a.id === this.notifications[i].id
                        )
                    )
                    if(!x){
                        let itemid = this.notifications[i].appointment_id;
                        let aa = this.notifications.map(item => item.id).indexOf(itemid) // find index of your object
                        this.notifications.splice(aa, 1)
                    }
                } 

            })
            .catch(err => console.log(err));
        },
        
        status(appid,id){
            $("#profiles").modal('hide');
    	    this.$parent.someMethod(id);
    
            axios.post(this.currentUrl + '/request/notification/update',{
                id : appid
            })
            .then(response => {
                // let i = this.notifications.map(item => item.id).indexOf(id) // find index of your object
                // this.notifications.splice(i, 1)
            })
            .catch(err => console.log(err));
        },

        shows(){
            $("#profiles").appendTo("body").modal('show');
        }
    },
}
</script>