/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import VueToast from 'vue-toast-notification';
Vue.use(VueToast);
import ToggleButton from 'vue-js-toggle-button';
Vue.use(ToggleButton);
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('password', require('./components/Password.vue').default);
Vue.component('setting', require('./components/Setting.vue').default);
Vue.component('notification', require('./components/Notification.vue').default);
Vue.component('notifications', require('./components/NotificationS.vue').default);

Vue.component('pub-lawyer', require('./components/public/Lawyer.vue').default);
Vue.component('pub-lawyerview', require('./components/public/LawyerView.vue').default);
Vue.component('pub-appointment', require('./components/public/Appointment.vue').default);

Vue.component('lawyer-appointment', require('./components/lawyer/Appointment.vue').default);
Vue.component('lawyer-calendar', require('./components/lawyer/Calendar.vue').default);

Vue.component('register', require('./components/Register.vue').default);
Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('dropdown', require('./components/Dropdown.vue').default);
Vue.component('report', require('./components/Report.vue').default);
Vue.component('lawyer', require('./components/Lawyer.vue').default);
Vue.component('client', require('./components/Client.vue').default);
Vue.component('appointment', require('./components/Appointment.vue').default);
Vue.component('home', require('./components/Home.vue').default);

Vue.component('home-client', require('./components/HomeClient.vue').default);
Vue.component('myreports', require('./components/Myreport.vue').default);
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    methods: {
        someMethod(id){
            this.$refs.run.test(id);
        },
        view(){
            this.$refs.chck.withhout();
        }
    }
});
