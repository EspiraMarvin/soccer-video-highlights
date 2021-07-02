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
    // i have used matchNotify to notify errors instead of matchDialog
    matchNotif (notification) {
      console.log('notification mixins', notification)
      console.log('mixins avatar', notification.avatar)
      this.$q.notify({
        message: notification.message,
        color: notification.type,
        position: notification.position,
        // icon: 'announcement',
        avatar: notification.avatar
        // avatar: 'https://lh3.googleusercontent.com/a-/AOh14Ghg9eraTVVjpuwF1GC2LN6bNZsC8YBgRedYd5uwTg=s96-c'
        // avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'
        // classes: 'glossy'
      })
    },
    matchNotifErr (notification) {
      this.$q.notify({
        message: notification.message,
        color: notification.type
      })
    },
    MatchNotifyType (message, type) {
      this.$q.notify({
        type: type,
        message: message,
        icon: 'announcement'
      })
    },

    matchDialog () {
      this.$q.dialog({
        // title: this.notification.message,
        title: '<p class="text-red">Check your internet connection! 😥<p>',
        message: 'Click <span class="text-primary "><strong> OK </strong></span> to retry',
        html: true,
        medium: true,
        ok: {
          push: true
        }
      }).onOk(() => {
        // console.log('>>>> OK')
        this.$store.dispatch('FETCH_MATCHES').catch(e => console.log(e))
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  },

  watch: {
    notification: {
      deep: true,
      handler () {
        if (
          Object.entries(this.notification).length !== 0 && this.notification.constructor === Object) {
          // this matchNotif below, notifies that we cant fetch data.. I have commented out for better UI just like LinkedIn
          // this.matchNotif(this.notification)
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
            // this.matchNotif()
            // this.MatchNotifyType('negative', error, 'top')
            // console.log('errors', error)
          })
          // reset the store for the next action call
          this.$store.commit('SET_ERRORS', [])
        }
      }
    }
  }
}

export default commonMixins
