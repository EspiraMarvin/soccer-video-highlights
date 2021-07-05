<template>
  <q-layout view="lHh lpR fFf">
    <MainNav />
    <q-page-container>
      <router-view />
      <q-page-scroller position="bottom-right" :scroll-offset="60" :offset="[18, 18]">
        <q-btn fab-mini icon="keyboard_arrow_up" color="blue glossy" dense/>
      </q-page-scroller>
    </q-page-container>

  </q-layout>
</template>

<script>
import MainNav from '../components/navigations/MainNav'

export default {
  name: 'MainLayout',
  components: { MainNav },
  data () {
    return {
    }
  }
}
</script>
