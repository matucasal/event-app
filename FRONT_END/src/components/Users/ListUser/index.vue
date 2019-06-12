<template>
  <v-data-table
    :headers="headers"
    :items="users"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td class="text-xs-right">{{ props.item.username }}</td>
      <td class="text-xs-right">{{ props.item.nombre }}</td>
      <td class="text-xs-right">{{ props.item.apellido }}</td>
      <td class="text-xs-right">{{ props.item.edad }}</td>
      
    </template>
  </v-data-table>
</template>


<script>
    import axios from "axios"    
    export default {
        data () {
            return {
                headers: [
                {
                    text: 'Username',
                    align: 'left',
                    sortable: false,
                    value: 'username'
                },
                { text: 'Nombre', value: 'nombre' },
                { text: 'Apellido', value: 'apellido' },
                { text: 'Edad', value: 'edad' },
                
                ],
                users: []
                
            }
        },
        methods: {
            fetchUsersCollection () {
                return axios ({url: '/api/Users', method: 'GET' })
                //return axios.get(url: '/api/Events')
                .then(response => {
                return response.data
                }).then (data => {
                    this.users = data
                    console.log(data)
                } )
            },
        },
        mounted() {
            this.fetchUsersCollection()
        } 
    }
</script>

