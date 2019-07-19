import eventApi from '@/services/EventApi'
import Datepicker from "vuejs-datepicker";
import axios from 'axios'


export default {
  data () {
    return {
      usersInEvent: null,
      todo: null,
      formDialog: false,
      alerteventasist: false,
      alerteventedit: false,
      alerteventdelete : false,
      listUsersdialog: false,
      imageEventDialog: false,
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
      file: '',
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
      console.log (id)
      console.log(user_id)
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
    onImageSelect(){
      const file = this.$refs.file.files[0];
      this.file = file;
      console.log ("file seleccionado")
      console.log(this.file)
    },

    showAddImageToEvent(id){
      this.imageEventDialog = true;
      this.editedIndex = id;
    },

    addImageToEvent(){
      this.imageEventDialog = true;
      //Creo el form data que es para guardar archivos y le mando todo l ode siempre
      let formData = new FormData();
      formData.append('file', this.file);
      axios.post( '/api/Events/' + this.editedIndex + '/image' ,formData).then(resp => {
          console.log(resp)
          console.log ( "Agrego la imagen el evento");
          this.imageEventDialog = false
          this.getEvents()

      })


    },

    deleteEvent (id){
      eventApi.deleteEvent(id)
      // no hace falta ver el resposne
      this.getEvents()
      this.alerteventdelete = true
      setTimeout(() => {
        this.alerteventdelete = false
      }, 1000)

      console.log("se borro el evento")
       
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
