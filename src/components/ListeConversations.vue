<template>
	<div>
		<button @click="listeMembres"> Liste Membres</button>
		<button @click="Deconnexion"> LOG OUT</button>
		<button @click="addConversation"> Rajouter une conversation</button>
		<ul>
			
				
				<conversation v-for = "conversation in conversations" :conversation="conversation" :key="conversation._id"></conversation>
			
		</ul>
	</div>
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
			window.axios.get("channels", {
				params : {
					token : this.$store.state.token
				}
			}).then((response) => {
				this.conversations = response.data
			}).catch ((error) => {
				console.log(error)
			})
		},

	methods : {
		Deconnexion() {
			window.axios.delete('members/signout', {
				params : {
					token : this.$store.state.token
				}
			})
			.then((response) => {
				this.$store.commit('setMember', false);
				this.$store.commit('setToken', false);
				this.$router.push('/connexion'); 
				delete this.$store.state.member;

			}).catch ((error) => {
				console.log(error)
			})
		},
		addConversation() {
			this.$router.push('/newChannel'); 

		},
		listeMembres() {
			this.$router.push('/listeMembres')
		}
	}


}

</script>


<style scoped>
</style>