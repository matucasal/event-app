import eventApi from '@/services/EventApi'
export default {
  data () {
    return {
      todo: null
    }
  },
  mounted () {
    eventApi.fetchEventCollection()
      .then(response => {
        this.todo = response
        console.log(this.todo)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    singleEvent (id) {
      this.$router.push('/event/' + id)
    }
  }
}
