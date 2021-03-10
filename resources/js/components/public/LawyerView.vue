<template>
    <div>
        <div id="breadcrumb">
			<div class="container">
				<ul>
					<li><a href="#">Home</a></li>
					<li><a href="#">Profile</a></li>
					<li>Page active</li>
				</ul>
			</div>
		</div>

        <div class="container margin_60">
			<div class="row">
				<div class="col-xl-8 col-lg-8" v-if="book == false">
					<nav id="secondary_nav">
						<div class="container">
							<ul class="clearfix">
								<li><a href="#section_1" class="active">Lawyer Information</a></li>
								<li><a href="#section_2"></a></li>
							</ul>
						</div>
					</nav>
					<div id="section_1">
						<div class="box_general_3">
							<div class="profile">
								<div class="row">
									<div class="col-lg-5 col-md-4">
										<figure>
											<img :src="currentUrl+'/images/avatars/'+lawyer.avatar" alt="" class="img-fluid">
										</figure>
									</div>
									<div class="col-lg-7 col-md-8">
										<small>Specialization : {{lawyer.specialization.name}}</small>
										<h1>Atty. {{lawyer.firstname}} {{lawyer.lastname}}</h1>
                                        <hr>
                                        <h6>Legal Practices</h6>
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <ul class="bullets">
                                                    <li v-for="l in lawyer.legalpractices" v-bind:key="l.id">{{l.name}}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <br>
                                        <h6>Dialect Spoken / Languages</h6>
                                        <div class="row">
                                            <div class="col-lg-12">
                                              	<ul class="statistic">
                                                    <li style="margin-right: 5px;" v-for="l in lawyer.languages" v-bind:key="l.id">{{l.name}}</li>
                                                </ul> 
                                            </div>
                                        </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

                <div class="col-xl-8 col-lg-8" v-else>
					<nav id="secondary_nav">
						<div class="container">
							<ul class="clearfix">
								<li><a href="#section_1" class="active">Appointment Details</a></li>
								<li><a href="#section_2">Reviews</a></li>
							</ul>
						</div>
					</nav>
					<div id="section_1">
						<div class="box_general_3">
                            <form method="post" action="http://www.ansonika.com/findoctor/menu_2/assets/contact.php" id="contactform">
								<div class="row">
									<div class="col-md-12">
										<div class="form-group">
                                            <label>Case Summary</label>
											<input type="text" v-model="title" class="form-control" placeholder="Short summary of your case">
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-12">
										<div class="form-group">
											<textarea rows="5" v-model="details" class="form-control" style="height:200px;" placeholder="Describe your case in detail."></textarea>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
                
                <aside class="col-xl-4 col-lg-4" id="sidebar">
                    <nav id="secondary_nav">
						<div class="container">
							<ul class="clearfix">
								<li><a href="#section_1" class="active">Appointment</a></li>
								<li><a href="#section_2"></a></li>
							</ul>
						</div>
					</nav>
					<div class="box_general_3 booking">
						<div id="message-booking"></div>
                        <figure v-if="book == true">
                            <img style="border-radius: 50%; width: 50%; height: auto;  display: block; margin-left: auto; margin-right: auto;" :src="currentUrl+'/images/avatars/'+lawyer.avatar" alt="" class="img-fluid">
                        </figure>
                        <div class="summary" v-if="book == true">
                            <ul>
                                <li>Name: <strong class="float-right">Atty. {{lawyer.firstname}} {{lawyer.lastname}}</strong></li>
                            </ul>
                        </div>
						 <multiselect v-model="legalpractice" :options="legalpractices"  
                        placeholder="Select Legal Practice" label="name" track-by="id">
                        </multiselect>
                        <hr>
                        <form @submit.prevent="setAppointment">
                            <div v-if="book == false" style="position:relative;" @click="book=true"><input type="button" class="btn_1 full-width" value="Book Now"></div>
                            <div v-else style="position:relative;"><input type="submit" class="btn_1 full-width" value="Submit Appointment"></div>
                        </form>
					</div>
				</aside>
			</div>
        </div>
    </div>
</template>


<script>
import Multiselect from 'vue-multiselect'
export default {
    props: ['lawyer_id'],
    data(){
        return {
            currentUrl: window.location.origin,
            errors: [],
            pagination: {},
            lawyer: {
                specialization : {}
            },
            legalpractices : [],
            legalpractice : '',
            title: '',
            details: '',
            keyword: '',
            book: false
        }
    },
    
    created(){
		this.fetch();
		this.fetchLegalpractice();
    },

    methods : {

        fetch(page_url){
            axios.get(this.currentUrl + '/request/user/'+this.lawyer_id)
            .then(response => {
                this.lawyer = response.data.data;
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
		
		setAppointment()
		{
			axios.post(this.currentUrl + '/request/appointment/set', {
				legalpractice : this.legalpractice.id,
				lawyer: this.lawyer_id,
				title : this.title,
				details : this.details
			})
			.then(response => {
				alert('success');
			})
			.catch(error => {
				if (error.response.status == 422) {
					this.errors = error.response.data.errors;
				}
			});
		}
    },
    
    components: { Multiselect }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>