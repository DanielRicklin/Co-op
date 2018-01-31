<template>

	<v-container fill-height  >

		<v-flex xs6 offset-xs3>
			<h1>Login</h1>
			<v-card ref="form">
				<v-card-text>
					<v-text-field label="Email" name="email" type="email" v-model="email" placeholder="email"></v-text-field>
					<v-text-field   v-on:keyup.enter="seConnecter" label="Mot de Passe" name="password" type="password"placeholder="mdp" v-model="password"></v-text-field>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="green lighten-2"  @click="seConnecter"
					><v-icon>checked</v-icon>Connexion</v-btn>
					<router-link to="/MembresCreation">Créer un compte</router-link>
				</v-card-actions>
			</v-card>
		</v-flex>
	</v-container>

</template>


<script>
import Toolbar from './Toolbar.vue'
export default {
	name: 'Connexion',
	data () {
		return {
			password : '',
			email : '' 
		}
	},
	components :{
		Toolbar
	},
	methods:{

		seConnecter(){
			window.axios.post('members/signin',{
				email : this.email,
				password : this.password,

			}).then((response) => {
				this.$store.commit('setMember', response.data.email)
				this.$store.commit('setToken', response.data.token)
				Toolbar.data().log = true;
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