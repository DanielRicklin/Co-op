<template>
	<v-container   v-if="auteur">
		<p><b>{{auteur}}</b> : </p>
		<v-layout   align-center row >
			<p  v-if="!edit">{{message.message}}</p>
			<v-container  v-if="edit" ref="form">

				<v-text-field type="text" v-model="edit_message"></v-text-field>

				<v-btn flat icon color ="green darken-2"  @click="editMessage(message._id)"><v-icon>done</v-icon></v-btn>
				<v-btn flat icon color="red darken-3" @click="edit=false"><v-icon>cancel</v-icon></v-btn>

			</v-container>
			<v-spacer></v-spacer>
			<v-btn icon v-if="user && !edit" @click="modeEdit"><v-icon > mode_edit </v-icon></v-btn>
			<v-btn icon v-if="user && !edit" @click="deleteMessage(message._id)"><v-icon color="red darken-3"> delete</v-icon> </v-btn>


		</v-layout>
		<v-divider></v-divider>
	</v-container>

</template>


<script>
export default {
	name :"message",
	props : ["message"],
	data() {
		return {
			auteur:"",
			mon_email: this.$store.state.member,
			user :false,
			edit_message :"",
			edit:false
		}
	},
	mounted() {
		window.axios.get('members', {
			params : {
				token : this.$store.state.token
			}
		}).then ((response) => {
			response.data.forEach(function(el){

				if (this.message.member_id == el._id) {
					this.auteur = el.fullname
					if(el.email == this.mon_email) {
						this.auteur="Moi"
						this.user=true
					}
				}
			},this)
		})
	},
	methods:{
		deleteMessage(id){

			window.axios.delete('channels/'+this.$route.params.id+'/posts/'+id, {
				params :{
					token: this.$store.state.token
				}
			}).then((response) => {
				this.$router.push(this.$route.path)
			}).catch ((error) => {
				console.log(error)
			})
		},
		editMessage(id) {

			window.axios.patch('channels/'+this.$route.params.id+'/posts/'+id, {
				message: this.edit_message,
				params :{
					token: this.$store.state.token
				}
			}).then((response) => {
				this.$router.push(this.$route.path)
				this.edit=false
			}).catch ((error) => {
				console.log(error)
			})
		},
		modeEdit(){
			this.edit=true
			this.edit_message = this.message.message
		}

	}
}

</script>


<style scoped>
</style>