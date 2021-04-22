<template>
  <div>
    <q-list class="my-list">
      <q-card
        :loading="loadingMatches"
        v-for="(game, index) in matches"
        :key="index"
        :value="game.value"
        v-ripple
        class="q-mb-xs">
        <q-card-section @click="showVideo(game.videos[0].embed)">
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
                <div class="fa-bold "  style="">
                  &nbsp;<span style="font-size:12px">{{ game.title }}&nbsp;
                  <sub style="float:right; font-size:8.5px">{{ moment(game.date).format("DMMMYY") }}</sub>
                </span>
                </div>
              </span>
            </div>
          </div>
        </q-card-section>
        <q-separator />
      </q-card>
    </q-list>

    <q-dialog v-model="showVideoDialog" transition-show="" transition-hide="" persistent>
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
      dialogTitle: '',
      videoUrl: ''
    }
  },
  methods: {
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
  .my-card{
    width: 100%;
    max-width: 800px
  }
  .my-list{
    margin-top: -8px;
    margin-left: -12px;
    margin-right: -12px
  }
</style>
