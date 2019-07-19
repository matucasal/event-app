<template>

  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
     <!-- <v-list dense> -->
          
          
      <v-list
        subheader
        dense
      >

        <p>Name: {{ user.name }}</p>   
        
        <a href="#" v-on:click="logout">Logout</a>  

        <v-subheader>Events</v-subheader>
        <v-list-tile>
            <v-list-tile-action>
                <v-icon>add</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <router-link :to="{name: 'FormEvent'}">
                <v-list-tile-title>Formulario de eventos</v-list-tile-title>
              </router-link>
            </v-list-tile-content>
        </v-list-tile>
    

  
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>event</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link :to="{name: 'ListEvent'}">
              <v-list-tile-title>Listado de eventos</v-list-tile-title>
            </router-link>
          </v-list-tile-content>
        </v-list-tile>


        <v-subheader>Usuarios</v-subheader>
        <!--
         <v-list-tile>
          <v-list-tile-action>
            <v-icon>person_add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link :to="{name: 'FormUser'}">
              <v-list-tile-title>Formulario de usuarios</v-list-tile-title>
            </router-link>
          </v-list-tile-content>
        </v-list-tile>
        -->
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link :to="{name: 'ListUser'}">
              <v-list-tile-title>Listado de usuarios</v-list-tile-title>
            </router-link>
          </v-list-tile-content>
        </v-list-tile>
        
    </v-list>


    </v-navigation-drawer>
    <v-toolbar color="#56baed" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
          align-center
        >

          <!--<router-view></router-view>-->
          <router-view name="content"></router-view>

        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="#56baed" app>
      <span class="white--text">&copy; Matías Casal - Fullstack 2019</span>
    </v-footer>
  </v-app>
</template>

<script>

  import axios from "axios"    
  import router from "../../router.js"   
  
  export default {


    name: "Login",
    data: () => ({
      drawer: null,
      user: {    
        name: "matias"    
      } 
    }),
    
    props: {
      source: String
    },
    mounted() {
      this.user.name = this.$store.getters.user.username
    }, 
    methods: {    
      getUserData() {
        let self = this    
        axios.get("/api/login/user")    
        .then((response) => {    
          console.log(response)    
          self.$set(this, "user", response.data.user)    
        })    
        .catch((errors) => {    
          console.log(errors)    
          router.push("/")    
        })    
      },
      callLogout(){
        logout.logout();
      },
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }  
    }
     
  }



</script>