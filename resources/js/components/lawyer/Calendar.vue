<template>
    <div>
        <div id="breadcrumb">
            <div class="container">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Lawyer</a></li>
                    <li>Calendar</li>
                </ul>
            </div>
        </div>

    
        <div class="container" style="margin-top: 30px;" >
            <div class="row">
                <div class="col-xl-12 col-lg-12">
                    <nav id="secondary_nav">
                        <div class="container">
                            <ul class="clearfix">
                                <li><a href="#section_1" class="active">Calendar</a></li>
                                <li><a href="#sidebar"></a></li>
                            </ul>
                        </div>
                    </nav>
                    <div id="section_1">
                        <div class="box_general">
                            <ul class="legend">
                                <li><strong></strong>Finished</li>
                                <li><strong></strong>Accepted</li>
                            </ul>
                            <div class="list_general">
                               
                                <FullCalendar :options="calendarOptions"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="details" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="margin-top: 150px;"> 
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Appointment</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <ul class="booking_details" style="margin-left: 60px;">
                            <li><strong>Customer Name</strong> {{customer}}</li> 
                            <li><strong>Schedule Date</strong> {{sched}}</li>
                        </ul>
                        <div class="indent_title_in">
                            <h6>{{title}}</h6>
                            <p>{{ description }}</p>
                        </div>
                        

                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="activities" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="margin-top: 150px;"> 
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add Activities</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <form class="md-float-material form-material" @submit.prevent="create">
                        <div class="modal-body">
                            <div class="box-form">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Title: <span v-if="errors.title" style="color: red; font-size: 12px;"> ({{ errors.title[0] }})</span></label>
                                        <input class="form-control" v-model="title" id="info" cols="30" rows="2" placeholder="">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Description: <span v-if="errors.description" style="color: red; font-size: 12px;"> ({{ errors.description[0] }})</span></label>
                                        <textarea class="form-control" v-model="description" id="info" cols="30" rows="2" placeholder=""></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
	</div>

</template>

<script>

    import FullCalendar from '@fullcalendar/vue';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import timeGridPlugin from '@fullcalendar/timegrid';
    import interactionPlugin from '@fullcalendar/interaction';
    import moment from 'moment';

    export default {

        data() {
            return {
                currentUrl: window.location.origin,
                calendarOptions: {
                    plugins: [ dayGridPlugin, interactionPlugin ,timeGridPlugin],
                    headerToolbar: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                    },
                    initialView: 'timeGridWeek',
                    slotMinTime: "08:00:00",
                    slotMaxTime: "18:00:00",
                    slotDuration: "01:00:00",
                    selectable: true,
                    // selectMirror: true,
                    dayMaxEvents: true,
                    weekends: true,
                    select: this.handleDateSelect,
                    eventClick: this.handleEventClick,
                    eventDrop: this.handleDrop,
                    eventsSet: this.handleEvents,
                    validRange: {
                        start: new Date(Date.now()+86400000).toISOString().substring(0,10)
                    },
                    eventOverlap : false,
                    expandRows: true,
                    allDaySlot: false,
                    events : [],
                    
                },
                title : '',
                description: '',
                customer: '',
                sched : '',
                strt: '',
                errors : [],
                temp : [],
                obj1 : [],
                obj2 : []
            }
        },

        created(){
            this.fetch();
        },

        methods : {
            fetch(){
                this.temp = [];
                axios.get(this.currentUrl + '/request/events')
                .then(response => { 

                    for(var i=0; i < response.data.data.length; i++){
                        this.temp.push(response.data.data[i]);   
                    }
                           
                })
                .catch(err => console.log(err));

                axios.get(this.currentUrl + '/request/activities')
                .then(response => {
                   for(var i=0; i < response.data.data.length; i++){
                        this.temp.push(response.data.data[i]);   
                    }
                })
                .catch(err => console.log(err));
               
                this.calendarOptions.events = this.temp;
                
            },

            handleDrop(dropevent){
                if(dropevent.event.extendedProps.status == 'activity'){
                    axios.post(this.currentUrl + '/request/activity/update', {
                        schedid: dropevent.event.id,
                        newsched:  moment(String(dropevent.event.start)).format('YYYY-MM-DD HH:mm:ss')
                    })
                    .then(response => {
                        
                    })
                    .catch(err => console.log(err));
                }else{
                    axios.post(this.currentUrl + '/request/event/update', {
                        schedid: dropevent.event.id,
                        newsched:  moment(String(dropevent.event.start)).format('YYYY-MM-DD HH:mm:ss')
                    })
                    .then(response => {
                        
                    })
                    .catch(err => console.log(err));
                }
            },

            handleWeekendsToggle() {
                this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
            },
            handleDateSelect(selectInfo) {
                $("#activities").appendTo("body").modal('show');
                this.strt = selectInfo.startStr;
                // let title = prompt('Please enter a new title for your event')
                // let calendarApi = selectInfo.view.calendar
                // console.log(selectInfo.startStr);
                // calendarApi.unselect() // clear date selection
                // if (title) {
                //     calendarApi.addEvent({
                //     id: createEventId(),
                //     title,
                //     start: selectInfo.startStr,
                //     end: selectInfo.endStr,
                //     allDay: selectInfo.allDay
                //     })
                // }
            },

            create(){
                axios.post(this.currentUrl + '/request/event/store', {
                    date: moment(String(this.strt)).format('YYYY-MM-DD HH:mm:ss'),
                    title: this.title,
                    content: this.description
                })
                .then(response => {
                    $("#activities").modal('hide');
                    this.fetch();
                })
                .catch(err => console.log(err));
            },

            handleEventClick(clickInfo) {
                this.title = clickInfo.event.extendedProps.apptitle;
                this.description = clickInfo.event.extendedProps.appdetails;
                this.customer = clickInfo.event.title;
                this.sched = clickInfo.event.start;
                $("#details").appendTo("body").modal('show');
            }
        },

        components: {
            FullCalendar,
        },
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
    .fc-timegrid-slot {width: 400px;}
</style