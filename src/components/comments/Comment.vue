<template>
    <q-toolbar>
      <q-form
        @submit="postComment"
        class="full-width"
      >
        <p class="text-center"> Comments</p>
        <q-input
          v-model="comment"
          ref="newMessage"
          Standard
          bg-color="white"
          label="Comment"
          dense
          class="q-mb-md"
        >
          <template v-slot:after>
            <q-btn
              dense
              flat
              rounded
              @click="postComment"
              color="blue"
              icon="send" />
          </template>
        </q-input>
      </q-form>
    </q-toolbar>
</template>

<script>
export default {
  name: 'Comment',
  data () {
    return {
      comment: ''
    }
  },
  methods: {
    postComment () {
      console.log('comment')
    }
  }
}
</script>

<style scoped>

</style>
