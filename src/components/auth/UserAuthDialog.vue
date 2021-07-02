
<template>
  <div>
    <template v-if="auth">
      <template v-if="image">
        <q-btn round color="green" class="small-screen-only" @click="btnConfirmLogout">
          <q-avatar size="42px">
            <q-img :src="image" />
          </q-avatar>
        </q-btn>
      </template>
      <template v-else>
        <q-btn round color="green" class="small-screen-only" @click="btnConfirmLogout">
          <q-avatar size="42px">
            <q-btn round color="green" icon="eva-person-done-outline" />
          </q-avatar>
        </q-btn>
      </template>
    </template>
    <template v-else>
      <q-btn round color="grey-5" icon="eva-person-outline" class="small-screen-only" @click="btnLogin" />
    </template>

    <template v-if="auth">
      <template v-if="user">
        <q-btn-dropdown color="bg-green large-screen-only" :label="user">
          <q-list>
            <q-item clickable v-close-popup @click="btnLogout">
              <q-item-section align="center">
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </template>
      <template v-else>
        <q-btn-dropdown color="primary large-screen-only" icon="eva-person-done-outline">
          <q-list>
            <q-item clickable v-close-popup @click="btnLogout">
              <q-item-section align="center">
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </template>
    </template>
    <template v-else>
      <div class="large-screen-only">
        <q-btn
          class="q-pl-sm q-pr-sm q-mr-sm text-capitalize rounded-borders button"
          label="Signin"
          @click="btnLogin"
          color="primary"
        />
      </div>
    </template>

    <!--      dialog for user login and signup-->
    <q-dialog v-model="userAccountDialog">
      <q-card class="card" align="center">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-subtitle1">
            <q-avatar size="sm">
              <img src="../../assets/icons/AppIcon.png">
            </q-avatar>
            {{ dialogTitle }}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <p class="text-weight-light text-center">{{ method }} with </p>
          <div class="row justify-center">
            <q-btn
              class="q-pa-sm q-ma-sm rounded-borders google-button"
              style="margin-top: -5px"
              size="sm"
              label="Google"
              color="primary"
              icon="eva-google"
              @click="google"
            >
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
          </div>
          <q-separator />
          <p class="text-weight-light text-center q-mt-md q-mb-lg">{{ method }} with credentials</p>
          <q-form ref="loginForm">
            <q-input
              type="email"
              v-model="form.email"
              label="Email *"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Please type your email']"
            />
            <q-input
              type="password"
              v-model="form.password"
              label="Password *"
              lazy-rules
              :rules="[val => (val !== null && val !== '') || 'Please type your Password']"
            />
            <q-toggle ref="term" v-if="method === 'sign up'" size="sm" v-model="form.accept"/>
            <q-btn
              v-if="method === 'sign up'"
              flat
              @click="terms"
              label="Accept Terms and Conditions"
              color="secondary"
              class="text-capitalize rounded-borders"
            />
          </q-form>
          <q-card-actions align="right">
            <div class="row q-mt-xs float-right" v-if="method === 'sign up'">
              <q-btn
                class="q-pl-md q-pr-md q-mr-md text-capitalize rounded-borders"
                label="Register"
                @click="createUser"
                color="primary"
                :loading="loading2"
                :disable="loading2"
              >
                <template v-slot:loading>
                  <q-spinner-facebook />
                </template>
              </q-btn>
            </div>
            <div class="row q-mt-xs float-right" v-if="method === 'sign in'">
              <q-btn
                class="q-pl-md q-pr-md q-mr-md text-capitalize rounded-borders"
                label="Login"
                @click="signInExistingUser"
                color="primary"
                :loading="loading2"
                :disable="loading2"
              >
                <template v-slot:loading>
                  <q-spinner-facebook />
                </template>
              </q-btn>
            </div>
          </q-card-actions>

          <div v-if="dialogTitle === 'Create an Account'">
            <p class="text-class">
              Already Registered?  <q-btn
              flat
              label="Login"
              @click="btnLogin"
              color="secondary"
              class="text-capitalize rounded-borders"
            />
            </p>
          </div>
          <div v-if="method === 'sign in'">
            <p class="text-class">
              No Account? <q-btn
              flat
              label="Register"
              @click="btnRegister"
              color="secondary"
              class="text-capitalize rounded-borders"
            />
            </p>
          </div>
          <q-space />
          <q-btn
            v-if="method === 'sign in'"
            flat
            @click="forgotPassword"
            label="Forgot Password?"
            color="secondary"
            class="text-capitalize rounded-borders"
          />

        </q-card-section>
      </q-card>
    </q-dialog>

    <!--      reset password dialog-->

      <q-dialog v-model="resetPwdDialog">
        <ForgotPassword @closeForm="closeResetPwdForm" />
      </q-dialog>

<!--    terms and conditions dialog-->
    <q-dialog v-model="fixed">
      <Terms />
    </q-dialog>

      <!--      confirm dialog-->
      <q-dialog v-model="confirm" transition-show="rotate" transition-hide="rotate" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="warning" color="white" text-color="red" />
            <span class="q-ml-sm">This Action Logs you out . Proceed? </span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Logout" color="red" @click="btnLogout" />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </div>
</template>

