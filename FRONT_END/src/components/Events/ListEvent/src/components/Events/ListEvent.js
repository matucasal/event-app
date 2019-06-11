import eventApi from '@/services/EventApi'
import Datepicker from "vuejs-datepicker";
export default {
  data () {
    return {
      todo: null,
      dialog: false,
      alerteventasist: false,
      alerteventedit: false,
      editedEvent: {
        nombre: '',
        precio: 0,
        fecha:'',
        direccion: ''
      },
      defaultEvent: {
        nombre: '',
        precio: 0,
        fecha:'',
        direccion: ''
      },
      editedIndex: -1,
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  components: {
    Datepicker
  },
  mounted () {
    this.getEvents()
  },
  methods: {

    getEvents () {
      eventApi.fetchEventCollection()
      .then(response => {
        this.todo = response
      })
      .catch(error => {
        console.log(error)
      })
    },

    singleEvent (id) {
      this.$router.push('/event/' + id)
    }

    ,editEvent (id) {
      console.log("Toco este id :" + id)
      eventApi.fetchSingleEvent(id)
      .then(response => {
        //this.todo = response
        return response
      }).then(data => {
        this.editedIndex = data._id
        this.editedEvent = Object.assign({}, data)
        this.dialog = true
      })
      .catch(error => {
        console.log(error)
      })

    }
    ,asistEvent (id, user_id) {
      eventApi.asistEvent(id,user_id)
      .then(response => {
        console.log("Asisti bien al evento")
        this.alerteventasist = true
        setTimeout(() => {
          this.alerteventasist = false
        }, 1000)
        return response
      }).then(data => {
        //this.editedIndex = data._id
        //this.editedEvent = Object.assign({}, data)
        //this.dialog = true
      })
      .catch(error => {
        console.log(error)
      })

    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedEvent = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    //despues lo guardo oficialmente
    save () {
      if (this.editedIndex) {
        console.log("Estoy en el if")
        eventApi.updateEvent (this.editedIndex,this.editedEvent).then( response => {
          this.alerteventedit = true
          setTimeout(() => {
            this.alerteventedit = false
          }, 1000)
        })
        //cargo de nuevo la lsita de eventos
        this.getEvents()
        this.close()
      }
    }
  }
}
