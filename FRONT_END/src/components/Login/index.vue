<template>  
    <div>    

<router-link tag="li" to="/register">
  <a>Register</a>
</router-link>

        <h2>Login</h2>    
        <form v-on:submit="login">    
            Username: <input type="text" name="username" /><br>    
            Password: <input type="password" name="password" /><br>    
            <input type="submit" value="Login" />    
        </form>    
    </div>


    
</template>

<script>  
    import router from "../../router.js"    
    import axios from "axios"    
    export default {    
        name: "Login",    
        methods: {    
            login: function (e) {  
                e.preventDefault()    
                
                let username = e.target.elements.username.value 
                let password = e.target.elements.password.value 
                   
                this.$store.dispatch('login', { username, password })
		   		.then(() => this.$router.push('/layout'))
		   		.catch(err => console.log(err))
            }    
        }    
    }
</script>

