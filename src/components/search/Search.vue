<template>
  <div class="">
    <q-card class="q-mt-xl absolute-full full-height" style="margin-top: -10px; margin-bottom: 10px; width: 100%">
      <q-card-section class="q-pb-sm row items-center justify-center">
        <div class="text-h6">
          <q-avatar size="md">
            <q-img src="../../assets/icons/AppIcon.png" />
          </q-avatar>
          &nbsp; Search Matches
        </div>
        <q-space />
        <q-btn
          @click="closeSearch"
          icon="close" size="lg" class="lt-md" flat round dense v-close-popup
        />
      </q-card-section>
      <div>
        <q-input
          v-model="search"
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

      <template v-if="search.length">
        <q-scroll-area
          class="full-height"
        >
        <div class="flex flex-center q-mt-lg" v-if="resultQuery.length === 0">
          <p class="text-h6">No Match Found 😪 </p>
        </div>
        <q-card flat v-for="(game, index) in resultQuery"
             :key="index"
             :value="game.value"
        >
          <q-card-section @click="showVideo(game.videos[0].embed, game.title, game.date)">
            <div class="row no-wrap items-center q-py-sm" style="height:3.5px">
              <div class="row full-width">
                <span>
                  <div class="fa-bold" style="font-size: 12px">
                    <q-avatar class="q-responsive" style="font-size:16px" size="px">
                      <img :src="game.thumbnail" alt="Image">
                    </q-avatar>
                    <span style="font-size:13px"> {{ game.title }} </span>
                  </div>
                </span>
              </div>
            </div>
          </q-card-section>
          <q-separator />
        </q-card>
        </q-scroll-area>
      </template>

    <q-dialog v-model="showVideoDialog" transition-show="" transition-hide="" persistent>
      <q-card style="width: 800px; max-width: 100vw;">
        <div class="flex flex-inline items-center">
          <div class="text-subtitle2 q-px-md q-py-sm">
            {{ matchDialogDetails[1] }}
            <q-badge color="green">{{ moment(matchDialogDetails[2]).format("D-MMMYY") }}</q-badge>
            <span>&nbsp;{{ matchDialogDetails[0] }}</span>
          </div>
          <q-space />
          <q-btn
            class=""
            icon="close"
            @click="closeDialog"
            flat round
            size="lg"
          />

        </div>
        <q-card-section
          style="margin-top:-13px"
        >
          <q-video v-html="videoUrl" src="" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
const moment = require('moment')

export default {
  name: 'Search',
  data () {
    return {
      search: '',
      showVideoDialog: false,
      moment: moment,
      videoUrl: '',
      matchDialogDetails: [],
      noMatches: false
    }
  },
  mounted () {
    console.log('mathc moutd', this.matches)
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
        console.log('result query search', this.search)
        return this.matches.filter((game) => {
          return this.search.toLowerCase().split(' ').every(v => game.title.toLowerCase().includes(v))
        })
      } else {
        return ''
      }
    }
  },
  watch: {
    resultQuery: function () {
      console.log('watching resultquery', this.resultQuery)
    }
  },
  methods: {
    ...mapActions({
      openRightDrawer: 'RIGHT_DRAWER'
    }),
    requestData () {
      this.loadingData = true
      this.$store.dispatch('FETCH_MATCHES')
      // const data = this.$store.dispatch('FETCH_MATCHES')
      // console.log('data', data)
      this.setCurrentTab('allgames')
      this.loadingData = false
    },
    showVideo (embed, title, date) {
      this.showVideoDialog = true
      this.matchDialogDetails.push('Highlights')
      this.matchDialogDetails.push(title)
      this.matchDialogDetails.push(date)
      this.videoUrl = embed
    },
    closeDialog () {
      this.showVideoDialog = false
      this.matchDialogDetails = []
    },
    closeSearch () {
      this.openRightDrawer(false)
    }
  }
}
</script>

<style scoped>

</style>
