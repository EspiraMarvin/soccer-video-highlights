<template>
  <div>
<!--    <q-tabs>
      <q-tab @click="setCurrentTab('searchgames')"  label="Games">
      </q-tab>
    </q-tabs>
    <q-tab-panels v-model="tab">
      <q-tab-panel name="searchgames">
        <searchMatches  />
&lt;!&ndash;        <AllMatches :loading-matches="loadingMatches" :matches="allMatches" v-if="allMatches.length > 0"/>&ndash;&gt;
      </q-tab-panel>
    </q-tab-panels>-->
    <q-input
      v-model="search"
      dense
      square
      dark
      standout
      label="Search ..."
      type="search"
    >
      <template v-slot:append>
        <q-icon
          text-color=""
          color="white"
          name="eva-search">
        </q-icon>
<!--        <q-icon
          v-if="search === ''"
          text-color=""
          color="white"
          name="eva-search">
        </q-icon>-->
<!--        <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />-->
<!--        <div>{{ search }}</div>-->
      </template>
    </q-input>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import SearchMatches from './matches/searchMatches'

export default {
  name: 'Search',
  // components: { SearchMatches },
  props: {
    loadingMatches: {}
  },
  data () {
    return {

    }
  },
  methods: {
    submitSearch () {
      console.log('submitted')
    }
  },
  computed: {
    ...mapGetters({
      matches: 'GET_MATCHES'
    }),
    filteredMatches: function () {
      return this.matches.filter(game => {
        return game.title.match(this.search)
      })
    }
  }
}
</script>

<style scoped>

</style>
