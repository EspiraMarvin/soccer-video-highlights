const state = () => ({
  notification: {},
  errors: [],
  clientWidth: ''
})

const getters = {
  GET_NOTIFICATION: state => state.notification,
  GET_ERRORS: state => state.errors,
  GET_CLIENT_WIDTH: state => state.clientWidth
}

const mutations = {
  SET_NOTIFICATION (state, value) {
    state.notification = value
  },
  SET_ERRORS (state, value) {
    state.errors = value
  },
  SET_CLIENT_WIDTH (state, value) {
    state.clientWidth = value
  }
}

const actions = {
  CLIENT_WIDTH (context) {
    // get widows/client width / viewport
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    context.commit('SET_CLIENT_WIDTH', width)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
