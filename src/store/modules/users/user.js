import firebase from 'firebase'
import commonMixins from 'src/mixins/commonMixins'

const state = () => ({
  user: {},
  token: '',
  currentUser: '',
  addingUser: false,
  auth: false,
  displayName: '',
  userPhoto: '',
  error: '',
  success: ''
})

const getters = {
  GET_TOKEN: state => state.token,
  GET_CURRENT_USER: state => state.currentUser,
  GET_ADDING_USER: state => state.addingUser,
  GET_AUTH: state => state.auth,
  GET_DISPLAY_NAME: state => state.displayName,
  GET_USER_PHOTO: state => state.userPhoto

}

const mutations = {
  SET_TOKEN (state, data) {
    state.token = data
  },
  SET_CURRENT_USER (state, data) {
    state.currentUser = data
  },
  SET_ADDING_USER (state, data) {
    state.addingUser = data
  },
  SET_AUTH (state, data) {
    state.auth = data
  },
  SET_DISPLAY_NAME (state, data) {
    state.displayName = data
  },
  SET_USER_PHOTO (state, data) {
    state.userPhoto = data
  }
}

const actions = {
  LOGIN_USER (context) {
    firebase.auth().onAuthStateChanged((auth) => {
      if (auth) {
        context.commit('SET_AUTH', true)
        context.commit('SET_DISPLAY_NAME', auth.displayName)
        context.commit('SET_USER_PHOTO', auth.photoURL)
        // this.auth = true
        // this.user = auth.displayName
        // this.image = auth.photoURL
        // console.log('User exists', this.auth)
      } else {
        // console.log('user does not exist')
      }
    })
  },
  GOOGLE (context) {
    // this.signInUser()
    // this.userAccountDialog = false
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
      .then(result => {
        const credential = result.credential
        // This gives you a Google Access Token. You can use it to access the Google API.
        // eslint-disable-next-line no-unused-vars
        const token = credential.accessToken
        context.commit('SET_TOKEN', token)
        // console.log(token)
        // The signed-in user info.
        // eslint-disable-next-line no-unused-vars
        context.commit('SET_DISPLAY_NAME', result.user.displayName)
        context.commit('SET_USER_PHOTO', result.user.photoURL)
        // this.userAccountDialog = false
        // this.matchNotif('Sign In Success', 'green')
        // this.$q.notify({
        const notify = {
          message: 'Signed In Success',
          color: 'positive',
          icon: 'announcement',
          position: 'top',
          classes: 'glossy'
        }
        // const alert = {type: 'positive', message: 'Signed In Success', position: 'top'}
        context.commit('SET_NOTIFICATION', notify, { root: true })
      })
      .catch((error) => {
        // Handle Errors here.
        // eslint-disable-next-line no-unused-vars
        var errorCode = error.code
        // eslint-disable-next-line no-unused-vars
        var errorMessage = error.message
        // The email of the user's account used.
        this.matchNotif(errorMessage, 'red')
        var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        this.matchNotif(email, 'red')
        var credential = error.credential
        this.matchNotif(credential, 'red')
      })
  },
  EMAIL_AND_PASSWORD (context, email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(auth => {
        context.commit('SET_DISPLAY_NAME', auth.user.displayName)
        context.commit('SET_USER_PHOTO', auth.user.photoURL)
        this.userAccountDialog = false
        // this.loading2 = true
        // this.userAccountDialog = false
        return this.matchNotif('User Created Successfully', 'green')
      })
      .catch(error => {
        // eslint-disable-next-line no-unused-vars
        var errorCode = error.code
        var errorMessage = error.message
        this.matchNotif(errorMessage, 'red')
        this.loading2 = false
      })
  },
  SIGNIN_EXISTING_USER (context, payload) {
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then((userCredential) => {
        // Signed in
        // eslint-disable-next-line no-unused-vars
        const user = userCredential.user
        context.commit('SET_DISPLAY_NAME', user.displayName)
        context.commit('SET_USER_PHOTO', user.photoURL)
        // ...
        // this.loading2 = false
        // this.userAccountDialog = false
        return commonMixins.matchNotif('Signed In successfully', 'green')
      })
      .catch((error) => {
        // eslint-disable-next-line no-unused-vars
        var errorMessage = error.message
        this.loading2 = false
        return this.matchNotif('User Does Not Exist !', 'red')
      })
  },
  LOGIN_USERS (context, form) {
    context.commit('SET_ADDING_USER', true)
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
      .then(result => {
        const credential = result.credential
        // This gives you a Google Access Token. You can use it to access the Google API.
        // eslint-disable-next-line no-unused-vars
        context.commit('SET_CURRENT_USER', credential)
        const token = credential.accessToken
        context.commit('SET_TOKEN', token)
        // console.log(token)
        // The signed-in user info.
        // eslint-disable-next-line no-unused-vars
        // this.user = result.user.displayName
        context.commit('SET_DISPLAY_NAME', result.user.displayName)
        this.image = result.user.photoURL
        context.commit('SET_USER_PHOTO', result.user.photoURL)
        // this.userAccountDialog = false
        const alert = {
          type: 'positive',
          message: 'Signed In Successfully',
          position: 'top'
        }
        context.commit('SET_NOTIFICATION', alert, { root: true })
        context.commit('SET_ADDING_USER', false)
      })
      .catch((error) => {
        context.commit('SET_ADDING_USER', false)
        const alert = {
          type: 'negative',
          message: 'Error logging in',
          position: 'top'
        }
        if (error.errorCode && error.errorMessage && error.email && error.credential) {
          alert.message = error.errorMessage
        }
        // Handle Errors here.
        // eslint-disable-next-line no-unused-vars
        // var errorCode = error.code
        // eslint-disable-next-line no-unused-vars
        // var errorMessage = error.message
        // The email of the user's account used.
        // this.matchNotif(errorMessage, 'red')
        // var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        // this.matchNotif(email, 'red')
        // var credential = error.credential
        // this.matchNotif(credential, 'red')
        context.commit('SET_NOTIFICATION', alert, { root: true })
        context.commit('SET_ADDING_USER', false)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
