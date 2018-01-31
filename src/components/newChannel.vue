<template>
	<v-container>
		<v-flex xs6 offset-xs3>
			<h1>Ajout de Conversation</h1>
			<v-card ref="form">
				<v-card-text>
					<v-text-field label="Titre de la Conversation" name="label" type="text" v-model="label" placeholder="ex : Anniversaire de Michel"></v-text-field>
					<v-text-field   v-on:keyup.enter="addChannel" label="topic" name="topic" type="text"placeholder="ex :cadeau collectif" v-model="topic"></v-text-field>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="green lighten-2"  @click="addChannel"
					><v-icon>checked</v-icon>add </v-btn>
				</v-card-actions>
			</v-card>
		</v-flex>
	</v-container>


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