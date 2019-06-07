<template>  
    <div>    
        <h2>Register</h2>    
        <form v-on:submit="register">    
            Username: <input type="text" name="username" /><br>    
            Password: <input type="password" name="password" /><br>    
            Edad: <input type="number" name="edad" /><br>    
            Nombre: <input type="text" name="nombre" /><br>    
            Apellido: <input type="text" name="apellido" /><br>    
            <input type="submit" value="Register" />    
        </form>    
    </div>
</template>

<script>  
    import router from "../../router.js"    
    import axios from "axios"    
    export default {    
        name: "Register",    
        methods: {    
            register: function (e) {    
                e.preventDefault()    
                let username = ""   
                let password = ""  
                let edad = 0
                let nombre = ""  
                let apellido = ""
                
                let data = {    
                        username: e.target.elements.username.value,    
                        password: e.target.elements.password.value,
                        edad: e.target.elements.edad.value,
                        nombre: e.target.elements.nombre.value,
                        apellido: e.target.elements.apellido.value    
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
                this.$store.dispatch('register', data)
                .then(() => this.$router.push('/layout'))
                .catch(err => console.log(err)) 
                   
                //register()    
            }    
        }    
    }
</script>

