<template>
    <q-item class="" style="margin-top: -2px; margin-bottom: -15px">
      <q-item-section avatar>
        <q-skeleton type="QAvatar" style="height: 25px" size="25px"/>
      </q-item-section>

      <q-item-section style="margin-left: -30px; height: 35px">
        <q-item-label>
          <q-skeleton  style="height: 60px" type="text"/>
        </q-item-label>
      </q-item-section>
    </q-item>
</template>

<script>
export default {
  name: 'skeleton'
}
</script>

<style scoped>

</style>
