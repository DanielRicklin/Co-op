<template>
	<form @submit="seConnecter">
		<input type="email" v-model="email" placeholder="email"/>
		<input type="password" v-model="password" placeholder="password"/>

		<input type="submit" />
		<router-link to="/MembresCreation">Créer un compte</router-link>
	</form>

</template>


<script>
export default {
	name: 'Connexion',
	data () {
		return {
			password : '',
			email : '' 
		}
	},
	methods:{

		seConnecter(){
			window.axios.post('members/signin',{
				email : this.email,
				password : this.password,

			}).then((response) => {
				this.$store.commit('setMember', response.data.email)
				this.$store.commit('setToken', response.data.token)
				this.$router.push('/conversations');
				 window.axios.defaults.params.token = this.$store.state.token;

			}).catch ((error) => {
				console.log(error);
			})
		}	
	}
}

</script>


<style scoped>
</style>