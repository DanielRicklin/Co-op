import Vue from 'vue'
import Router from 'vue-router'
import Connexion from '@/components/Connexion' // @ cherche à partir de src
import membresCreation from '@/components/MembresCreation' // @ cherche à partir de src
import ListeConversations from '@/components/ListeConversations'
import newChannel from '@/components/newChannel'
import Channel from '@/components/Channel'
import ListeMembres from '@/components/ListeMembres'
import ModifyChannel from '@/components/ModifyChannel'
Vue.use(Router)

export default new Router({
  routes: [
  {
    path: '/connexion',
    component: Connexion
  },
  {
    path: '/membresCreation',
    component: membresCreation
  },
  {
   path: '/conversations',
   component: ListeConversations
 },
 {
  path: '/newChannel',
  component : newChannel
},
{
  name : 'channel',
  path : '/channels/:id',
  component : Channel
},
{
  path: '/listeMembres',
  component : ListeMembres
},
{
  name : 'modifychannel',
  path : '/modifychannel/:id/',
  component : ModifyChannel
},
{
  path:"*",
  redirect:"/conversations"
}


]
})
