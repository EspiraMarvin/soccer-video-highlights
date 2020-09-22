<template>
  <q-page>
    <div class="">
      <q-tabs
          v-model="tab"
          dense
          no-caps
          align="left"
          class="bg-primary text-white shadow-2"
          :breakpoint="0"
        >
        <q-tab name="allgames" label="Games">
          <q-badge color="red" class="badge" floating><sub>{{ allMatches.length }}</sub></q-badge>
        </q-tab>
        <q-tab name="epl" label="Premier League">
          <q-badge color="red" class="badge" floating><sub>{{ eplMatches.length }}</sub></q-badge>
        </q-tab>

        <q-tab name="seriea" label="Serie A">
          <q-badge color="red" class="badge" floating><sub>{{ serieaMatches.length }}</sub></q-badge>
        </q-tab>

        <q-tab name="laliga" label="La Liga">
          <q-badge color="red" class="badge" floating><sub>{{ laligaMatches.length }}</sub></q-badge>
        </q-tab>
        <q-tab name="franceleague1" label="League 1">
          <q-badge color="red" class="badge" floating><sub>{{ franceLeague1Matches.length }}</sub></q-badge>
        </q-tab>
        <q-tab name="uefa" label="Uefa">
          <q-badge color="red" class="badge" floating><sub>{{ uefaMatches.length }}</sub></q-badge>
        </q-tab>
        <q-tab name="europa" label="Europa">
          <q-badge color="red" class="badge" floating><sub>{{ europaMatches.length }}</sub></q-badge>
        </q-tab>
        <q-tab name="clubfriendlies" label="Club Friendlies">
          <q-badge color="red" class="badge" floating><sub>{{ clubFriendliesMatches.length }}</sub></q-badge>
        </q-tab>

          <q-btn-dropdown auto-close stretch flat label="More">
            <q-list>
              <q-tab name="uefanationsleague" label="Uefa Nations league">
                <q-badge color="red" floating class="badge-dropdown">{{ uefaNationsLeagueMatches.length }}</q-badge>
              </q-tab>
              <q-tab name="worldcup" label="World Cup">
                <q-badge color="red" floating class="badge-dropdown">{{ worldCupMatches.length }}</q-badge>
              </q-tab>
              <q-tab name="fa" label="FA Cup">
                <q-badge color="red" floating class="badge-dropdown">{{ faMatches.length }}</q-badge>
              </q-tab>

      <!--        <q-item clickable @click="tab = 'photos'">
                <q-item-section>Photos
                  <q-badge color="red" floating style="margin-right: -8px">2</q-badge>
                </q-item-section>
              </q-item>-->
            </q-list>
          </q-btn-dropdown>
        </q-tabs>
        <q-separator />

        <q-tab-panels v-model="tab">
          <q-tab-panel name="allgames">
            <AllMatches :loading-matches="loadingMatches" :matches="allMatches" v-if="allMatches.length > 0"/>
            <p class="flex flex-center" v-else>No Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="epl">
            <EplMatches :loading-matches="loadingMatches" :matches="eplMatches" v-if="eplMatches.length > 0"/>
            <p class="flex flex-center" v-else>No Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="seriea">
            <SerieaMatches :loading-matches="loadingMatches" :matches="serieaMatches" v-if="serieaMatches.length > 0"/>
            <p class="flex flex-center" v-else>No Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="laliga">
            <LaligaMatches :loading-matches="loadingMatches" :matches="laligaMatches" v-if="laligaMatches.length > 0"/>
            <p class="flex flex-center" v-else>No Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="franceleague1">
            <FranceLeague1Matches :loading-matches="loadingMatches" :matches="franceLeague1Matches" v-if="clubFriendliesMatches.length > 0"/>
            <p class="flex flex-center" v-else>No Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="clubfriendlies">
            <ClubFriendliesMatches :loading-matches="loadingMatches" :matches="clubFriendliesMatches" v-if="clubFriendliesMatches.length > 0"/>
            <p class="flex flex-center" v-else>No Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="uefa">
            <UefaMatches :loading-matches="loadingMatches" :matches="uefaMatches" v-if="uefaMatches.length > 0"/>
            <p class="flex flex-center" v-else>No Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="europa">
            <EuropaMatches :loading-matches="loadingMatches" :matches="europaMatches" v-if="europaMatches.length > 0"/>
            <p class="flex flex-center" v-else>No Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="uefanationsleague">
            <UefaNationsleagueMatches :loading-matches="loadingMatches" :matches="uefaNationsLeagueMatches" v-if="uefaNationsLeagueMatches.length > 0"/>
            <p class="flex flex-center" v-else>No Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="worldcup">
            <WorldCupMatches :loading-matches="loadingMatches" :matches="worldCupMatches" v-if="worldCupMatches.length > 0"/>
            <p class="flex flex-center" v-else>No Matches Available</p>
          </q-tab-panel>

          <q-tab-panel name="fa">
            <FaMatches :loading-matches="loadingMatches" :matches="faMatches" v-if="faMatches.length > 0"/>
            <p class="flex flex-center" v-else>No Matches Available</p>
          </q-tab-panel>

        </q-tab-panels>
    </div>
