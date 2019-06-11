<template>
<!--
<div>

    <h1>Bitcoin Price Index</h1>
  <div  v-for="item in todo" class="todo" :key = "item">
    {{ item.id }}:
    <span class="lighten">
      
    </span>
  </div>
  

</div>
-->



<v-container grid-list-xl>

<v-alert
      :value="alerteventedit"
      type="success"
      transition="scale-transition"
      >
      Se modifico el evento correctamente
      </v-alert>

      <v-alert
      :value="alerteventasist"
      type="success"
      transition="scale-transition"
      >
      Se asistió al evento correctamente
      </v-alert>

    <v-layout wrap>

      


      <v-flex xs4
        v-for="(item, index) in todo"
        :key="index"
        mb-2>


        
        <v-dialog v-model="dialog" max-width="500px">
        <!-- <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn> -->
        <v-card>
        <v-card-title>
        <span class="headline">Editar evento</span>
        </v-card-title>

        <v-card-text>
        <v-container grid-list-md>
        <v-layout wrap>
        <v-flex xs12 sm6 md4>
        <v-text-field v-model="editedEvent.nombre" label="Nombre"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <label>Fecha: </label>
        <Datepicker v-model="editedEvent.fecha" placeholder="Selecciona la fecha" class="input"></Datepicker>
        </v-flex>
        <v-flex xs12 sm6 md4>
        <v-text-field v-model="editedEvent.precio" label="Precio"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md4>
        <v-text-field v-model="editedEvent.direccion " label="Direccion"></v-text-field>
        </v-flex>
        </v-layout>
        </v-container>
        </v-card-text>

        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
        </v-card>
        </v-dialog>

        <v-card>
          <v-img
            :src="item.Poster"
            aspect-ratio="1"
          ></v-img>

<v-card-title primary-title>
            <div>
              <h2>{{item.nombre}}</h2>
              <div>Fecha: {{item.fecha}}</div>
              <div>Precio: {{item.precio}}</div>
              <div>Direccion: {{item.direccion}}</div>
            </div>
          </v-card-title>

<v-card-actions class="justify-center">
            <v-btn flat
              color="green"
              @click="editEvent(item._id)"
              >Editar</v-btn>
              <v-btn flat
              color="green"
              @click="asistEvent(item._id,$store.getters.user._id)"
              >Asistir</v-btn>
          </v-card-actions>

</v-card>
      </v-flex>
  </v-layout>
  </v-container>







</template>
<script src="./src\components\Events\ListEvent.js"></script>


