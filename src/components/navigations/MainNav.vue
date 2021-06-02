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
            <p style="font-size: 14px; margin-left: -5px">&nbsp;&nbsp;<sub> Watch Soccer Highlights</sub></p>
          </q-toolbar-title>

<!--          user auth component-->
          <UserAuthDialog />

          <q-toggle
            :false-value="this.$q.dark.set(theme)"
            :true-value="this.$q.dark.set(theme)"
            v-model="theme"
            :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
            color="black"
            size="lg"
          />
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

        <q-list  dense padding class="" style="margin-top: 20px">

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
                <country-flag country='gb-eng' size='small' style="margin-top: -10px" />
              </div>
              <div class="col-xs-10">
                <q-expansion-item dense dense-toggle label="England" style="margin-top: -6px">
                  <q-item @click="setCurrentTab('epl')" dense exact clickable icon="star">
                    Premier League
                    <q-icon icon="star" right name="star"/>
                  </q-item>
                  <q-item @click="setCurrentTab('englandchampionship')" dense exact clickable>Championship</q-item>
                  <q-item @click="setCurrentTab('englandleagueone')" dense exact clickable>League One</q-item>
                  <q-item @click="setCurrentTab('englandleaguetwo')" dense exact clickable>League Two</q-item>
                  <q-item @click="setCurrentTab('fa')" dense exact clickable>FA Cup</q-item>
                  <q-item @click="setCurrentTab('efl')" dense exact clickable>EFL Cup</q-item>
                </q-expansion-item >
              </div>
            </div>

            <div class="row q-mt-xs">
              <div class="col-xs-2">
                <country-flag country='esp' class="" size='small' style="margin-top: -20px"></country-flag>
              </div>
              <div class="col-xs-10">
                <q-expansion-item dense dense-toggle label="Spain" style="margin-top: -16px">
                  <q-item dense exact clickable @click="setCurrentTab('laliga')">
                    La liga
                    <q-icon icon="star" right name="star"/>
                  </q-item>
                  <q-item dense exact clickable>La liga2</q-item>
                  <q-item dense exact clickable>Segunda Div B-Grp1</q-item>
                  <q-item dense exact clickable>Segunda Div B-Grp2</q-item>
                </q-expansion-item>
              </div>
            </div>

            <div class="row ">
              <div class="col-xs-2">
                <country-flag country='ita' class="" size='small' style="margin-top: -16px"></country-flag>
              </div>
              <div class="col-xs-10">
                <q-expansion-item dense dense-toggle label="Italy" style="margin-top: -12px">
                  <q-item @click="setCurrentTab('seriea')" dense exact clickable>
                    Serie A
                    <q-icon icon="star" right name="star"/>
                  </q-item>
                  <q-item dense exact clickable>Serie B</q-item>
                  <q-item dense exact clickable>Serie C Group A</q-item>
                  <q-item dense exact clickable>Serie C Group B</q-item>
                </q-expansion-item>
              </div>
            </div>

            <div class="row">
              <div class="col-xs-2">
                <country-flag country='deu' class="" size='small' style="margin-top: -18px"></country-flag>
              </div>
              <div class="col-xs-10">
                <q-expansion-item dense dense-toggle label="Germany" style="margin-top: -12px">
                  <q-item dense exact clickable @click="setCurrentTab('bundesliga')">Bundesliga</q-item>
                  <q-item dense exact clickable>2nd Bundesliga</q-item>
                  <q-item dense exact clickable>3rd Liga</q-item>
                  <q-item dense exact clickable>Regionalliga North</q-item>
                </q-expansion-item>
              </div>
            </div>

            <div class="row">
              <div class="col-xs-2">
                <country-flag country='fra' class="" size='small' style="margin-top: -20px" />
              </div>
              <div class="col-xs-10">
                <q-expansion-item dense dense-toggle label="France" header-class="" style="margin-top: -16px">
                  <q-item dense exact clickable @click="setCurrentTab('franceleague1')">
                    League 1
                    <q-icon icon="star" right name="star"/>
                  </q-item>
                  <q-item dense exact clickable>League 2</q-item>
                  <q-item dense exact clickable>National</q-item>
                  <q-item dense exact clickable>National 2-Group A</q-item>
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
import UserAuthDialog from '../auth/UserAuthDialog'
import CountryFlag from 'vue-country-flag'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MainNav',
  components: { CountryFlag, UserAuthDialog },
  created () {
    // console.log('theme', this.$q.dark.isActive)
    this.theme = JSON.parse(localStorage.getItem('theme'))
  },
  data () {
    return {
      text: '',
      message: '',
      theme: '',
      leftDrawerOpen: false,
      title: 'kscore.com',
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
  watch: {
    theme: function () {
      localStorage.setItem('theme', JSON.stringify(this.theme))
    }
  },
  methods: {
    ...mapActions({
      signInUser: 'LOGIN_USER'
    }),
    setCurrentTab (tabName) {
      this.$store.commit('SET_CURRENT_TAB', tabName)

      // get widows/client width / viewport
      if (this.clientWidth < 600) {
        this.leftDrawerOpen = false
      }
    }
  },
  computed: {
    ...mapGetters({
      loadingMatches: 'GET_FETCHING_MATCHES',
      matches: 'GET_MATCHES',
      addingMatch: 'GET_ADDING_MATCH',
      tab: 'GET_CURRENT_TAB',
      clientWidth: 'GET_CLIENT_WIDTH'
      // currentUser: 'GET_CURRENT_USER',
      // image: 'GET_USER_PHOTO',
      // user: 'GET_DISPLAY_NAME'
    })
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

</style>
