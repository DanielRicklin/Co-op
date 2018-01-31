<template>
  <v-toolbar v-show="this.$route.path!='/connexion'"  fixed  app color="primary">

    <v-toolbar-title>Application COOP</v-toolbar-title>
    <v-spacer></v-spacer>
 
    <v-btn flat @click="listeMembres"> <v-icon>people</v-icon></v-btn>
    <v-btn flat @click="addConversation"> <v-icon> add</v-icon> <v-icon>message</v-icon></v-btn>

    	<router-link to="/conversations"><v-btn flat><v-icon>message</v-icon></v-btn></router-link>

    <v-btn  color="red" @click="deconnexion"> <v-icon>input</v-icon></v-btn>

  </v-toolbar>
</template>


<script>
export default {
	name: 'toolbar',
	data () {
		return {
			log : false,
			toolbar:true
		}
	},
	created() {
		if (this.$route.path=="/connexion") {
			this.toolbar=false
		}
		else {
			this.toolbar=true
		}
},
	methods : {
		deconnexion() {
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
				this.toolbar=false;
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