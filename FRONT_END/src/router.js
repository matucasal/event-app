import VueRouter from 'vue-router';
import Vue from 'vue';

//import Layout from "./components/Layout/index.vue";
import Layout from "./components/Layout/index.vue"
import HelloWorld from './components/HelloWorld/index.vue'


import Events from './components/Events/index.vue'
import FormEvents from './components/Events/FormEvent/index.vue'
import ListEvents from './components/Events/ListEvent/index.vue'

import Users from './components/Users/index.vue'
import FormUser from './components/Users/FormUser/index.vue'
import ListUser from './components/Users/ListUser/index.vue'

import Login from './components/Login/index.vue'
import Register from './components/Register/index.vue'

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
        /*meta: { 
            guest: true
        }*/
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
        component: Layout
    }
    ,{
        path: '/events',
        component: Events,
        children: [
        {
            name: 'FormEvent',
            path: '/form-event',
            component: FormEvents
        },
        {
            name: 'ListEvent',
            path: '/list-event',
            component: ListEvents
        }
    ]
    },
   
    {
      path: '/users',
      component: Users,
      children: [
      {
          name: 'FormUser',
          path: '/form-user',
          component: FormUser
      },
      {
          name: 'ListUser',
          path: '/list-user',
          component: ListUser
      }
  ]
  }

  ]
})


router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('jwt') == null) {
        next({
          path: '/login',
          params: { nextUrl: to.fullPath }
        })
      } else {
        let user = JSON.parse(localStorage.getItem('user'))
        if(to.matched.some(record => record.meta.is_admin)) {
          if(user.is_admin == 1){
              next()
          }
          else{
              next({ name: 'userboard'})
          }
        }
        else {
            next()
        }
      }
    } else if(to.matched.some(record => record.meta.guest)) {
          if(localStorage.getItem('jwt') == null){
              next()
          }
          else{
              next({ name: 'userboard'})
          }
      }else {
      next() 
    }
  })


  export default router