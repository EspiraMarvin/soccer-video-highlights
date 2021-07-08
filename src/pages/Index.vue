<template>
  <q-page class="relative-position">

    <Tab />

    <q-separator dense />

    <q-scroll-area class="absolute full-height full-width">

      <template v-if="!loadingData && matches.length && showInputDialog === false">
        <q-tab-panels v-model="tab">
          <q-tab-panel name="allgames">
            <Matches :loading-matches="loadingMatches" :matches="allMatches" v-if="allMatches.length > 0"/>
          </q-tab-panel>

          <q-tab-panel name="epl">
            <Matches :loading-matches="loadingMatches" :matches="eplMatches" v-if="eplMatches.length > 0"/>
            <p v-else>No EPL Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="seriea">
            <Matches :loading-matches="loadingMatches" :matches="serieaMatches" v-if="serieaMatches.length > 0"/>
            <p v-else>No Serie A Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="laliga">
            <Matches :loading-matches="loadingMatches" :matches="laligaMatches" v-if="laligaMatches.length > 0"/>
            <p v-else>No La liga Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="franceleague1">
            <Matches :loading-matches="loadingMatches" :matches="franceLeague1Matches" v-if="franceLeague1Matches.length > 0"/>
            <p v-else>No League 1 Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="bundesliga">
            <Matches :loading-matches="loadingMatches" :matches="bundesligaMatches" v-if="bundesligaMatches.length > 0"/>
            <p v-else>No Bundesliga Matches Available Coming Soon </p>
          </q-tab-panel>

          <q-tab-panel name="clubfriendlies">
            <Matches :loading-matches="loadingMatches" :matches="clubFriendliesMatches" v-if="clubFriendliesMatches.length > 0"/>
            <p v-else>No Club Friendlies Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="uefa">
            <Matches :loading-maches="loadingMatches" :matches="uefaMatches" v-if="uefaMatches.length > 0"/>
            <p v-else>No Uefa Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="europa">
            <Matches :loading-matches="loadingMatches" :matches="europaMatches" v-if="europaMatches.length > 0"/>
            <p v-else>No Europa Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="africanationscup">
            <Matches :loading-matches="loadingMatches" :matches="africanationscupMatches" v-if="africanationscupMatches.length > 0"/>
            <p v-else>No African Nations Cup Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="uefanationsleague">
            <Matches :loading-matches="loadingMatches" :matches="uefaNationsLeagueMatches" v-if="uefaNationsLeagueMatches.length > 0"/>
            <p v-else>No Uefa Nations League Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="uefaeuro">
            <Matches :loading-matches="loadingMatches" :matches="uefaEuroMatches" v-if="uefaEuroMatches.length > 0"/>
            <p v-else>No Uefa Euro Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="worldcup">
            <Matches :loading-matches="loadingMatches" :matches="worldCupMatches" v-if="worldCupMatches.length > 0"/>
            <p v-else>No World Cup Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="fa">
            <Matches :loading-matches="loadingMatches" :matches="faMatches" v-if="faMatches.length > 0"/>
            <p v-else>No FA Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="efl">
             <Matches :loading-matches="loadingMatches" :matches="eflMatches" v-if="eflMatches.length > 0"/>
             <p v-else>No EFL Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="englandchampionship">
            <Matches :loading-matches="loadingMatches" :matches="englandChampionshipMatches" v-if="englandChampionshipMatches.length > 0"/>
            <p v-else>No Championship Matches Available Coming Soon</p>
          </q-tab-panel>

          <q-tab-panel name="englandleagueone">
            <Matches :loading-matches="loadingMatches" :matches="englandLeagueOneMatches" v-if="englandLeagueOneMatches.length > 0"/>
            <p v-else>No League One Matches Available Coming Soon</p>
          </q-tab-panel>

          <q-tab-panel name="englandleaguetwo">
            <Matches :loading-matches="loadingMatches" :matches="englandLeagueTwoMatches" v-if="englandLeagueTwoMatches.length > 0"/>
            <p v-else>No League Two Matches Available Coming Soon</p>
          </q-tab-panel>

        </q-tab-panels>
      </template>

      <template v-else>
        <div v-for="item in numberOfSkeletons" :key="item.index">
          <Skeleton />
        </div>
      </template>

    </q-scroll-area>

    <q-page-sticky position="bottom-right" :offset="[18, 80]">
      <q-btn
        @click="openSearchDrawer = !openSearchDrawer"
        glossy
        push
        round
        style="background: #1976D2;"
        fab
        text-color="white"
        class="lt-md"
        icon="eva-search"
      />
      <q-btn
        @click="openSearchDrawer = !openSearchDrawer"
        glossy
        push
        round
        style="background: #1976D2;"
        fab
        text-color="white"
        class="gt-sm"
        :icon="!openSearchDrawer ? 'eva-search' : 'close'"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import commonMixins from '../mixins/commonMixins'
import Skeleton from '../components/skeleton/Skeleton'
import Tab from '../components/tabs/Tab'
import Matches from '../components/matches/Matches'

const moment = require('moment')
export default {
  name: 'PageIndex',
  mixins: [commonMixins],
  components: {
    Matches,
    Tab,
    Skeleton
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
      offline: false,
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
      worldCupMatches: [],
      numberOfSkeletons: 24,
      openSearchDrawer: false
    }
  },
  computed: {
    ...mapGetters({
      loadingMatches: 'GET_FETCHING_MATCHES',
      matches: 'GET_MATCHES',
      token: 'GET_TOKEN',
      addingMatch: 'GET_ADDING_MATCH',
      tab: 'GET_CURRENT_TAB',
      rightDrawer: 'GET_RIGHT_DRAWER',
      clientWidth: 'GET_CLIENT_WIDTH'
    })
  },
  methods: {
    ...mapActions({
      openRightDrawer: 'RIGHT_DRAWER'
    }),
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
    },
    openSearchDrawer: function () {
      if (this.openSearchDrawer === true) {
        this.openRightDrawer(true)
      } else {
        this.openRightDrawer(false)
      }
    }
  }
}
</script>

<style scoped>
  .my-card{
    width: 100%;
    max-width: 800px
  }
  p{
    text-align: center;
  }
</style>
