<template>  
    

<div class="wrapper fadeInDown">
  <div id="formContent">
    <!-- Tabs Titles -->
    <h2 class="active"> 
        <button @click="formLogin = true; formRegister = false">Login</button>
    </h2>

    <h2 class="inactive underlineHover">
        <button @click="formLogin = false; formRegister = true">Registrarse</button>
    </h2>
    
  

    <!-- Login Form -->
    <!-- Div que uso para mostrar o no mostrar el login form-->
    <div v-if="formLogin">
    <form  v-on:submit="login">
      <input type="text" id="login" class="fadeIn first" name="username" placeholder="username">
      <input type="password" id="password" class="fadeIn first" name="password" placeholder="password">
      <input type="submit" class="fadeIn fourth" value="Log In">
    </form>
    </div>

    <!-- Register Form -->
    <!-- Div que uso para mostrar o no mostrar el login form-->
    <div id="register-form" v-if="formRegister">
        <form  v-on:submit="register">
            <input type="text" id="login" class="fadeIn first" name="username" placeholder="username">
            <input type="password" id="password" class="fadeIn first" name="password" placeholder="password">
            <input type="number" id="edad" class="fadeIn first" name="edad" placeholder="edad">
            <input type="text" id="nombre" class="fadeIn first" name="nombre" placeholder="nombre">
            <input type="text" id="apellido" class="fadeIn first" name="apellido" placeholder="apellido">
            <input type="file" id="file" ref="file" v-on:change="onImageSelect()"/>
            <input type="submit" class="fadeIn fourth" value="Register">
        </form> 
    </div>

  </div>
</div>




    
</template>

<script>  
    import router from "../../router.js"    
    import axios from "axios"    
    export default {    
        name: "Login",    
        data () {
            return {
                formLogin: true,
                formRegister: false
            }
        },
        methods: {    
            login: function (e) {  
                e.preventDefault()    
                
                let username = e.target.elements.username.value 
                let password = e.target.elements.password.value 
                   
                this.$store.dispatch('login', { username, password })
		   		.then(() => this.$router.push('/layout'))
		   		.catch(err => console.log(err))
            },
            register: function (e) {    
                e.preventDefault()    
                let username = ""   
                let password = ""  
                let edad = 0
                let nombre = ""  
                let apellido = ""
                let file = ""
                
                let data = {    
                    username: e.target.elements.username.value,    
                    password: e.target.elements.password.value,
                    edad: e.target.elements.edad.value,
                    nombre: e.target.elements.nombre.value,
                    apellido: e.target.elements.apellido.value,
                    file: e.target.elements.file.value    
                }    
                    /*axios.post("/api/login/signup", data)    
                        .then((response) => {    
                            console.log("registered")    
                            //si sale bien lo mango al dashboard
                            router.push("/")    
                        })    
                        .catch((errors) => {   
                            console.log(data) ;
                            console.log("Cannot register")    
                        }) */  

                let formData = new FormData();
                formData.append('file', this.file);
                formData.append ('username', e.target.elements.username.value)
                formData.append ('password', e.target.elements.password.value)
                formData.append ('edad', e.target.elements.edad.value)
                formData.append ('nombre', e.target.elements.nombre.value)
                formData.append ('apellido', e.target.elements.apellido.value)

                this.$store.dispatch('register', formData)
                .then(() => this.$router.push('/layout'))
                .catch(err => console.log(err)) 
            },
            onImageSelect(){
                const file = this.$refs.file.files[0];
                this.file = file;
                console.log ("file seleccionado")
                console.log(this.file)
            },
    
        }    
    }
</script>


<style>

@import url('https://fonts.googleapis.com/css?family=Poppins');

/* BASIC */

html {
  background-color: #56baed;
}

body {
  font-family: "Poppins", sans-serif;
  height: 100vh;
}

a {
  color: #92badd;
  display:inline-block;
  text-decoration: none;
  font-weight: 400;
}

h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display:inline-block;
  margin: 40px 8px 10px 8px; 
  color: #cccccc;
}



/* STRUCTURE */

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column; 
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  text-align: center;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}



/* TABS */

h2.inactive {
  color: #cccccc;
}

h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}



/* FORM TYPOGRAPHY*/

input[type=button], input[type=submit], input[type=reset]  {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
  box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type=button]:hover, input[type=submit]:hover, input[type=reset]:hover  {
  background-color: #39ace7;
}

input[type=button]:active, input[type=submit]:active, input[type=reset]:active  {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type=text], input[type=password],input[type=number] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type=text]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input[type=text]:placeholder {
  color: #cccccc;
}



/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@-moz-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

.fadeIn {
  opacity:0;
  -webkit-animation:fadeIn ease-in 1;
  -moz-animation:fadeIn ease-in 1;
  animation:fadeIn ease-in 1;

  -webkit-animation-fill-mode:forwards;
  -moz-animation-fill-mode:forwards;
  animation-fill-mode:forwards;

  -webkit-animation-duration:1s;
  -moz-animation-duration:1s;
  animation-duration:1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after{
  width: 100%;
}



/* OTHERS */

*:focus {
    outline: none;
} 

#icon {
  width:60%;
}

* {
  box-sizing: border-box;
}

</style>


