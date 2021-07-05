<template>
  <q-card class="my-card q-mt-xl" style="height: 450px; margin-top: -10px">
    <q-card-section class="q-pb-sm row items-center justify-center">
      <div class="text-h6">
        <q-avatar size="md">
          <img src="../../assets/icons/AppIcon.png">
        </q-avatar>
        &nbsp; Search Matches
      </div>
      <q-space />
      <q-btn
        @click="closeSearch"
        icon="close" size="lg" class="small-screen-only" flat round dense v-close-popup
      />
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
      <p class="text-h6">No Match Found 😪 </p>
    </template>
<!--    <q-dialog v-model="showVideoDialog" persistent>-->
<!--      <q-card class="my-card">-->
<!--        <div class="row items-center">-->

<!--          <div class="text-subtitle1 q-ml-md"> {{ dialogTitle }} </div>-->
<!--          <q-space />-->
<!--          <q-btn-->
<!--            icon="close"-->
<!--            @click="closeDialog"-->
<!--            flat round />-->
<!--        </div>-->
<!--        <q-card-section-->
<!--          style="margin-top:-13px"-->
<!--        >-->
<!--          <q-video :src="videoUrl" />-->
<!--        </q-card-section>-->
<!--      </q-card>-->
<!--    </q-dialog>-->

  </q-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
const moment = require('moment')

export default {
  name: 'Search',
  data () {
    return {
      search: '',
      showVideoDialog: true,
      moment: moment
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
    showVideo (video, index) {
      this.showVideoDialog = true
      this.dialogTitle = 'Highlights'
      this.videoUrl = video
    },
    closeDialog () {
      this.showVideoDialog = false
    },
    closeSearch () {
      this.openRightDrawer(false)
    }
  }
}
</script>

<style scoped>

</style>
