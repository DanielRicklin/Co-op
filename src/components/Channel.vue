<template>
	<v-layout>
		<v-container fluid id="messageContainer"  >
			<h1 v-model="topic">{{topic}} - <small>{{label}}</small></h1>
			<message class="message" v-for = "message in messages" :message="message" :key="message._id"></message>
			<v-card v-if="noMessage" id="alert">
				<v-card-text><b> Aucun Message</b></v-card-text>
			</v-card>
		</v-container>
		<v-container id="formMessage"   ref="form">

			<v-text-field  v-on:keyup.enter="addMessage" id="form-text" v-model="newMessage" placeholder="Laissez un Message"></v-text-field>
			<v-btn  @click ="addMessage">
				<v-icon>send</v-icon>
			</v-btn>

		</v-container>
	</v-layout>
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
			newMessage:"",
			noMessage:true,
			timer :setInterval( ()=> {
				this.getMessage()
			}
			,2000)
		}
	},
	created() {
			window.bus.$emit('log') // vérification d'être logué
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
		mounted() {
			window.setTimeout( ()=> {
				let elmt = document.querySelector("#messageContainer")
				elmt.scrollTo(0,elmt.scrollHeight)
			},2000)
			this.timer
			
		},
		beforeDestroy(){
			clearInterval(this.timer)
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
					if (this.messages =="") {
						this.noMessage =true
					}
					else {
						this.noMessage=false
					}
				})
			},
			addMessage() {

				window.axios.post(this.$route.path+"/posts",{
					message : this.newMessage,
					params:{
						token:this.$store.state.token
					}
				}).then((response) => {

					this.newMessage = ""
					this.$router.push(this.$route.path)

				}).then((response) => {
					let elmt = document.querySelector("#messageContainer")
					elmt.scrollTo(0,elmt.scrollHeight)
				}).catch ((error) => {
					console.log(error);
				})
			}
		}
	}

	</script>


	<style scoped>
	#formMessage {
		position:fixed;
		bottom:0;
		height:15vh;
		background-color:white;
		width:100%;
		box-sizing: border-box;

	}
	#messageContainer {
		height:78vh;
		overflow:auto;
		box-sizing: border-box;

	}
	#alert {
		width:75%;
		margin-right:auto;
		margin-left:auto;
		margin-top:10px;
		text-align:center;
	}

	</style>