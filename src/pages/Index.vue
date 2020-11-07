<template>
  <q-page>
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

          <q-btn-dropdown auto-close stretch flat label="More">
            <q-list>
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
        <q-separator />

      <template v-if="!loadingData && matches.length">
        <q-tab-panels v-model="tab">
          <q-tab-panel name="allgames">
            <AllMatches :loading-matches="loadingMatches" :matches="allMatches" v-if="allMatches.length > 0"/>
          </q-tab-panel>

          <q-tab-panel name="epl">
            <EplMatches :loading-matches="loadingMatches" :matches="eplMatches" v-if="eplMatches.length > 0"/>
            <p class="flex flex-center" v-else>No EPL Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="seriea">
            <SerieaMatches :loading-matches="loadingMatches" :matches="serieaMatches" v-if="serieaMatches.length > 0"/>
            <p class="flex flex-center" v-else>No Serie A Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="laliga">
            <LaligaMatches :loading-matches="loadingMatches" :matches="laligaMatches" v-if="laligaMatches.length > 0"/>
            <p class="flex flex-center" v-else>No La liga Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="franceleague1">
            <FranceLeague1Matches :loading-matches="loadingMatches" :matches="franceLeague1Matches" v-if="clubFriendliesMatches.length > 0"/>
            <p class="flex flex-center" v-else>No League 1 Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="bundesliga">
            <BundesligaMatches :loading-matches="loadingMatches" :matches="bundesligaMatches" v-if="bundesligaMatches.length > 0"/>
            <p class="flex flex-center" v-else>No Bundesliga Matches Available Coming Soon </p>
          </q-tab-panel>

          <q-tab-panel name="clubfriendlies">
            <ClubFriendliesMatches :loading-matches="loadingMatches" :matches="clubFriendliesMatches" v-if="clubFriendliesMatches.length > 0"/>
            <p class="flex flex-center" v-else>No Club Friendlies Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="uefa">
            <UefaMatches :loading-matches="loadingMatches" :matches="uefaMatches" v-if="uefaMatches.length > 0"/>
            <p class="flex flex-center" v-else>No Uefa Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="europa">
            <EuropaMatches :loading-matches="loadingMatches" :matches="europaMatches" v-if="europaMatches.length > 0"/>
            <p class="flex flex-center" v-else>No Europa Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="uefanationsleague">
            <UefaNationsleagueMatches :loading-matches="loadingMatches" :matches="uefaNationsLeagueMatches" v-if="uefaNationsLeagueMatches.length > 0"/>
            <p class="flex flex-center" v-else>No Uefa Nations League Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="uefaeuro">
            <UefaEuroMatches :loading-matches="loadingMatches" :matches="uefaEuroMatches" v-if="uefaEuroMatches.length > 0"/>
            <p class="flex flex-center" v-else>No Uefa Euro Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="worldcup">
            <WorldCupMatches :loading-matches="loadingMatches" :matches="worldCupMatches" v-if="worldCupMatches.length > 0"/>
            <p class="flex flex-center" v-else>No World Cup Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="fa">
            <FaMatches :loading-matches="loadingMatches" :matches="faMatches" v-if="faMatches.length > 0"/>
            <p class="flex flex-center" v-else>No FA Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="efl">
            <EflMatches :loading-matches="loadingMatches" :matches="eflMatches" v-if="eflMatches.length > 0"/>
            <p class="flex flex-center" v-else>No EFL Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="englandchampionship">
            <ChampionshipMatches :loading-matches="loadingMatches" :matches="englandChampionshipMatches" v-if="englandChampionshipMatches.length > 0"/>
            <p class="flex flex-center" v-else>No Championship Matches Available Coming Soon</p>
          </q-tab-panel>

          <q-tab-panel name="englandleagueone">
            <LeagueOneMatches :loading-matches="loadingMatches" :matches="englandLeagueOneMatches" v-if="englandLeagueOneMatches.length > 0"/>
            <p class="flex flex-center" v-else>No League One Matches Available Coming Soon</p>
          </q-tab-panel>

          <q-tab-panel name="englandleaguetwo">
            <LeagueTwoMatches :loading-matches="loadingMatches" :matches="englandLeagueTwoMatches" v-if="englandLeagueTwoMatches.length > 0"/>
            <p class="flex flex-center" v-else>No League Two Matches Available Coming Soon</p>
          </q-tab-panel>

        </q-tab-panels>
      </template>

