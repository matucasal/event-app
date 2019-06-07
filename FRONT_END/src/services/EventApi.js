import axios from 'axios'

const resource = '/todos';


export default {

  fetchEventCollection () {
    return axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        return response.data
      })
  },

  fetchSingleEvent (id) {
    return axios.get('https://jsonplaceholder.typicode.com/todos' + id)
      .then(response => {
        return response.data
      })
  }
}