<script>
import { firebaseAuth } from 'src/boot/firebase'
import firebase from 'firebase'
import commonMixins from '../../mixins/commonMixins'
import ForgotPassword from './ForgotPassword'
import Terms from '../Terms/Terms'
import { mapGetters } from 'vuex'

export default {
  name: 'UserAuthDialog',
  components: { Terms, ForgotPassword },
  mixins: [commonMixins],
  data () {
    return {
      form: {
        email: '',
        password: '',
        accept: ''
      },
      userAccountDialog: false,
      resetPwdDialog: false,
      dialogTitle: '',
      method: '',
      auth: false,
      loading2: false,
      confirm: false,
      user: '',
      image: '',
      fixed: false
    }
  },
  mounted () {
    // firebase
    firebaseAuth.onAuthStateChanged((auth) => {
      if (auth) {
        this.auth = true
        this.user = auth.displayName
        this.image = auth.photoURL
      } else {
        setTimeout(() => {
          this.$store.dispatch('PROMPT_SIGN_IN', true)
        }, 5000)
      }
    })
  },
  computed: {
    ...mapGetters({
      checkAuthForSignInPrompt: 'GET_IF_AUTH'
    })
  },
  watch: {
    checkAuthForSignInPrompt: {
      handler () {
        const isPromptAuth = this.checkAuthForSignInPrompt
        return isPromptAuth ? this.btnLogin() : ''
      },
      deep: true
    }
  },
  methods: {
    // show terms  and conditions
    terms () {
      this.fixed = !this.fixed
    },
    // prompt sign in After LoadingData
    prompSignInAfterLoadingData () {
      this.btnLogin()
    },
    btnLogin () {
      this.userAccountDialog = true
      this.method = 'sign in'
      this.dialogTitle = 'Login Account'
    },
    btnRegister () {
      this.userAccountDialog = true
      this.method = 'sign up'
      this.dialogTitle = 'Create an Account'
    },
    forgotPassword () {
      this.userAccountDialog = false
      this.resetPwdDialog = true
    },
    // close password reset dialog
    closeResetPwdForm (value) {
      this.resetPwdDialog = value
    },
    // confirm logout action before logging out
    btnConfirmLogout () {
      this.userAccountDialog = false
      this.confirm = true
    },
    // logout user
    btnLogout () {
      firebaseAuth.signOut()
        .then(() => {
          this.auth = false
          this.confirm = false
          return this.matchNotif({ message: 'Signed Out', type: 'green', avatar: this.image })
        })
        .catch(error => this.matchNotif({ message: error, type: 'secondary' }))
    },
    // firebase register new user
    createUser () {
      if (!this.form.email || !this.form.password) {
        this.$refs.loginForm.focus()
        return
      }
      if (!this.form.accept) return this.matchNotif({ message: 'Accept terms of use first', type: 'red' })
      this.loading2 = true
      firebaseAuth.createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(auth => {
          this.user = auth.user.displayName
          this.image = auth.user.photoURL
          this.userAccountDialog = false
          this.loading2 = true
          this.userAccountDialog = false
          return this.matchNotif({ message: 'User Created Successfully', type: 'green' })
        })
        .catch(error => {
          // eslint-disable-next-line no-unused-vars
          var errorCode = error.code
          var errorMessage = error.message
          this.matchNotif({ message: errorMessage, type: 'red' })
          this.loading2 = false
        })
    },
    signInExistingUser () {
      if (!this.form.email || !this.form.password) {
        this.$refs.loginForm.focus()
        return
      }
      this.loading2 = true
      firebaseAuth.signInWithEmailAndPassword(this.form.email, this.form.password)
        .then((userCredential) => {
          // Signed in
          // eslint-disable-next-line no-unused-vars
          const user = userCredential.user
          this.user = user.displayName
          this.image = user.photoURL
          // ...
          this.loading2 = false
          this.userAccountDialog = false
          return this.matchNotif({ message: 'Signed In successfully', type: 'green' })
        })
        .catch((error) => {
          // eslint-disable-next-line no-unused-vars
          var errorMessage = error.message
          this.loading2 = false
          return this.matchNotif({ message: 'User Does Not Exist !', type: 'red' })
        })
    },
    google () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebaseAuth.signInWithPopup(provider)
        .then(result => {
          const credential = result.credential
          console.log('credential', credential)
          this.user = result.user.displayName
          this.image = result.user.photoURL
          const avatar = result.user.photoURL
          this.userAccountDialog = false
          this.matchNotif({ message: 'Sign In Success', type: 'green', avatar: avatar })
        })
        .catch((error) => {
          // eslint-disable-next-line no-unused-vars
          var errorCode = error.code
          // eslint-disable-next-line no-unused-vars
          var errorMessage = error.message
          // The email of the user's account used.
          this.matchNotifErr({ message: errorMessage, type: 'red' })
          var email = error.email
          // The firebase.auth.AuthCredential type that was used.
          this.matchNotif(email, 'red')
          var credential = error.credential
          // this.matchNotif({ message: credential, type: 'red' })
          this.matchNotifErr({ message: credential, type: 'red' })
        })
    }
  }
}
</script>

<style scoped>
  .google-button{
    width: 200px
  }
  .button {
    display: inline-block;
    box-sizing: border-box;
  }
  .card {
    width: 400px;
    max-width: 80vw;
  }
</style>
