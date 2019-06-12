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

    <v-layout row wrap>

      


    <v-flex xs12
      v-for="(item, index) in todo"
      :key="index"
      mb-2>
        <!-- Este el dialog del form -->
        <v-dialog v-model="formDialog" max-width="500px">
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

        <!-- Este es el dialog del listado de usuarios-->
        <v-dialog v-model="listUsersdialog" scrollable max-width="300px">
              <v-card>
                <v-card-title>Listado de asistentes al evento</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 300px;">
                <!-- aca armo la lista -->
                <v-list three-line>
                  <template v-for="(user, index) in usersInEvent" >
                 

                  <v-list-tile
                  :key="index"
                  avatar
                  @click=""
                  >
                  <v-list-tile-avatar>
                  <img :src="user.avatar">
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                  <v-list-tile-title v-html="user.username"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="user.nombre"></v-list-tile-sub-title>
                  <v-list-tile-sub-title v-html="user.apellido"></v-list-tile-sub-title>
                  </v-list-tile-content>
                  </v-list-tile>
                  </template>
                </v-list>
                <!-- fin de la lista -->


                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn color="blue darken-1" flat @click="closeEventAsistantsDialog">Close</v-btn>
                </v-card-actions>
              </v-card>
          </v-dialog>


        <v-card>
          <v-img
            :src="item.Poster"
            aspect-ratio="1"
          ></v-img>

          <v-card-title primary-title class="justify-center">
            <div>
              <h2>{{item.nombre}}</h2>
              <div>Fecha: {{item.fecha}}</div>
              <div>Precio: {{item.precio}}</div>
              <div>Direccion: {{item.direccion}}</div>
            </div>
          </v-card-title>

            <v-card-actions class="justify-center" width="50%"> 
            <v-btn 
              color="green"
              @click="editEvent(item._id)"
              >Editar</v-btn>
              <v-btn 
              color="green"
              @click="asistEvent(item._id,$store.getters.user._id)"
              >Asistir</v-btn>
              <v-btn 
              color="green"
              @click="eventAsistants(item._id)"
              >Ver asistentes</v-btn>
              <v-btn 
              color="red"
              @click="deleteEvent(item._id)"
              >Borrar evento</v-btn>
            </v-card-actions>
          </v-card>
    </v-flex>


  </v-layout>
  </v-container>







</template>
<script src="./src\components\Events\ListEvent.js"></script>


