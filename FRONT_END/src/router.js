import VueRouter from 'vue-router';
import Vue from 'vue';

import Events from './components/Events/index.vue'
import FormEvents from './components/Events/FormEvent/index.vue'
import ListEvents from './components/Events/ListEvent/index.vue'


Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes : [
    //{path: '/panel/:id/:colorFondo/:colorTexto', component: Panel, props: true},
    //{path: '/form/:colorFondo/:colorTexto', component: Formulario, props: true},
    //{path: '/formvue/:colorFondo/:colorTexto', component: FormularioVue, props: true},
    //{path: '/http/:colorFondo/:colorTexto', component: Http, props: true},
    //{path: '/contador', component: Contador}
    {
        path: '/event',
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
    }
  ]
})