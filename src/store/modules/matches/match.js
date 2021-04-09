import axios from 'axios'

const state = () => ({
  matches: {},
  fetchingMatches: false,
  addingMatch: false,
  currentTab: ''
})

const getters = {
  GET_MATCHES: state => state.matches,
  GET_FETCHING_MATCHES: state => state.fetchingMatches,
  GET_ADDING_MATCH: state => state.addingMatch,
  GET_CURRENT_TAB: state => state.currentTab
}

const mutations = {
  SET_MATCHES (state, data) {
    state.matches = data
  },

  SET_FETCHING_MATCHES (state, data) {
    state.fetchingMatches = data
  },

  SET_ADDING_MATCH (state, data) {
    state.addingMatch = data
  },

  SET_CURRENT_TAB (state, data) {
    state.currentTab = data
  }
}

const actions = {
  FETCH_MATCHES (context) {
    context.commit('SET_FETCHING_MATCHES', true)
    axios
      .get('https://www.scorebat.com/video-api/v1')
      .then(({ data }) => {
        context.commit('SET_FETCHING_MATCHES', false)
        context.commit('SET_MATCHES', data)
        // console.log('store', data)
      })
      .catch(error => {
        context.commit('SET_FETCHING_MATCHES', false)
        const alert = {
          type: 'negative',
          message: 'Failed to Load Matches',
          position: 'top'
        }
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          alert.message = error.response.data.message
        }
        context.commit('SET_NOTIFICATION', alert, { root: true })
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
