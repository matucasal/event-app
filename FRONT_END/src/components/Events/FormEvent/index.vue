

<template>
  <div class="form pt-10">
    <div class="summary text-red" v-if="$v.form.$error">
      Form has errors
    </div>
    <form @submit.prevent="submit">
      <div class="flex justify-center my-6">
        <div
           class="px-4"
           :class="{ 'hasError': $v.form.nombre.$error }">
          <label class="mr-2 font-bold text-grey">Nombre</label>
          <input type="text" class="input" v-model="form.nombre">
        </div>
        <div
           class="px-4"
           :class="{ 'hasError': $v.form.direccion.$error }">
          <label class="mr-2 font-bold text-grey">Direccion</label>
          <input type="text" class="input" v-model="form.direccion">
        </div>
        <!-- <div
           class="px-4"
           :class="{ 'hasError': $v.form.fecha.$error }">
          <label class="mr-2 font-bold text-grey">Fecha</label>
          <input type="text" class="input" v-model="form.fecha">
        </div>-->
        <div
           class="px-4"
           :class="{ 'hasError': $v.form.fecha.$error }">
         <label class="mr-2 font-bold text-grey">Fecha</label>
          <!-- <input type="text" class="input" v-model="form.fecha"> -->
         <Datepicker v-model="form.fecha" placeholder="Selecciona la fecha" class="input"  ></Datepicker>
        </div>


        <div
           class="px-4"
           :class="{ 'hasError': $v.form.precio.$error }">
          <label class="mr-2 font-bold text-grey">Precio</label>
          <input type="text" class="input" v-model="form.precio">
        </div>
      </div>
      <div class="text-center">
        <button type="submit" class="button">
          Submit
        </button>
      </div>
    </form>
  </div>

</template>
<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import Datepicker from "vuejs-datepicker";

export default {
  name: "FormEvent",

  data() {
    return {
      form: {
        nombre: "",
        precio: "",
        fecha: "",
        direccion: ""
      }
    };
  },

  components: {
    Datepicker
  },

  validations: {
    form: {
      nombre: { required, min: minLength(5) },
      direccion: { required},
      fecha: { required},
      precio: { required}
      //email: { required, email }
    }
  },

  methods: {
    submit() {
      this.$v.form.$touch();
      if(this.$v.form.$error) return
      // to form submit after this
      console.log(this.$v.form.$model.fecha);
      //Ahora tengo que mandarlo por axios
    }
  }
};
</script>


