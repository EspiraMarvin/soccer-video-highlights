import firebase from 'firebase'

const state = () => ({
  user: {},
  token: '',
  currentUser: '',
  addingUser: false,
  displayName: '',
  userPhoto: ''
})

const getters = {
  GET_TOKEN: state => state.token,
  GET_CURRENT_USER: state => state.currentUser,
  GET_ADDING_USER: state => state.addingUser,
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
  SET_DISPLAY_NAME (state, data) {
    state.displayName = data
  },
  SET_USER_PHOTO (state, data) {
    state.userPhoto = data
  }
}

const actions = {
  LOGIN_USER (context, form) {
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
