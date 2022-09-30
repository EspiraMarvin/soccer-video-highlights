<template>
  <div>
    <div class="large-screen-only">
    <q-tabs
      dense
      no-caps
      align="left"
      class="bg-primary text-white shadow-2"
      :breakpoint="0"
    >

      <q-tab @click="setCurrentTab('allgames')"  label="Games">
        <q-badge color="red" class="badge" floating><sub>{{ allMatches.length }}</sub></q-badge>
      </q-tab>
      <q-tab @click="setCurrentTab('epl')"  label="Premier League">
        <q-badge color="red" class="badge" floating><sub>{{ eplMatches.length }}</sub></q-badge>
      </q-tab>

      <q-tab @click="setCurrentTab('seriea')" label="Serie A">
        <q-badge color="red" class="badge" floating><sub>{{ serieaMatches.length }}</sub></q-badge>
      </q-tab>

      <q-tab @click="setCurrentTab('laliga')" label="La Liga">
        <q-badge color="red" class="badge" floating><sub>{{ laligaMatches.length }}</sub></q-badge>
      </q-tab>
      <q-tab @click="setCurrentTab('franceleague1')" label="League 1">
        <q-badge color="red" class="badge" floating><sub>{{ franceLeague1Matches.length }}</sub></q-badge>
      </q-tab>
      <q-tab @click="setCurrentTab('bundesliga')" label="Bundesliga">
        <q-badge color="red" class="badge" floating><sub>{{ bundesligaMatches.length }}</sub></q-badge>
      </q-tab>
      <q-tab @click="setCurrentTab('uefa')" label="Uefa">
        <q-badge color="red" class="badge" floating><sub>{{ uefaMatches.length }}</sub></q-badge>
      </q-tab>
      <q-tab @click="setCurrentTab('europa')" name="europa" label="Europa">
        <q-badge color="red" class="badge" floating><sub>{{ europaMatches.length }}</sub></q-badge>
      </q-tab>
      <q-tab @click="setCurrentTab('clubfriendlies')" label="Club Friendlies">
        <q-badge color="red" class="badge" floating><sub>{{ clubFriendliesMatches.length }}</sub></q-badge>
      </q-tab>

      <q-tab @click="setCurrentTab('africanationscup')" label="African Nations Cup">
        <q-badge color="red" floating class="badge">{{ africanationscupMatches.length }}</q-badge>
      </q-tab>
      <q-tab @click="setCurrentTab('uefanationsleague')" label="Uefa Nations league">
        <q-badge color="red" floating class="badge">{{ uefaNationsLeagueMatches.length }}</q-badge>
      </q-tab>
      <q-tab @click="setCurrentTab('uefaeuro')" label="Uefa Euro">
        <q-badge color="red" floating class="badge">{{ uefaEuroMatches.length }}</q-badge>
      </q-tab>
      <q-tab @click="setCurrentTab('worldcup')" label="World Cup">
        <q-badge color="red" floating class="badge">{{ worldCupMatches.length }}</q-badge>
      </q-tab>
      <q-tab @click="setCurrentTab('fa')" label="FA Cup">
        <q-badge color="red" floating class="badge">{{ faMatches.length }}</q-badge>
      </q-tab>
      <q-tab @click="setCurrentTab('efl')" label="EFL Cup">
        <q-badge color="red" floating class="badge">{{ eflMatches.length }}</q-badge>
      </q-tab>
    </q-tabs>
  </div>

  <div class="small-screen-only">
    <q-tabs
      dense
      no-caps
      align="left"
      class="bg-primary text-white shadow-2"
      :breakpoint="0"
      inline-label
      outside-arrows
      mobile-arrows
    >

      <q-tab @click="setCurrentTab('allgames')"  label="Games">
        <q-badge color="red" class="badge" floating><sub>{{ allMatches.length }}</sub></q-badge>
      </q-tab>
      <q-tab @click="setCurrentTab('epl')"  label="Premier League">
        <q-badge color="red" class="badge" floating><sub>{{ eplMatches.length }}</sub></q-badge>
      </q-tab>

      <q-tab @click="setCurrentTab('seriea')" label="Serie A">
        <q-badge color="red" class="badge" floating><sub>{{ serieaMatches.length }}</sub></q-badge>
      </q-tab>

      <q-tab @click="setCurrentTab('laliga')" label="La Liga">
        <q-badge color="red" class="badge" floating><sub>{{ laligaMatches.length }}</sub></q-badge>
      </q-tab>
      <q-tab @click="setCurrentTab('franceleague1')" label="League 1">
        <q-badge color="red" class="badge" floating><sub>{{ franceLeague1Matches.length }}</sub></q-badge>
      </q-tab>
      <q-tab @click="setCurrentTab('bundesliga')" label="Bundesliga">
        <q-badge color="red" class="badge" floating><sub>{{ bundesligaMatches.length }}</sub></q-badge>
      </q-tab>
      <q-tab @click="setCurrentTab('uefa')" label="Uefa">
        <q-badge color="red" class="badge" floating><sub>{{ uefaMatches.length }}</sub></q-badge>
      </q-tab>
      <q-tab @click="setCurrentTab('europa')" name="europa" label="Europa">
        <q-badge color="red" class="badge" floating><sub>{{ europaMatches.length }}</sub></q-badge>
      </q-tab>
      <q-tab @click="setCurrentTab('clubfriendlies')" label="Club Friendlies">
        <q-badge color="red" class="badge" floating><sub>{{ clubFriendliesMatches.length }}</sub></q-badge>
      </q-tab>

      <q-btn-dropdown auto-close stretch no-caps flat label="More">
        <q-list>
          <q-tab @click="setCurrentTab('africanationscup')" label="African Nations Cup">
            <q-badge color="red" floating class="badge-dropdown">{{ africanationscupMatches.length }}</q-badge>
          </q-tab>
          <q-tab @click="setCurrentTab('uefanationsleague')" label="Uefa Nations league">
            <q-badge color="red" floating class="badge-dropdown">{{ uefaNationsLeagueMatches.length }}</q-badge>
          </q-tab>
          <q-tab @click="setCurrentTab('uefaeuro')" label="Uefa Euro">
            <q-badge color="red" floating class="badge-dropdown">{{ uefaEuroMatches.length }}</q-badge>
          </q-tab>
          <q-tab @click="setCurrentTab('worldcup')" label="World Cup">
            <q-badge color="red" floating class="badge-dropdown">{{ worldCupMatches.length }}</q-badge>
          </q-tab>
          <q-tab @click="setCurrentTab('fa')" label="FA Cup">
            <q-badge color="red" floating class="badge-dropdown">{{ faMatches.length }}</q-badge>
          </q-tab>
          <q-tab @click="setCurrentTab('efl')" label="EFL Cup">
            <q-badge color="red" floating class="badge-dropdown">{{ eflMatches.length }}</q-badge>
          </q-tab>

        </q-list>
      </q-btn-dropdown>
    </q-tabs>
  </div>
  </div>
