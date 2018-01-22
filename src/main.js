// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store.js'
import router from './router'
import axios from 'axios'

window.axios = axios.create({
  baseURL: 'http://coop.api.netlor.fr/api/',
  params : {
  	token : store.state.token
  },
  headers: { Authorization: 'Token token=6847c8c243d648fe8614a87f8542bd36' }
});
Vue.config.productionTip = false

store.subscribe((mutation, state) => {
	localStorage.setItem('store', JSON.stringify(state));
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // qui veut dire store : store
  beforeCreate(){
  	this.$store.commit('initialiseStore');
  },
  template: '<App/>',
  components: { App }
})
