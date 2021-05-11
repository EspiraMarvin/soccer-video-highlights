
<template>
  <div>

    <template v-if="this.auth">
      <template v-if="this.image">
        <q-btn round color="green" class="small-screen-only" @click="btnConfirmLogout">
          <q-avatar size="42px">
            <img :src="image">
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

    <template v-if="this.auth">
      <template v-if="this.user">
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
          <div class="text-h6">
            <q-avatar size="md">
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
              @click="withGoogle"
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
            <q-toggle ref="term" v-if="method === 'sign up'" size="xs" v-model="form.accept" label="I accept the license and terms"/>
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
              Or<q-btn
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
              Or<q-btn
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
          <q-btn
            v-if="method === 'sign up'"
            flat
            @click="terms"
            label="Terms and Conditions"
            color="secondary"
            class="text-capitalize rounded-borders"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!--      reset password dialog-->

      <q-dialog v-model="resetPwdDialog">
        <ForgotPassword :resetPwdDialog="resetPwdDialog" />
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
import firebase from 'firebase'
import commonMixins from '../../mixins/commonMixins'
import { mapActions, mapGetters } from 'vuex'
import ForgotPassword from './ForgotPassword'
import Terms from '../Terms/Terms'

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
      loading2: false,
      confirm: false,
      fixed: false
    }
  },
  created () {
    // firebase
    this.loginUser()
  },
  computed: {
    ...mapGetters({
      auth: 'GET_AUTH',
      user: 'GET_DISPLAY_NAME',
      image: 'GET_USER_PHOTO'
    })
  },
  methods: {
    ...mapActions({
      loginUser: 'LOGIN_USER',
      withGoogle: 'GOOGLE',
      withEMailAndPassword: 'EMAIL_AND_PASSWORD',
      withsignInExistingUser: 'SIGNIN_EXISTING_USER'
    }),
    terms () {
      this.fixed = true
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
    btnConfirmLogout () {
      this.userAccountDialog = false
      this.confirm = true
    },
    btnLogout () {
      firebase.auth().signOut()
        .then(() => {
          this.auth = false
          this.confirm = false
          return this.matchNotif('User Signed Out', 'green')
        })
        .catch(error => this.matchNotif(error, 'secondary'))
    },
    createUser () {
      if (!this.form.email || !this.form.password) return this.matchNotif('All fields are required !', 'red')
      if (!this.form.accept) return this.matchNotif('Accept terms of use first', 'red')
      this.loading2 = true
      this.withEMailAndPassword({ email: this.form.email, password: this.form.password })
      this.loading2 = false
    },
    signInExistingUser () {
      if (!this.form.email || !this.form.password) return this.matchNotif('All Fields are required', 'red')
      this.loading2 = true
      this.withsignInExistingUser({ email: this.form.email, password: this.form.password })
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
