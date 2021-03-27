const state = () => ({
  user: {},
  token: '',
  currentUser: ''
})

const getters = {
  GET_TOKEN: state => state.token,
  GET_CURRENT_USER: state => state.currentUser

}

const mutations = {
  SET_TOKEN (state, data) {
    state.token = data
  },
  SET_CURRENT_USER (state, data) {
    state.currentUser = data
  }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
