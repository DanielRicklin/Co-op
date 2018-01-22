<template>
	<div>
		<h1 v-model="topic">{{topic}} - {{label}}</h1>
		<textarea id="form-text" v-model="newMessage" placeholder="Laissez un Message"></textarea>
		<button @click ="addMessage">
			Add Message
		</button>
		<ul>
			<message v-for = "message in messages" :message="message" :key="message._id"></message>
		</ul>
	</div>
</template>


<script>
import Message from './Message.vue';
export default {
	name: 'Channel',
	data () {
		return {
			topic : "",
			label : "",
			messages : [],
			newMessage:""
		}
	},
	mounted() {
		this.getMessage()
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
	updated() {
		this.getMessage()
	},
	components: {
		Message
	},
	methods:{
		getMessage() {
			window.axios.get(this.$route.path+"/posts",{
				params:{
					token:this.$store.state.token
				}
			}).then((response) => {
				this.messages = response.data
			})
		},
		addMessage() {
			// console.log(this.$route.path);
			window.axios.post(this.$route.path+"/posts",{
				message : this.newMessage,
				params:{
					token:this.$store.state.token
				}
			}).then((response) => {
				this.getMessage()
				this.newMessage = ""
				this.$router.push(this.$route.path)

			}).catch ((error) => {
				console.log(error);
			})
		}
	}
}

</script>


<style scoped>
</style>