<template>
	<v-container flex fluid>

		<v-layout center row align-center fluid>

			<router-link :to="{ name: 'channel', params: { id: conversation._id }}">
			{{conversation.topic}} - {{conversation.label}}</router-link>
			<v-spacer></v-spacer>
			<router-link :to="{ name: 'modifychannel', params: { id: conversation._id }}" >
				<v-btn icon flat >
					<v-icon >mode_edit</v-icon>
				</v-btn>
			</router-link>
			<v-btn icon @click="deleteChannel(conversation._id)"><v-icon color="red darken-3">delete</v-icon></v-btn>
		</v-layout>
		<v-divider></v-divider>
	</v-container>
</template>

<script>

export default {
	name:"conversation",
	props : ['conversation'],
	methods : {
		deleteChannel(id) {
			window.axios.delete('channels/'+id, {
				params :{
					token: this.$store.state.token
				}
			}).then((response) => {
				this.$router.push("/conversations")
			})
		}
	}


}

</script>
<style scoped>
a {
	text-decoration: none;
	color:black;
}
</style>