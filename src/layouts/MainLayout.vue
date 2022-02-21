<template>
<!--  <q-layout view="hHh lpR lff">-->
  <q-layout view="lHh lpR fFf">
    <MainNav />
    <q-page-container>
      <router-view />
      <q-page-scroller position="bottom-right" :scroll-offset="60" :offset="[18, 18]">
        <q-btn fab-mini icon="keyboard_arrow_up" color="blue glossy" dense/>
      </q-page-scroller>
      <q-footer>
        <CookieLaw theme="dark-lime" style="height: 65px">
            <div slot-scope="props" style="margin-top: -5px; margin-bottom: 5px">
                This application uses cookies.
              <button class="skew shadow-10" @click="props.accept" style="margin: 10px;">
                <span>Accept</span>
              </button>
<!--          <button class="skew" @click="props.close"><span>Ignore me</span></button>-->
          </div>
        </CookieLaw>
      </q-footer>
    </q-page-container>
  </q-layout>
</template>

<script>
import CookieLaw from 'vue-cookie-law'
import MainNav from '../components/navigations/MainNav'

export default {
  name: 'MainLayout',
  components: { MainNav, CookieLaw },
  data () {
    return {
    }
  },
  methods: {
    accept () {
      console.log('accepted')
    }
  }
}
</script>
