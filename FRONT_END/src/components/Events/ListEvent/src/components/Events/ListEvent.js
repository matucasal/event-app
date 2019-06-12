import eventApi from '@/services/EventApi'
import Datepicker from "vuejs-datepicker";
export default {
  data () {
    return {
      usersInEvent: null,
      todo: null,
      formDialog: false,
      alerteventasist: false,
      alerteventedit: false,
      listUsersdialog: false,
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
        this.formDialog = true
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


    eventAsistants(id) {
      this.listUsersdialog = true;
      console.log("Toco este id :" + id)
      eventApi.fetchEventAsistans(id)
      .then(response => {
        //this.todo = response
        return response
      }).then(data => {
        //this.editedIndex = data._id
        //this.editedEvent = Object.assign({}, data)
        //this.dialog = true
        //aca tengo que ver que hacer todavia
        this.usersInEvent = Object.assign({}, data)
        console.log(data)
      })
      .catch(error => {
        console.log(error)
      })

    },

    deleteEvent (id){
      this.listUsersdialog = true;
      console.log("Toco este id :" + id)
      eventApi.deleteEvent(id)
      .then(response => {
        //this.todo = response
        return response
      }).then(data => {
        //this.editedIndex = data._id
        //this.editedEvent = Object.assign({}, data)
        //this.dialog = true
        //aca tengo que ver que hacer todavia
        //this.usersInEvent = Object.assign({}, data)
        console.log("se borro el evento")
      })
      .catch(error => {
        console.log(error)
      })

    },

    closeEventAsistantsDialog(){
      this.listUsersdialog = false
      this.usersInEvent = ''

    },

    close () {
      this.formDialog = false
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
