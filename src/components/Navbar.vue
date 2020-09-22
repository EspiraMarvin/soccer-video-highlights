<template>
  <div>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="200"
      :breakpoint="600"
    >
      <q-img height="100px"  width="100%" src="../statics/icons/Fantasy.png"></q-img>

      <q-scroll-area style="height: calc(100% - 80px); margin-top: -22px; border-right: 1px solid #ddd"
                     :thumb-style="thumbStyle"
      >
        <q-list  dense padding class="rounded-borders" style="margin-top: 20px"
        >

          <!--  leagues -->
          <q-item label="England">
            <q-item-section class="bg-blue-grey-7 text-center text-black" style="margin: 0px">
              <div>
                <q-icon icon="star" name="star" /> My Leagues
              </div>
            </q-item-section>
          </q-item>
          <q-tabs
            v-model="tab"
            dense
            vertical
            no-caps
          >

            <div class="row">
              <div class="col-xs-2">
                <country-flag country='gb-eng' class="" size='small' style="margin-top: -6px" />
              </div>
              <div class="col-xs-10 expansion-item">
                  <q-tab class="q-tab"  name="epl" label="Premier League"/>
              </div>
            </div>

            <div class="row myLeagues">
              <div class="col-xs-2">
                <country-flag country='ita' class="" size='small' style="margin-top: -6px" />
              </div>
              <div class="col-xs-10 expansion-item">
                <q-tab class="q-tab" dense name="seriea" label="Serie A" />
              </div>
            </div>

            <div class="row myLeagues">
              <div class="col-xs-2">
                <country-flag country='esp' size='small' style="margin-top: -6px" />
              </div>
              <div class="col-xs-10 expansion-item">
                <q-tab class="q-tab" name="laliga" label="La Liga" />
              </div>
            </div>

            <div class="row myLeagues">
              <div class="col-xs-2">
                <country-flag country='fra' class="" size='small' style="margin-top: -6px" />
              </div>
              <div class="col-xs-10 expansion-item">
                <q-tab class="q-tab" dense name="league1" label="League 1" />
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

          <div class="row">
            <div class="col-xs-2">
              <country-flag country='gb-eng' class="" size='small' style="margin-top: -6px" />
            </div>
            <div class="col-xs-10 expansion-item">
              <q-expansion-item dense dense-toggle label="England" style="margin-top: -6px">
                <q-item class="text-black" dense exact clickable to="/" icon="star">
                  Premier League
                  <q-icon icon="star" right name="star"/>
                </q-item>
                <q-item class="text-black" dense exact clickable to="/">Championship</q-item>
                <q-item class="text-black" dense exact clickable to="/">League One</q-item>
                <q-item class="text-black" dense exact clickable to="/">League Two</q-item>
                <q-item class="text-black" dense exact clickable to="/">FA Cup</q-item>
              </q-expansion-item >
            </div>
          </div>

          <div class="row">
            <div class="col-xs-2">
              <country-flag country='esp' class="" size='small' style="margin-top: -20px"></country-flag>
            </div>
            <div class="col-xs-10">
              <q-expansion-item dense dense-toggle label="Spain" style="margin-top: -16px">
                <q-item class="text-black" dense exact clickable to="/">
                  La liga
                  <q-icon icon="star" right name="star"/>
                </q-item>
                <q-item class="text-black" dense exact clickable to="/">La liga2</q-item>
                <q-item class="text-black" dense exact clickable to="/">Segunda Div B-Grp1</q-item>
                <q-item class="text-black" dense exact clickable to="/">Segunda Div B-Grp2</q-item>
              </q-expansion-item>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-2">
              <country-flag country='ita' class="" size='small' style="margin-top: -16px"></country-flag>
            </div>
            <div class="col-xs-10">
              <q-expansion-item dense dense-toggle label="Italy" style="margin-top: -12px">
                <q-item class="text-black" dense exact clickable to="/">
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
                <q-item class="text-black" dense exact clickable to="/">Bundesliga</q-item>
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
                <q-item class="text-black" dense exact clickable to="/">
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

export default {
  name: 'Navbar',
  created () {

  },
  data () {
    return {
      tab: '',
      leftDrawerOpen: true,
      thumbStyle: {
        right: '1px',
        borderRadius: '2px',
        backgroundColor: '#027be3',
        width: '2px',
        opacity: 0.75
      }
    }
  },
  components: {
    CountryFlag
  }
}
</script>

<style scoped>
  .router-link {
    text-decoration: none;
  }
  .q-tab {
    margin-top: -5px;
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
