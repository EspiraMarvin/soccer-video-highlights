<template>
  <div>
    <q-list class="my-list">
      <q-card
        :loading="loadingMatches"
        v-for="(game, index) in matches"
        :key="index"
        :value="game.value"
        v-ripple
        transition="flip-up"
        class="q-mb-xs cursor-pointer">
        <q-card-section @click="showVideo(game.videos[0].embed, game.title, game.date)">
          <div class="row col-xs-12 no-wrap items-center" style="height:3.5px">
            <div class=" row"
                 v-ripple
            >
              <div style="margin-right: 2.5px">
                <q-avatar class="q-responsive" style="font-size:20px" size="px">
                  <img :src="game.thumbnail" alt="Image">
                </q-avatar>
              </div>
              <span>
                <div class="fa-bold cursor-pointer"  style="">
                  &nbsp;<span style="font-size:12px">{{ game.title }}&nbsp;
                  <sub style="float:right; font-size:8.5px">{{ moment(game.date).format("DMMMYY") }}</sub>
                </span>
                </div>
              </span>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-list>

    <q-dialog v-model="showVideoDialog" transition-show="" transition-hide="" persistent>
      <q-card style="width: 800px; max-width: 100vw;">
        <div class="flex flex-inline items-center">
          <div class="text-subtitle2 q-px-md q-pb-sm q-pt-md">
            {{ matchDialogDetails[0] }}
            <q-badge class="q-ml-sm" color="green">{{ moment(matchDialogDetails[2]).format("D-MMMYY") }}</q-badge>
          </div>
          <q-space />
          <q-btn
            class="absolute-top-right z-top"
            style="margin-top: -4px"
            icon="close"
            @click="closeDialog"
            flat
            :size="$q.screen.gt.md ? 'xl' : 'lg'"
          />
        </div>
        <q-card-section
          style="margin-top:-13px"
        >
          <q-video v-html="videoUrl" src="" />

        </q-card-section>
        <q-card-actions>
          <!--            comments-->
          <!--            <Comment />-->
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
// import Comment from '../comments/Comment'
const moment = require('moment')
export default {
  name: 'Matches',
  components: { },
  props: {
    matches: {},
    loadingMatches: {},
    searchMatch: {}
  },
  data () {
    return {
      moment: moment,
      showVideoDialog: false,
      matchDialogDetails: [],
      videoUrl: ''
    }
  },
  methods: {
    showVideo (embed, title, date) {
      this.showVideoDialog = true
      this.matchDialogDetails.push(title)
      this.matchDialogDetails.push(date)
      this.videoUrl = embed
    },
    closeDialog () {
      this.showVideoDialog = false
      this.matchDialogDetails = []
    }
  }
}
</script>

<style scoped>
  .my-list{
    margin-top: -8px;
    margin-left: -12px;
    margin-right: -12px
  }
  .example-item {
    height: 290px;
    width: 290px
  }
</style>
