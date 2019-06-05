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
            login: (e) => {    
                e.preventDefault()    
                let username = ""   
                let password = ""    
                let login = () => {    
                    let data = {    
                        username: e.target.elements.username.value,    
                        password: e.target.elements.password.value    
                    }    
                    axios.post("/api/login", data)    
                        .then((response) => {    
                            console.log("Logged in")    
                            //si sale bien lo mango al dashboard
                            router.push("/layout")    
                        })    
                        .catch((errors) => {    
                            console.log("Cannot log in")    
                        })    
                }    
                login()    
            }    
        }    
    }
</script>

