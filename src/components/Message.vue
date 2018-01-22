<template>
	<div v-if="auteur">
		<p><b>{{auteur}}</b> : </p>
		<p v-if="!edit">{{message.message}}</p>
		<form v-if="edit" @submit ="editMessage(message._id)">
		<input v-model="edit_message"/>
		<button type="submit">Send</button>
</form>
		<button v-if="user && !edit" @click="deleteMessage(message._id)"> Delete </button>
		<button v-if="user && !edit" @click="edit=true"> Edit </button>
	</div>

</template>


<script>
export default {
	name :"message",
	props : ["message"],
	data() {
		return {
			auteurs:[],
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
			this.auteurs=response.data
			response.data.forEach(function(el){

				if (this.message.member_id == el._id) {
					this.auteur = el.fullname
					if(el.email == this.mon_email) {
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
		}

	}
}

</script>


<style scoped>
</style>