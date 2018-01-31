<template>
	
<v-container fill-height  >

		<v-flex xs6 offset-xs3>
			<h1>Créer un compte</h1>
			<v-card ref="form">
				<v-card-text>
					<v-text-field label="Nom" name="nom" type="text" v-model="fullname" placeholder="ex : Michel Dupont"></v-text-field>
					<v-text-field label="Email" name="email" type="email" v-model="email" placeholder="ex : michel.dupont@mail.com"></v-text-field>
					<v-text-field   label="Mot de Passe" name="password" type="password"placeholder="mdp" v-model="password"></v-text-field>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="green lighten-2"  @click="creerMembre"
					><v-icon>person_add</v-icon></v-btn>
				</v-card-actions>
			</v-card>
		</v-flex>
	</v-container>
</template>

<script>
export default {
  name: 'MembresCreation',
  data () {
    return {
		fullname :  '',
		password : '',
		email : '' ,
    }
	},
	methods:{
		creerMembre(){
			window.axios.post('members',{
				fullname : this.fullname,
				email : this.email,
				password : this.password,

			}).then((response) => {
			this.$router.push("/connexion")
			
			}).catch ((error) => {
				alert(error.response.data.error.join(""));
			})
		}
  	}
}

</script>


<style scoped>
</style>
