<template>
    <div>
      <q-header elevated>
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="leftDrawerOpen = !leftDrawerOpen"
          />

          <q-toolbar-title>
            <div style="margin-top: 5px" class="text-italic">
              {{ title }}
            </div>
            <p style="font-size: 14px">&nbsp;&nbsp;<sub> Watch Soccer Highlights</sub></p>
          </q-toolbar-title>

          <div class="search-small-screen-only">
<!--            <SearchMobile />-->
          </div>
          <div class="search-large-screen-only">
<!--            <input v-model="text" @keyup.enter="send()" />-->
<!--            <button @click="send()">Send</button> v-on:keyup.enter="submit"-->
<!--            <Search :message="message" />-->
<!--            <Search />-->
<!--            <Search :search="search" :filteredMatches="matches"/>-->
          </div>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="200"
        :breakpoint="600"
      >
        <q-img height="100px"  width="100%" src="../../statics/icons/Fantasy.png"></q-img>

        <q-scroll-area
          :thumb-style="thumbStyle"
          :content-style="contentStyle"
          style="height: calc(100% - 80px);
          margin-top: -22px; border-right: 1px solid #ddd">

        <q-list  dense padding class="rounded-borders text-grey-8" style="margin-top: 20px">

          <!--  leagues -->
          <q-item label="England">
            <q-item-section class="bg-blue-grey-7 text-center text-black" style="margin: 0px">
              <div>
                <q-icon icon="star" name="star" /> My Leagues
              </div>
            </q-item-section>
          </q-item>
          <q-tabs
            dense
            vertical
            no-caps
          >

            <div class="row">
              <div class="col-xs-2">
                <country-flag country='gb-eng' class="" size='small' style="margin-top: -6px" />
              </div>
              <div class="col-xs-10">
                <q-tab @click="setCurrentTab('epl')" label="Premier League"/>
              </div>
            </div>

            <div class="row myLeagues">
              <div class="col-xs-2">
                <country-flag country='ita' class="" size='small' style="margin-top: -6px" />
              </div>
              <div class="col-xs-10">
                <q-tab class="q-tab" @click="setCurrentTab('seriea')" dense label="Serie A" />
              </div>
            </div>

            <div class="row myLeagues">
              <div class="col-xs-2">
                <country-flag country='esp' size='small' style="margin-top: -6px" />
              </div>
              <div class="col-xs-10">
                <q-tab class="q-tab" @click="setCurrentTab('laliga')" dense label="La Liga" />
              </div>
            </div>

            <div class="row myLeagues">
              <div class="col-xs-2">
                <country-flag country='fra'  size='small' style="margin-top: -6px" />
              </div>
              <div class="col-xs-10 ">
                <q-tab class="q-tab" @click="setCurrentTab('franceleague1')" dense label="League 1" />
              </div>
            </div>

          </q-tabs>

          <!--  countries-->
          <q-separator></q-separator>
          <q-item label="England">
            <q-item-section class="bg-blue-grey-7 text-center text-black" style="margin-top: 0px">
              Countries
            </q-item-section>
          </q-item>
          <q-tabs
            v-model="tab"
            dense
            vertical
            no-caps
          >

            <div class="row ">
              <div class="col-xs-2">
                <country-flag country='gb-eng' class="" size='small' style="margin-top: -10px" />
              </div>
              <div class="col-xs-10 expansion-item">
                <q-expansion-item dense dense-toggle label="England" style="margin-top: -6px">
                  <q-item class="text-black"
                          @click="setCurrentTab('epl')"
                          dense exact clickable icon="star">
                    Premier League
                    <q-icon icon="star" right name="star"/>
                  </q-item>
                  <q-item class="text-black" @click="setCurrentTab('englandchampionship')" dense exact clickable to="/">Championship</q-item>
                  <q-item class="text-black" @click="setCurrentTab('englandleagueone')" dense exact clickable to="/">League One</q-item>
                  <q-item class="text-black" @click="setCurrentTab('englandleaguetwo')" dense exact clickable to="/">League Two</q-item>
                  <q-item class="text-black" @click="setCurrentTab('fa')" dense exact clickable to="/">FA Cup</q-item>
                  <q-item class="text-black" @click="setCurrentTab('efl')" dense exact clickable>EFL Cup</q-item>
                </q-expansion-item >
              </div>
            </div>

            <div class="row q-mt-xs">
              <div class="col-xs-2">
                <country-flag country='esp' class="" size='small' style="margin-top: -20px"></country-flag>
              </div>
              <div class="col-xs-10">
                <q-expansion-item dense dense-toggle label="Spain" style="margin-top: -16px">
                  <q-item class="text-black" dense exact clickable to="/" @click="setCurrentTab('laliga')">
                    La liga
                    <q-icon icon="star" right name="star"/>
                  </q-item>
                  <q-item class="text-black" dense exact clickable to="/">La liga2</q-item>
                  <q-item class="text-black" dense exact clickable to="/">Segunda Div B-Grp1</q-item>
                  <q-item class="text-black" dense exact clickable to="/">Segunda Div B-Grp2</q-item>
                </q-expansion-item>
              </div>
            </div>

            <div class="row ">
              <div class="col-xs-2">
                <country-flag country='ita' class="" size='small' style="margin-top: -16px"></country-flag>
              </div>
              <div class="col-xs-10">
                <q-expansion-item dense dense-toggle label="Italy" style="margin-top: -12px">
                  <q-item @click="setCurrentTab('seriea')" class="text-black" dense exact clickable to="/">
                    Serie A
                    <q-icon icon="star" right name="star"/>
                  </q-item>
                  <q-item class="text-black" dense exact clickable to="/">Serie B</q-item>
                  <q-item class="text-black" dense exact clickable to="/">Serie C Group A</q-item>
                  <q-item class="text-black" dense exact clickable to="/">Serie C Group B</q-item>
                </q-expansion-item>
              </div>
            </div>

            <div class="row">
              <div class="col-xs-2">
                <country-flag country='deu' class="" size='small' style="margin-top: -18px"></country-flag>
              </div>
              <div class="col-xs-10">
                <q-expansion-item dense dense-toggle label="Germany" style="margin-top: -12px">
                  <q-item class="text-black" dense exact clickable to="/" @click="setCurrentTab('bundesliga')">Bundesliga</q-item>
                  <q-item class="text-black" dense exact clickable to="/">2nd Bundesliga</q-item>
                  <q-item class="text-black" dense exact clickable to="/">3rd Liga</q-item>
                  <q-item class="text-black" dense exact clickable to="/">Regionalliga North</q-item>
                </q-expansion-item>
              </div>
            </div>

            <div class="row">
              <div class="col-xs-2">
                <country-flag country='fra' class="" size='small' style="margin-top: -20px" />
              </div>
              <div class="col-xs-10">
                <q-expansion-item dense dense-toggle label="France" header-class="" style="margin-top: -16px">
                  <q-item class="text-black" dense exact clickable @click="setCurrentTab('franceleague1')">
                    League 1
                    <q-icon icon="star" right name="star"/>
                  </q-item>
                  <q-item class="text-black" dense exact clickable to="/">League 2</q-item>
                  <q-item class="text-black" dense exact clickable to="/">National</q-item>
                  <q-item class="text-black" dense exact clickable to="/">National 2-Group A</q-item>
                </q-expansion-item>
              </div>
            </div>
          </q-tabs>
        </q-list>
      </q-scroll-area>
      </q-drawer>
    </div>
