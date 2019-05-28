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
    <v-layout wrap>
      <v-flex xs4
        v-for="(item, index) in todo"
        :key="index"
        mb-2>
        <v-card>
          <v-img
            :src="item.Poster"
            aspect-ratio="1"
          ></v-img>

<v-card-title primary-title>
            <div>
              <h2>{{item.id}}</h2>
              <!--<div>Year: {{item.Year}}</div>
              <div>Type: {{item.Type}}</div>
              <div>IMDB-id: {{item.imdbID}}</div>-->
            </div>
          </v-card-title>

<v-card-actions class="justify-center">
            <v-btn flat
              color="green"
              @click="singleMovie(item.imdbID)"
              >View</v-btn>
          </v-card-actions>

</v-card>
      </v-flex>
  </v-layout>
  </v-container>







</template>
<script src="./src\components\Events\ListEvent.js"></script>


