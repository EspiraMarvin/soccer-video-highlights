<template>
  <q-layout view="lHh Lpr lFf">
    <MainNav />
    <q-page-container>
      <router-view />
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