</template>

<script>

import CountryFlag from 'vue-country-flag'
import { mapGetters } from 'vuex'

export default {
  name: 'MainNav',
  data () {
    return {
      text: '',
      message: '',
      leftDrawerOpen: false,
      title: 'kscore.com',
      tab: '',
      contentStyle: {
        color: '#555',
        backgroundColor: 'rgba(0,0,0,0.02)'
      },

      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '2px',
        opacity: 0.75
      },

      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#027be3',
        width: '9px',
        opacity: 0.2
      }
    }
  },
  components: {
    CountryFlag
  },
  methods: {
    setCurrentTab (tabName) {
      this.$store.commit('SET_CURRENT_TAB', tabName)

      // get widows/client width
      const width = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth

      if (width < 600) {
        this.leftDrawerOpen = false
      }
    },
    send () {
      this.message = this.text
      this.text = ''
    }
  },
  computed: {
    ...mapGetters({
      loadingMatches: 'GET_FETCHING_MATCHES',
      matches: 'GET_MATCHES',
      addingMatch: 'GET_ADDING_MATCH',
      tab: 'GET_CURRENT_TAB'
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
  .router-link {
    text-decoration: none;
  }
  .q-tab {
    margin-top: -3px;
    text-align: left;
    margin-left: -10px;

    /*position: sticky;*/
  }
  .text-black{
    margin-top: -3px
  }
  .myLeagues {
    margin-top: -13px
  }
  q-item-section{
  }

</style>
