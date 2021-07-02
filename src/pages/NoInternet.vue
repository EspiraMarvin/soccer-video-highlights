<template>
  <div class="fullscreen bg-red-4 text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 5vh">
        <q-icon name="contactless" class="rotate-270" size="xl" /> No Internet Connection
      </div>

      <div class="text-h6 q-mt-lg" style="opacity:.5">
        Check your connection, then refresh the page
      </div>

      <q-btn
        class="q-mt-xl q-px-xl q-py-xs"
        color="white"
        rounded
        text-color="blue"
        unelevated
        size="lg"
        to="/"
        label="Refresh"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoInternet'
}
</script>

<style scoped>

</style>
