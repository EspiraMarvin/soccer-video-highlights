<template>
  <div class="fixed-center">
    <q-card class="card">
          <q-card-section class="row flex flex-center items-center">
            <div class="text-subtitle1 flex justify-center items-center flex-center">
              <q-avatar size="sm" class="q-mr-sm">
                <q-img src="../../assets/icons/AppIcon.png" />
              </q-avatar>
              Reset Password
            </div>
            <!-- <q-space /> -->
            <q-btn icon="close" class="absolute-right q-px-sm" flat round dense v-close-popup  />
          </q-card-section>
          <div class="flex flex-center q-py-md q-px-sm hidden" v-if="resetPwdMessage">
            <q-chip size="14px" color="green" :class="resetPwdMessage ? '' : 'hidden' ">
                {{ resetPwdMessage }}
            </q-chip>
          </div>
          <q-card-section class="q-pt-md">
            <q-form
              ref="resetPasswordForm"
            >
              <q-input
                type="email"
                v-model="form.email"
                label="Your Email Address *"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Please type your email']"
              />
            </q-form>
            <q-card-actions>
              <div class="row full-width q-mt-xs">
                <q-btn
                  class="q-pl-md row full-width q-pr-md q-mr-md text-capitalize rounded-borders"
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
  props: ['resetPwdDialog'],
  data () {
    return {
      loading2: false,
      form: {
        email: ''
      },
      resetPwdMessage: '',
      closeResetFormDialog: this.resetPwdDialog
    }
  },
  methods: {
    closeResetPwdForm () {
      this.$emit('closeForm', false)
    },
    resetPassword () {
      if (!this.form.email.length) {
        this.$refs.resetPasswordForm.focus()
        return
      }
      this.loading2 = true
      firebase.auth().sendPasswordResetEmail(this.form.email)
        .then(() => {
          this.matchNotif({ message: 'Check your Email to Reset Password', type: 'green' })
          this.form = {}
          this.loading2 = false
          this.closeResetFormDialog = false
          this.closeResetPwdForm()
        })
        .catch(error => {
          console.log('error', error)
          const errorMessage = error.message
          this.matchNotif({ message: errorMessage, type: 'red' })
          // this.matchNotif({ message: 'Invalid Email. Does not exist !', type: 'red' })
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
