import VueRouter from 'vue-router';
import Vue from 'vue';

import Layout from "./components/Layout/index.vue"
import HelloWorld from './components/HelloWorld/index.vue'

import FormEvents from './components/Events/FormEvent/index.vue'
import ListEvents from './components/Events/ListEvent/index.vue'

import FormUser from './components/Users/FormUser/index.vue'
import ListUser from './components/Users/ListUser/index.vue'

import Login from './components/Login/index.vue'
import Register from './components/Register/index.vue'

import store from './store.js'

Vue.use(VueRouter);

let router = new VueRouter({
  mode: 'history',
  routes : [
    //{path: '/panel/:id/:colorFondo/:colorTexto', component: Panel, props: true},
    //{path: '/form/:colorFondo/:colorTexto', component: Formulario, props: true},
    //{path: '/formvue/:colorFondo/:colorTexto', component: FormularioVue, props: true},
    //{path: '/http/:colorFondo/:colorTexto', component: Http, props: true},
    //{path: '/contador', component: Contador}
    
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld,
        meta: { 
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        /*meta: { 
            guest: true
        }*/
    }
    ,
    {
        path: '/register',
        name: 'register',
        component: Register,
        /*meta: { 
            guest: true
        }*/
    }
    ,
    {
        path: '/layout',
        name: 'layout',
        component: Layout,
        meta: { 
            requiresAuth: true
        },
        children: [
            {
            name: 'ListEvent',
            path: '/list-event',
            //component: ListEvents
            components: {
                //default: ListEvents,
                content: ListEvents
            }
            },
            {
                name: 'FormEvent',
                path: '/form-event',
                components: {
                    //default: ListEvents,
                    content: FormEvents
                }
            },{
                name: 'FormUser',
                path: '/form-user',
                components: {
                    content: FormUser
                }
            },
            {
                name: 'ListUser',
                path: '/list-user',
                components: {
                    content: ListUser
                } 
            }
        ]
    }
  ]
})


router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters.isLoggedIn) {
        next()
        return
      }
      next('/login') 
    } else {
      next() 
    }
  })
  

  export default router