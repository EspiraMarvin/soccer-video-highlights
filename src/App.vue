<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { firebaseAuth } from 'boot/firebase'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  created () {
    // firebase
    firebaseAuth.onAuthStateChanged((auth) => {
      if (auth) {
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
      updateUserDetails: 'USER_DETAILS'
    })
  }
}
</script>