<!--    body section-->

    <div>
      <q-spinner
        v-if="loading"
        class="fixed-center"
        color="blue"
        size="3em"
      />
        <q-list class="my-list" style="" v-if="!tab">
        <q-card
          :loading="loadingMatches"
          v-for="(game, key) in matches"
          :key="key"
          v-ripple
          class="q-mb-xs"
        >
          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>

          <q-card-section @click="showVideo(game.videos[0].embed)">
            <div class="row col-xs-12 no-wrap items-center" style="height:3.5px">
              <div class="col ellipsis row" v-ripple>
                <div>
                  <q-avatar class="q-responsive" style="font-size:20px" size="px">
                    <img :src="game.thumbnail" alt="Image">
                  </q-avatar>
                </div>&nbsp;
                <span>
                <div class="fa-bold"  style="">
                  &nbsp;<span style="font-size:12px">{{ game.title }} </span>
                  &nbsp;<span style="float:right; font-size:8.5px">{{ moment(game.date).format("DMMMYY") }}</span>
                </div>
              </span>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-list>
      </div>
<!--      <div class="col"></div>-->

      <q-dialog v-model="showVideoDialog" persistent>
        <q-card class="my-card">
          <div class="row items-center">

            <div class="text-subtitle1 q-ml-md"> {{ dialogTitle }} </div>
            <q-space />
            <q-btn
              icon="close"
              @click="closeDialog"
              flat round  />
          </div>
          <q-card-section
            style="margin-top:-13px"
          >
            <q-video v-html="videoUrl" src=""></q-video>
          </q-card-section>
        </q-card>
      </q-dialog>
      <q-page-scroller position="bottom-right" :scroll-offset="60" :offset="[18, 18]">
        <q-btn fab-mini icon="keyboard_arrow_up" color="accent glossy" dense/>
      </q-page-scroller>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EplMatches from '../components/matches/EplMatches'
import AllMatches from '../components/matches/AllMatches'
import LaligaMatches from '../components/matches/LaligaMatches'
import SerieaMatches from '../components/matches/SerieaMatches'
import FranceLeague1Matches from '../components/matches/FranceLeague1Matches'
import ClubFriendliesMatches from '../components/matches/ClubFriendliesMatches'
import UefaMatches from '../components/matches/UefaMatches'
import EuropaMatches from '../components/matches/EuropaMatches'
import UefaNationsleagueMatches from '../components/matches/UefaNationsleagueMatches'
import WorldCupMatches from '../components/matches/WorldCupMatches'
import FaMatches from '../components/matches/FaMatches'

const moment = require('moment')
export default {
  name: 'PageIndex',
  components: {
    EplMatches,
    AllMatches,
    LaligaMatches,
    SerieaMatches,
    FranceLeague1Matches,
    ClubFriendliesMatches,
    UefaMatches,
    EuropaMatches,
    UefaNationsleagueMatches,
    WorldCupMatches,
    FaMatches
  },
  created () {
    this.loading = true
    setTimeout(() => {
      this.$store.dispatch('FETCH_MATCHES')
      this.loading = false
    }, 2000)
    // this.loadingMatches = true
  },
  data () {
    return {
      showVideoDialog: false,
      videoUrl: '',
      dialogTitle: '',
      loading: false,
      loadingMatches: false,
      tab: '',
      moment: moment,
      allMatches: [],
      eplMatches: [],
      laligaMatches: [],
      serieaMatches: [],
      franceLeague1Matches: [],
      clubFriendliesMatches: [],
      uefaMatches: [],
      europaMatches: [],
      uefaNationsLeagueMatches: [],
      faMatches: [],
      worldCupMatches: []
    }
  },
  computed: {
    ...mapGetters({
      loadingMatches: 'GET_FETCHING_MATCHES',
      matches: 'GET_MATCHES',
      addingMatch: 'GET_ADDING_MATCH'
    })
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
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions({

    }),
    showVideo (embed) {
      this.showVideoDialog = true
      this.dialogTitle = 'Highlights'
      this.videoUrl = embed
    },
    closeDialog () {
      this.showVideoDialog = false
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
