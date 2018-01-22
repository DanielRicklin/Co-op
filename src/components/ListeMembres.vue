<template>
	<div>
		<h1>Liste des Membres</h1>

		<ul>
			<li v-for ="membre in membres">
				{{membre.fullname}}
				{{membre.email}}
				<button v-if="membre.email != email_sign " @click ="deleteMembre(membre._id,membre.email)"> Delete</button>
			</li>
		</ul>
	</div>
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