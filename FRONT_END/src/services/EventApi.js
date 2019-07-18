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
    return axios ({url: '/api/Events/' + id, data: data, method: 'POST' })
      .then(response => {
        return response.data
      })
  },

  asistEvent (id, user_id){
    return axios ({url: '/api/Events/' + id + '/users/' + user_id, method: 'POST' })
      .then(response => {
        return response.data
      })
  },

  fetchEventAsistans (id){
    return axios ({url: '/api/Events/' + id + '/users', method: 'GET' })
    .then(response => {
      return response.data
    })
  },

  deleteEvent (id,data) {
    return axios ({url: '/api/Events/' + id, data: data, method: 'DELETE' })
      .then(response => {
        return response.data
      })
  },

}