<template>
  <q-page class="relative-position">

    <Tab />

    <q-separator />

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

    </q-scroll-area>

    <template>
      <q-dialog v-model="showInputDialog" half-width>
        <q-card class="my-card" style="height: 450px; margin-top: -10px">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">
              <q-avatar size="md">
                <img src="../assets/icons/AppIcon.png">
              </q-avatar>
              &nbsp; search matches
            </div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <div>
            <q-input
              v-model="search"
              dense
              square
              dark
              standout
              label="Search ..."
              type="search"
              class="bg-primary"
            >
              <template v-slot:append>
                <q-icon
                  v-if="search === ''"
                  text-color=""
                  color="white"
                  name="eva-search">
                </q-icon>
                 <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
               </template>
            </q-input>
           </div>
          <template v-if="resultQuery.length">
            <div v-for="(game, index) in resultQuery"
                 :key="index"
                 :value="game.value"
            >
              <q-card-section @click="showVideo(game.videos[0].embed)">
                <div class="row col-xs-12 no-wrap items-center" style="height:3.5px">
                  <div class=" row"
                       v-ripple
                  >

                    <div style="margin-right: 2.5px">
                      <q-avatar class="q-responsive" style="font-size:16px" size="px">
                        <img :src="game.thumbnail" alt="Image">
                      </q-avatar>
                    </div>
                    <span>
                <div class="fa-bold" style="font-size: 12px">
                  &nbsp;<span style="font-size:11px">{{ game.title }}&nbsp;
                  <sub style="float:right; font-size:8.5px">{{ moment(game.date).format("DMMMYY") }}</sub>

                </span>
                </div>
              </span>
                  </div>
                </div>
              </q-card-section>
              <q-separator />
            </div>
          </template>
          <template v-else>
            <p class="text-h6">No Match Found 😪! </p>
            <Cube class="flex flex-center" />
          </template>
        </q-card>
      </q-dialog>
    </template>

    <q-dialog v-model="showVideoDialog" persistent>
      <q-card class="my-card">
        <div class="row items-center">

          <div class="text-subtitle1 q-ml-md"> {{ dialogTitle }} </div>
          <q-space />
          <q-btn
            icon="close"
            @click="closeDialog"
            flat round />
        </div>
        <q-card-section
          style="margin-top:-13px"
        >
          <q-video v-html="videoUrl" src=""></q-video>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog persistent v-show="!this.allMatches.length">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">You are currently not connected to any network.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Retry" color="primary" v-close-popup @click="requestData" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-page-sticky position="bottom-right" :offset="[18, 80]">
      <q-btn
        @click="searchMatch('top')"
        glossy
        push
        round
        style="background: #1976D2;"
        fab
        text-color="white"
        icon="eva-search"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import commonMixins from '../mixins/commonMixins'
import Skeleton from '../components/skeleton/Skeleton'
import Tab from '../components/tabs/Tab'
import Matches from '../components/matches/Matches'
import Cube from '../components/animations/Cube'

const moment = require('moment')
export default {
  name: 'PageIndex',
  mixins: [commonMixins],
  components: {
    Cube,
    Matches,
    Tab,
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
      showInputDialog: false,
      position: 'top',
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
    // to lowercase search
    resultQuery () {
      if (this.search) {
        return this.allMatches.filter((game) => {
          return this.search.toLowerCase().split(' ').every(v => game.title.toLowerCase().includes(v))
        })
      } else {
        return this.matches
      }
    }
  },
  methods: {
    ...mapActions({
    }),
    requestData () {
      this.loadingData = true
      this.$store.dispatch('FETCH_MATCHES')
      // const data = this.$store.dispatch('FETCH_MATCHES')
      // console.log('data', data)
      this.setCurrentTab('allgames')
      this.loadingData = false
    },
    setCurrentTab (tabName) {
      this.$store.commit('SET_CURRENT_TAB', tabName)
    },
    searchMatch (position) {
      this.position = position
      this.showInputDialog = true
    },
    showVideo (video, index) {
      this.showVideoDialog = true
      this.dialogTitle = 'Highlights'
      this.videoUrl = video
    },
    closeDialog () {
      this.showVideoDialog = false
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
  .my-card{
    width: 100%;
    max-width: 800px
  }
  p{
    text-align: center;
  }
</style>
