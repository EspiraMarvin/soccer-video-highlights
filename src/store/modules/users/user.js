
const state = () => ({
  user: {},
  currentUser: {},
  addingUser: false,
  checkAuthForSignInPrompt: false
})

const getters = {
  GET_CURRENT_USER: state => {
    return state.currentUser
  },
  GET_ADDING_USER: state => state.addingUser,
  GET_IF_AUTH: state => state.checkAuthForSignInPrompt
}

const mutations = {
  SET_CURRENT_USER (state, data) {
    state.currentUser = data
  },
  SET_ADDING_USER (state, data) {
    state.addingUser = data
  },
  SET_CHECK_AUTH (state, data) {
    state.checkAuthForSignInPrompt = data
  }
}

const actions = {
  PROMPT_SIGN_IN (context, payload) {
    context.commit('SET_CHECK_AUTH', payload)
  },
  USER_DETAILS ({ commit }, payload) {
    console.log('user details payload', payload)
    commit('SET_CURRENT_USER', payload)
  },
  lOGOUT_USER ({ commit }, payload) {
    commit('SET_CURRENT_USER', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
