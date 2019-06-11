import axios from 'axios'

const resource = '/todos';


export default {

  fetchEventCollection () {
    return axios ({url: '/api/Events', method: 'GET' })
    //return axios.get(url: '/api/Events')
      .then(response => {
        return response.data
      })
  },

  fetchSingleEvent (id) {
    return axios ({url: '/api/Events/' + id, method: 'GET' })
      .then(response => {
        return response.data
      })
  },

  updateEvent (id,data) {
    console.log ("data")
    console.log(data)
    return axios ({url: '/api/Events/' + id, data: data, method: 'POST' })
      .then(response => {
        return response.data
      })
  },

  asistEvent (id, user_id){
    console.log("estoy en asistEvent")
    return axios ({url: '/api/Events/' + id + '/' + user_id, method: 'POST' })
      .then(response => {
        return response.data
      })
  }

}