<template>
    <div class="fixed-center">
      <q-card class="card">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            <q-avatar>
              <img src="../../assets/icons/AppIcon.png">
            </q-avatar>
            &nbsp;&nbsp;&nbsp;
            Reset Password
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="q-pt-md">
          <q-form ref="resetPasswordForm">
            <q-input
              type="email"
              v-model="form.email"
              label="Email *"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Please type your email']"
            />
          </q-form>
          <q-card-actions align="right">
            <div class="row q-mt-xs">
              <q-btn
                class="q-pl-md q-pr-md q-mr-md text-capitalize rounded-borders"
                label="Submit"
                color="primary"
                @click="resetPassword"
                :loading="loading2"
                :disable="loading2"
              >
                <template v-slot:loading>
                  <q-spinner-facebook />
                </template>
              </q-btn>
            </div>
          </q-card-actions>
        </q-card-section>
      </q-card>
    </div>
</template>

<script>
import firebase from 'firebase'
import commonMixins from '../../mixins/commonMixins'
export default {
  name: 'ForgotPassword',
  mixins: [commonMixins],
  data () {
    return {
      loading2: false,
      form: {
        email: ''
      },
      icon: '../../assets/icons/AppIcon.png'
    }
  },
  methods: {
    resetPassword () {
      if (!this.form.email.length) {
        return this.matchNotif('Enter email address', 'red')
      }
      this.loading2 = true
      firebase.auth().sendPasswordResetEmail(this.form.email)
        .then(() => {
          this.matchNotif('Check your Email to Reset Password', 'green')
          this.form.email = ''
          this.loading2 = false
        })
        .catch(error => {
          // eslint-disable-next-line no-unused-vars
          var errorMessage = error.message
          this.matchNotif('Invalid Email. Does not exist !', 'red')
          this.loading2 = false
        })
    }
  }
}
</script>

<style scoped>
  .card {
    width: 400px;
    max-width: 80vw;
  }

</style>
