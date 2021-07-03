<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
// import { firebaseAuth } from 'boot/firebase'
import { firebaseAuth } from 'boot/firebase'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  created () {
    // firebase
    firebaseAuth.onAuthStateChanged((auth) => {
      if (auth) {
        // this.auth = true
        // this.user = auth.displayName
        // this.image = auth.photoURL
        const userDetails = {
          auth: true,
          userName: auth.displayName,
          userPhoto: auth.photoURL,
          userNumber: auth.phoneNumber
        }
        this.updateUserDetails(userDetails)
      } else {
        setTimeout(() => {
          this.$store.dispatch('PROMPT_SIGN_IN', true)
        }, 5000)
      }
    })
  },
  methods: {
    ...mapActions({
      updateUserDetails: 'USER_DETAILS',
      logout: 'lOGOUT_USER'
    })
  }
}
</script>
