<template>
    <li class="header-notification">
        <div class="dropdown-primary dropdown">
            <div class="dropdown-toggle" data-toggle="dropdown">
                <i class="feather icon-bell"></i>
                <span class="badge bg-c-red" v-if="notifications.length > 0">{{notifications.length}}</span>
            </div>
            <ul class="show-notification notification-view dropdown-menu"
                data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">
                <li>
                    <h6>Notifications</h6>
                    <label class="label label-danger">New</label>
                </li>
                <li v-for="noti in notifications" v-bind:key="noti.id" @click="status(noti.id,noti.id)">
                    <div class="media">
                        <div class="media-body">
                            <h5 class="notification-user">{{noti.client}}</h5>
                            <p class="notification-msg">{{ noti.specialization }}, click to view more...</p>
                            <span class="notification-time">{{noti.created_at}}</span>
                        </div>
                    </div>
                </li>
              
            </ul>
        </div>
    </li>
</template>

<script>
export default {
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
            axios.get(this.currentUrl + '/request/notification/secretary')
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
            this.$parent.view();
            axios.post(this.currentUrl + '/request/notification/update',{
                id : appid
            })
            .then(response => {
                // let i = this.notifications.map(item => item.id).indexOf(id) // find index of your object
                // this.notifications.splice(i, 1)
            })
            .catch(err => console.log(err));
        },

    },
}
</script>