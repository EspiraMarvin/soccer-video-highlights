import { mapGetters } from 'vuex'

const commonMixins = {
  created () {

  },

  data () {
    return {

    }
  },

  computed: {
    ...mapGetters({
      notification: 'GET_NOTIFICATION',
      errors: 'GET_ERRORS'
    })
  },

  mounted () {

  },

  methods: {
    matchDialogClick () {
      window.location.reload()
    },
    matchDialog () {
      setTimeout(() => {
        this.$q.dialog({
          title: 'error',
          message: "You're Offline!"
        }).onOk(() => {
          // this.matchDialogClick()
        })
      }, 3000)
    },
    // i have used matchNotify to notify errors instead of matchDialog
    matchNotif () {
      setTimeout(() => {
        this.$q.notify({
          message: "You're Offline !",
          color: 'red',
          icon: 'announcement',
          progress: true,
          persistent: true,
          classes: 'glossy'
        })
      }, 3000)
    }
  },

  watch: {
    notification: {
      deep: true,
      handler () {
        if (
          Object.entries(this.notification).length !== 0 &&
          this.notification.constructor === Object
        ) {
          // this.matchDialog()
          this.matchNotif()
          // reset the store for the next action call
          this.$store.commit('SET_NOTIFICATION', {})
        }
      }
    },
    errors: {
      deep: true,
      handler () {
        if (this.errors.length !== 0) {
          // eslint-disable-next-line handle-callback-err
          this.errors.forEach(error => {
            // this.matchDialog()
            this.matchNotif()
          })
          // reset the store for the next action call
          this.$store.commit('SET_ERRORS', [])
        }
      }
    }
  }
}

export default commonMixins
