<template>
  <div id="app">
    <div class="container">
      <Login></Login>
  </div>
</template>


<script>
  import Layout from "./components/Layout/index.vue";
  import Login from ".components/Login/index.vue"
  export default {
    name: "app",
    //Componentes que agrego
    components: {
      Login
    }
  }
</script>

<style></style>
