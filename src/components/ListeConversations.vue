<template>
	<v-container column >

		<conversation v-for = "conversation in conversations" :conversation="conversation" :key="conversation._id"></conversation>
	</v-container>
</template>


<script>
import Conversation from './Conversation.vue';
export default {
	name: 'liste-conversations',
	data () {
		return {
			conversations : []
		}
	},
	components: {
		Conversation
	},
	created () {
		window.bus.$emit('log') // vérification d'être logué
		this.getConversation()
	},

	methods : {
			getConversation () {
			window.axios.get("channels", {
				params : {
					token : this.$store.state.token
				}
			}).then((response) => {
				this.conversations = response.data
			}).catch ((error) => {
				console.log(error)
			})
		}	
	}


}

</script>


<style scoped>
</style> 