<!--
    <template ref="" v-else-if="!loadingData && !allMatches.length">
      <h5 class="text-center text-grey"> No Posts Yet</h5>
    </template>
    -->

    <template ref="skeleton" v-else>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </template>

  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import commonMixins from '../mixins/commonMixins'
import EplMatches from '../components/matches/England/EplMatches'
import FaMatches from '../components/matches/England/FaMatches'
import EflMatches from '../components/matches/England/EflMatches'
import ChampionshipMatches from '../components/matches/England/ChampionshipMatches'
import LeagueOneMatches from '../components/matches/England/LeagueOneMatches'
import LeagueTwoMatches from '../components/matches/England/LeagueTwoMatches'
import AllMatches from '../components/matches/AllMatches'
import LaligaMatches from '../components/matches/LaligaMatches'
import SerieaMatches from '../components/matches/Italy/SerieaMatches'
import FranceLeague1Matches from '../components/matches/France/FranceLeague1Matches'
import ClubFriendliesMatches from '../components/matches/ClubFriendlies/ClubFriendliesMatches'
import UefaMatches from '../components/matches/UefaMatches'
import EuropaMatches from '../components/matches/EuropaMatches'
import UefaNationsleagueMatches from '../components/matches/UefaNationsleagueMatches'
import WorldCupMatches from '../components/matches/WorldCupMatches'
import UefaEuroMatches from '../components/matches/UefaEuroMatches'
import BundesligaMatches from '../components/matches/Germany/BundesligaMatches'
import Skeleton from '../components/Skeleton'

const moment = require('moment')
export default {
  name: 'PageIndex',
  mixins: [commonMixins],
  components: {
    EplMatches,
    ChampionshipMatches,
    LeagueOneMatches,
    LeagueTwoMatches,
    AllMatches,
    LaligaMatches,
    SerieaMatches,
    FranceLeague1Matches,
    ClubFriendliesMatches,
    UefaMatches,
    EuropaMatches,
    UefaNationsleagueMatches,
    WorldCupMatches,
    FaMatches,
    EflMatches,
    UefaEuroMatches,
    BundesligaMatches,
    Skeleton
  },
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
    }),
    resultQuery () {
      if (this.search) {
        return this.matches.filter((item) => {
          return this.search.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
        })
      } else {
        return this.matches
      }
    }
  },
  methods: {
    ...mapActions({
      getMatches: 'FETCH_MATCHES'
    }),
    requestData () {
      this.loadingData = true
      // setTimeout(() => {
      this.interval = setInterval(() => {
        this.$store.dispatch('FETCH_MATCHES')
      }, 3000)
      this.setCurrentTab('allgames')
      this.loadingData = false
      // }, 2000)
    },
    setCurrentTab (tabName) {
      this.$store.commit('SET_CURRENT_TAB', tabName)
    }
  },
  watch: {
    matches: {
      handler () {
        if (this.matches.length) {
          this.eplMatches = this.matches.filter(game => {
            return game.competition.name === 'ENGLAND: Premier League'
          })
          this.allMatches = this.matches.filter(game => {
            return game
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
  },
  mounted () {
    // this.requestData()
  },
  beforeDestroy () {
    clearInterval(this.interval)
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
  .my-card{
    width: 100%;
    max-width: 800px
  }
  .my-list{
    margin-top: 8px;
    margin-left: 4px;
    margin-right: 4px
  }
</style>
