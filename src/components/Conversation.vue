<template>
	<li>
		<router-link :to="{ name: 'channel', params: { id: conversation._id }}">
			<b>{{conversation.topic}}</b></router-link>
		<router-link :to="{ name: 'modifychannel', params: { id: conversation._id }}" >
			<b>modifier</b></router-link>
		<button @click="deleteChannel(conversation._id)"> Delete </button>
		
</li>
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