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

          <div> v{{ $q.version }}</div>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        content-class="bg-grey-1"
        :width="200"
        :breakpoint="580"
      >
        <q-list>
          <q-item-label
            header
            class="text-grey-8"
          >
            <Navbar />
          </q-item-label>
        </q-list>
      </q-drawer>
    </div>
</template>

<script>

import Navbar from '../Navbar'

export default {
  name: 'MainNav',
  components: { Navbar },
  data () {
    return {
      leftDrawerOpen: false,
      title: 'kscore.com'
    }
  }
}
</script>

<style scoped>

</style>
