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
      getMatches: 'FETCH_MATCHES',
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
      this.$q.dialog({
        title: '<p class="text-red">Check your internet connection! 😥<p>',
        message: 'Click <span class="text-primary "><strong> OK </strong></span> to retry',
        html: true,
        medium: true,
        ok: {
          push: true
        },
        persistent: true
      }).onOk(() => {
        // console.log('>>>> OK')
        this.$store.dispatch('FETCH_MATCHES')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    // i have used matchNotify to notify errors instead of matchDialog
    matchNotif (message, type) {
      this.$q.notify({
        message: message,
        color: type,
        position: 'top',
        icon: 'announcement',
        progress: true,
        persistent: true
        // classes: 'glossy'
      })
    }
  },

  watch: {
    notification: {
      deep: true,
      handler () {
        if (
          Object.entries(this.notification).length !== 0 && this.notification.constructor === Object) {
          this.matchDialog()
          // this.matchNotif()
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
            this.matchDialog()
            // this.matchNotif()
          })
          // reset the store for the next action call
          this.$store.commit('SET_ERRORS', [])
        }
      }
    }
  }
}

export default commonMixins
