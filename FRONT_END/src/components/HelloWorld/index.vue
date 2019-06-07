<template>
  <div class="hello">
    <h1>This is homepage</h1>
  </div>
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
          this.getUserData();
        }, 
        methods: {    
          getUserData() {
            let self = this    
            axios.get("/api/login/user")    
            .then((response) => {    
              console.log(response)    
              self.$set(this, "user", response.data.user)    
              router.push("/layout")    
            })    
            .catch((errors) => {    
              console.log(errors)    
              //router.push("/")    
              router.push("/login")    
            })    
          }    
        }



    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>