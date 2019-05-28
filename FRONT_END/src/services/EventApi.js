import axios from 'axios'

const resource = '/todos';


export default {

  fetchEventCollection () {
    return axios.get(resource)
      .then(response => {
        return response.data
      })
  },

  fetchSingleEvent (id) {
    return axios.get('&id=' + id)
      .then(response => {
        return response.data
      })
  }
}