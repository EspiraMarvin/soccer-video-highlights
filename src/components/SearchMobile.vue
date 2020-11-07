<template>
    <div>
    <q-btn
      @click="searchMobile('top')"
      push
      glossy
      text-color="white"
      round
      icon="eva-search"
    />
      <q-dialog  v-model="showInputDialog" :position="position" full-width>
        <q-card class="my-card bg-primary" style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <form class="" @submit.prevent="submitSearch">
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
                      v-if="search === ''"
                      text-color=""
                      color="white"
                      name="eva-search">
                    </q-icon>
                    <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
                  </template>
                </q-input>
            </form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
</template>

<script>
export default {
  name: 'SearchMobile',
  data () {
    return {
      showInputDialog: false,
      position: 'top'
    }
  },
  methods: {
    searchMobile (position) {
      this.position = position
      this.showInputDialog = true
    }
  }
}
</script>

<style scoped>

</style>
