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
              <q-avatar size="xs" class="rotatecontinuous">
                <q-img src="../../assets/icons/AppIcon.png" />
              </q-avatar>
                {{ title }}
            </div>
            <q-space />
            <p style="font-size: 14px; margin-left: -5px">&nbsp;&nbsp;<sub> Watch Soccer Highlights</sub></p>
          </q-toolbar-title>

<!--          user auth component-->
          <UserAuthDialog />
          <q-toggle
            :false-value="'false'"
            :true-value="'true'"
            v-model="theme"
            :icon="theme === 'true' ? 'nights_stay' : 'wb_sunny'"
            color="black"
            size="md"
          />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        side="left"
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
            <div class="row q-py-xs" v-for="(league, index) in leagues" :key="index">
                <span  class="q-ml-md q-mt-xs" >
                <country-flag :country="league.country" size='small' style="margin-right: -40px" />
                </span>
                <q-tab @click="setCurrentTab(`${league.tabName}`)" :label="league.tabLabel" />
            </div>

          </q-tabs>

          <!--  countries-->
          <q-separator class="q-my-md"></q-separator>
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

            <div class="row q-mt-sm"  v-for="(league, index) in leaguesPerCountry" :key="index">
              <div class="col-xs-2">
                <country-flag :country="league.country" size='small' style="margin-top: -6px" />
              </div>
              <div class="col-xs-10">
                <q-expansion-item dense dense-toggle :label="league.label" class="" style="margin-bottom: -1px">
                  <q-item @click="setCurrentTab(`${league.tabName}`)" dense exact clickable icon="star" style="margin-top: 5px">
                    {{ league.tabLabel }}
                    <q-icon icon="star" right name="star"/>
                  </q-item>
                </q-expansion-item >
              </div>
            </div>
          </q-tabs>
        </q-list>

      </q-scroll-area>
      <div class="absolute  q-px-md" style="margin-top: -30px">
        Made by <a style="color: cornflowerblue" href="https://www.linkedin.com/in/marvin-espira/" target="_blank">Marvin Espira</a>
      </div>
      </q-drawer>

      <!--      right drawer for search component-->
      <q-drawer
        v-if="rightDrawer"
        v-model="rightDrawerOpen"
        side="right"
        show-if-above
        :width="280"
        class="small-screen-only"
      >
        <q-scroll-area
          :thumb-style="thumbStyle" style="height: calc(100vh - 10px)">
          <Search  />
        </q-scroll-area>
      </q-drawer>
      <q-drawer
        v-if="rightDrawer"
        v-model="rightDrawerOpen"
        side="right"
        show-if-above
        :width="400"
        class="large-screen-only"
      >
        <Search  />
      </q-drawer>

    </div>
</template>

<script>
import UserAuthDialog from '../auth/UserAuthDialog'
import CountryFlag from 'vue-country-flag'
import { mapGetters, mapActions } from 'vuex'
import Search from 'components/search/Search'

export default {
  name: 'MainNav',
  components: { CountryFlag, UserAuthDialog, Search },
  created () {
    this.getInitialTheme()
    this.getWidth()
  },
  data () {
    return {
      text: '',
      message: '',
      theme: localStorage.getItem('theme'),
      leftDrawerOpen: false,
      rightDrawerOpen: false,
      title: 'Match Highlights',
      contentStyle: {
        color: '#555',
        backgroundColor: 'rgba(0,0,0,0.02)'
      },

      thumbStyle: {
        right: '1px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '4px',
        opacity: 0.75
      },

      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#027be3',
        width: '9px',
        opacity: 0.2
      },
      leagues: [
        {
          country: 'gb-eng',
          tabName: 'epl',
          tabLabel: 'Premier League'
        },
        {
          country: 'ita',
          tabName: 'seriea',
          tabLabel: 'Serie A'
        },
        {
          country: 'esp',
          tabName: 'laliga',
          tabLabel: 'Laliga'
        },
        {
          country: 'fra',
          tabName: 'franceleague1',
          tabLabel: 'League 1'
        },
        {
          country: 'deu',
          label: 'Germany',
          tabName: 'bundesliga',
          tabLabel: 'Bundesliga'
        }
      ],
      leaguesPerCountry: [
        {
          country: 'gb-eng',
          label: 'England',
          tabName: 'epl',
          tabLabel: 'Premier League'
        },
        {
          country: 'ita',
          label: 'Italy',
          tabName: 'laliga',
          tabLabel: 'Serie A'
        },
        {
          country: 'esp',
          label: 'Spain',
          tabName: 'laliga',
          tabLabel: 'La Liga'
        },
        {
          country: 'fra',
          label: 'France',
          tabName: 'franceleague1',
          tabLabel: 'League 1'
        },
        {
          country: 'deu',
          label: 'Germany',
          tabName: 'bundesliga',
          tabLabel: 'Bundesliga'
        }
      ]
    }
  },
  watch: {
    theme: function () {
      console.log('type of theme in watch', typeof this.theme)
      localStorage.setItem('theme', this.theme)
      if (this.theme === 'true') {
        this.$q.dark.set(true)
      } else if (this.theme === 'false') {
        this.$q.dark.set(false)
      }
    },
    rightDrawer: function () {
      this.rightDrawer === true ? this.rightDrawerOpen = true : this.rightDrawerOpen = false
    }
  },
  methods: {
    ...mapActions({
      getWidth: 'CLIENT_WIDTH'
    }),
    getInitialTheme () {
      let appTheme = 'false'
      if (window && localStorage.getItem('theme')) {
        appTheme = localStorage.getItem('theme')
        appTheme === 'true' ? this.$q.dark.set(true) : this.$q.dark.set(false)
      } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          appTheme = 'true'
          this.$q.dark.set(true)
          localStorage.setItem('theme', true)
        } else {
          appTheme = 'false'
          this.$q.dark.set(false)
          localStorage.setItem('theme', false)
        }
      }
      this.theme = appTheme
    },
    setCurrentTab (tabName) {
      this.$store.commit('SET_CURRENT_TAB', tabName)

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
      clientWidth: 'GET_CLIENT_WIDTH',
      rightDrawer: 'GET_RIGHT_DRAWER'
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
    /* margin-top: -3px */
  }
  .myLeagues {
    /* margin-top: -10px */
  }

  .rotatecontinuous {
    animation: rotation 4s infinite linear;
  }
  @keyframes rotation {
    from {
      /* transform: rotate(0deg); */
    }
    to {
      /* transform: rotate(359deg); */
    }
  }

</style>
