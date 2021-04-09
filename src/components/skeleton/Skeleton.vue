<template>
    <q-item class="" style="margin-top: -2px; margin-bottom: -15px">
      <q-item-section avatar>
        <q-skeleton type="QAvatar" class="skeleton-avatar" size="25px"/>
      </q-item-section>

      <q-item-section class="skeleton-section">
        <q-item-label>
          <q-skeleton class="skeleton" type="text"/>
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
  .skeleton-avatar{
    height: 25px;
  }
  .skeleton-section{
    margin-left: -30px;
    height: 35px
  }
  .skeleton{
    height: 60px
  }
</style>
