<template>
	<form @submit="addChannel">
		<input type="text" v-model="label" placeholder="label"/>
		<input type="text" v-model="topic" placeholder="topic"/>

		<input type="submit" />
	</form>

</template>


<script>
export default {
	name: 'newChannel',
	data () {
		return {
			label : '',
			topic : '' 
		}
	},
	methods:{

		addChannel(){
			window.axios.post('channels',{
				label : this.label,
				topic : this.topic,
				params : {
					token : this.$store.state.token
				}

			}).then((response) => {
				this.$router.push('/conversations'); 
				
			}).catch ((error) => {
				console.log(error);
			})
		}	
	}
}

</script>


<style scoped>
</style>