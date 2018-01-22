<template>
	<form @submit="modify">
		<input v-model="topic"/>
		<input v-model="label"/>
		<button type="submit">Send</button>
	</form>
</template>

<script>

export default {
	name:"modifychannel",
	data() {
		return {
			topic:'',
			label:''
		}
	},
	mounted() {
		window.axios.get('channels/'+this.$route.params.id, {
			params :{
				token: this.$store.state.token
			}
		}).then((response) => {
			this.label = response.data.label
			this.topic = response.data.topic
		}).catch ((error) => {
			console.log(error)
		})
		
	},
	methods : {
		modify() {
			window.axios.put('channels/'+this.$route.params.id,{
				label : this.label,
				topic : this.topic,
				params : {
					token : this.$store.state.token
				}
			}).then((response) => {
				this.$router.push("/conversations")
			}).catch ((error) => {
				console.log(error)
			})
		}
	}

}
</script>