</template>

<script>
import commonMixins from '../../mixins/commonMixins'
import { mapActions, mapGetters } from 'vuex'

const moment = require('moment')
export default {
  name: 'Tab',
  mixins: [commonMixins],

  created () {
    this.requestData()
  },
  data () {
    return {
      loadingData: false,
      showVideoDialog: false,
      videoUrl: '',
      dialogTitle: '',
      moment: moment,
      interval: '',
      search: '',
      showInputDialog: false,
      allMatches: [],
      eplMatches: [],
      englandChampionshipMatches: [],
      englandLeagueOneMatches: [],
      englandLeagueTwoMatches: [],
      laligaMatches: [],
      serieaMatches: [],
      franceLeague1Matches: [],
      bundesligaMatches: [],
      clubFriendliesMatches: [],
      africanationscupMatches: [],
      uefaMatches: [],
      europaMatches: [],
      uefaNationsLeagueMatches: [],
      faMatches: [],
      eflMatches: [],
      uefaEuroMatches: [],
      worldCupMatches: []
    }
  },
  computed: {
    ...mapGetters({
      loadingMatches: 'GET_FETCHING_MATCHES',
      matches: 'GET_MATCHES',
      addingMatch: 'GET_ADDING_MATCH',
      tab: 'GET_CURRENT_TAB'
    })
  },
  methods: {
    ...mapActions({}),
    requestData () {
      this.loadingData = true
      this.$store.dispatch('FETCH_MATCHES')
      this.setCurrentTab('allgames')
      this.loadingData = false
    },
    setCurrentTab (tabName) {
      this.$store.commit('SET_CURRENT_TAB', tabName)
    }
  },
  watch: {
    matches: {
      handler () {
        if (this.matches.length) {
          this.allMatches = this.matches.filter(game => {
            return game
          })
          this.eplMatches = this.matches.filter(game => {
            return game.competition.name === 'ENGLAND: Premier League'
          })
          this.laligaMatches = this.matches.filter(game => {
            return game.competition.name === 'SPAIN: La Liga'
          })
          this.serieaMatches = this.matches.filter(game => {
            return game.competition.name === 'ITALY: Serie A'
          })
          this.franceLeague1Matches = this.matches.filter(game => {
            return game.competition.name === 'FRANCE: Ligue 1'
          })
          this.bundesligaMatches = this.matches.filter(game => {
            return game.competition.name === 'GERMANY: Bundesliga'
          })
          this.clubFriendliesMatches = this.matches.filter(game => {
            return game.competition.name === 'INTERNATIONAL: Club Friendlies'
          })
          this.uefaMatches = this.matches.filter(game => {
            return game.competition.name.slice(0, 16) === 'CHAMPIONS LEAGUE'
          })
          this.europaMatches = this.matches.filter(game => {
            return game.competition.name.slice(0, 13) === 'EUROPA LEAGUE'
          })
          this.africanationscupMatches = this.matches.filter(game => {
            // return game.competition.name.slice(0, 18) === 'AFRICA NATIONS CUP'
            // or
            return game.competition.name.includes('AFRICA NATIONS CUP')
          })
          this.worldCupMatches = this.matches.filter(game => {
            return game.competition.name.includes('WORLD CUP')
          })
          this.uefaNationsLeagueMatches = this.matches.filter(game => {
            return game.competition.name.slice(0, 19) === 'UEFA NATIONS LEAGUE'
          })
          this.faMatches = this.matches.filter(game => {
            return game.competition.name === 'ENGLAND: FA Cup'
          })
          this.eflMatches = this.matches.filter(game => {
            return game.competition.name === 'ENGLAND: EFL Trophy' || game.competition.name === 'ENGLAND: League Cup'
          })
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
  .badge {
    margin-right: -13px
  }
  .badge-dropdown {
    margin-right: 0px
  }
</style>
