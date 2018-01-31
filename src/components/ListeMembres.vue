<template>
	<v-container>
		<h1>Liste des Membres</h1>

		<v-list>
			<v-list-tile v-for="membre in membres" :key="membre._id">
				<v-list-tile-content>
					{{membre.fullname}} - {{membre.email}}
				</v-list-tile-content>
				<v-btn flat color="red darken-3" v-if="membre.email != email_sign " @click ="deleteMembre(membre._id,membre.email)"> <v-icon>delete</v-icon></v-btn>
			</v-list-tile>
		</v-list>
	</v-container>
</template>


<script>
export default {
	name: 'Channel',
	data () {
		return {
			membres : [],
			email_sign : this.$store.state.member
		}
	},
	created() {
		window.bus.$emit('log') // vérification d'être logué
		this.getMembres();
	},
	methods : {
		getMembres () {
			window.axios.get('members', {
				params : {
					token : this.$store.state.token
				}
			}).then ((response) => {
				this.membres = response.data
			})
		},
		deleteMembre(id,email) {
			if (email != this.$store.state.member) {
				window.axios.delete('members/'+id,{
					params : {
						token : this.$store.state.token
					}
				}).then((response) => {
					this.getMembres()
				})
			}
			
		}
	}
	
}

</script>


<style scoped>
</style>