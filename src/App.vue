<template>
 <v-app light>

  <toolbar></toolbar>

  <v-container mt-5 id="main">
    <router-view ></router-view>
  </v-container>

</v-app> 
</template>

<script>
import MembresCreation from './components/MembresCreation.vue'
import Connexion from './components/Connexion.vue'
import Toolbar from './components/Toolbar.vue'

export default {
  name: 'app',
  components : {MembresCreation, Connexion,Toolbar},
  created(){
    this.checkLog()
        window.bus.$on('log', this.checkLog)
  },
  methods : {

   checkLog() {
        if( !this.$store.state.member ){  //Si connecté 
         this.$router.push({path: '/connexion'});
        }
        else {
                  window.axios.defaults.params.token = this.$store.state.token;
        }
      }
    }
  }
  </script>

  <style scoped>
  #main {
    height:100vh;
    box-sizing: border-box;
  }
  </style>
