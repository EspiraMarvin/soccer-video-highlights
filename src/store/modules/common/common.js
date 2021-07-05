const state = () => ({
  notification: {},
  errors: [],
  clientWidth: '',
  rightDrawer: false
})

const getters = {
  GET_NOTIFICATION: state => state.notification,
  GET_ERRORS: state => state.errors,
  GET_CLIENT_WIDTH: state => state.clientWidth,
  GET_RIGHT_DRAWER: state => state.rightDrawer
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
  },
  SET_RIGHT_DRAWER (state, payload) {
    state.rightDrawer = payload
  }
}

const actions = {
  CLIENT_WIDTH (context) {
    // get widows/client width / viewport
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    context.commit('SET_CLIENT_WIDTH', width)
  },
  RIGHT_DRAWER (context, payload) {
    context.commit('SET_RIGHT_DRAWER', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
