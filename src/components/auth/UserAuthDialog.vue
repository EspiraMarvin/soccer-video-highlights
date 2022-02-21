
<template>
  <div>
    <template v-if="user.auth">
      <template v-if="user.auth">
        <q-btn round color="green" class="small-screen-only" @click="btnConfirmLogout">
          <q-avatar size="42px">
            <q-img ref="userImage" :src="user.userPhoto" />
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
      <q-btn round color="grey-5" unelevated  icon="eva-person-outline" class="small-screen-only" @click="btnLogin" />
    </template>

    <template v-if="user.auth">
        <q-btn-dropdown class="large-screen-only" :label="user.userName ?  user.userName : user.email ">
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
          <div class="text-h6 flex text-center">
            <q-avatar size="md" class="q-ml-lg">
              <q-img src="../../assets/icons/AppIcon.png" />
            </q-avatar> &nbsp;
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
          <q-form ref="loginForm" :class="$q.screen.gt.sm ? 'q-px-lg' : ''">
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
          <q-card-actions class="row">
            <div class="row q-mt-xs full-width q-px-lg" v-if="method === 'sign up'">
              <q-btn
                class="q-px-md text-capitalize rounded-borders full-width"
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
            <div class="row full-width q-mt-xs" v-if="method === 'sign in'">
              <q-btn
                class="q-px-lg full-width text-capitalize rounded-borders"
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
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserAuthDialog',
  components: { Terms, ForgotPassword },
  mixins: [commonMixins],
  data () {
    return {
      form: {
        email: '',
        password: '',
        accept: false
      },
      userAccountDialog: false,
      resetPwdDialog: false,
      dialogTitle: '',
      method: '',
      loading2: false,
      confirm: false,
      image: '',
      fixed: false
    }
  },

  computed: {
    ...mapGetters({
      checkAuthForSignInPrompt: 'GET_IF_AUTH',
      user: 'GET_CURRENT_USER'
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
    ...mapActions({
      updateUserDetails: 'USER_DETAILS',
      logout: 'LOGOUT_USER'
    }),
    // show terms  and conditions
    terms () {
      this.fixed = !this.fixed
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
          this.matchNotif({ message: 'Signed Out', type: 'green', avatar: this.user.userPhoto })
          this.logout('')
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
          const avatar = auth.user.photoURL
          const userDetails = {
            auth: true,
            userName: auth.user.displayName,
            userPhoto: auth.user.photoURL,
            userNumber: auth.user.phoneNumber,
            userEmail: auth.user.email
          }
          this.updateUserDetails(userDetails)
          this.userAccountDialog = false
          this.loading2 = true
          this.userAccountDialog = false
          this.form = {}
          return this.matchNotif({ message: 'User Created Successfully', type: 'green', avatar: avatar })
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
          // eslint-disable-next-line no-unused-vars
          const user = userCredential.user
          const avatar = user.photoURL
          const userDetails = {
            auth: true,
            userName: user.displayName,
            userPhoto: user.photoURL,
            userNumber: user.phoneNumber,
            userEmail: user.email
          }
          this.updateUserDetails(userDetails)
          this.loading2 = false
          this.userAccountDialog = false
          this.form = {}
          return this.matchNotif({ message: 'Signed In successfully', type: 'green', avatar: avatar })
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
          // eslint-disable-next-line no-unused-vars
          const credential = result.credential
          const avatar = result.user.photoURL
          const userDetails = {
            auth: true,
            userName: result.user.displayName,
            userPhoto: result.user.photoURL,
            userNumber: result.user.phoneNumber,
            userEmail: result.user.email
          }
          this.updateUserDetails(userDetails)
          this.userAccountDialog = false
          this.matchNotif({ message: 'Sign In Success', type: 'green', avatar: avatar })
        })
        .catch((error) => {
          var errorMessage = error.message
          // The email of the user's account used.
          this.matchNotif({ message: errorMessage, type: 'red' })
          var email = error.email
          // The firebase.auth.AuthCredential type that was used.
          this.matchNotif({ message: email, type: 'red' })
          var credential = error.credential
          this.matchNotif({ message: credential, type: 'red' })
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
