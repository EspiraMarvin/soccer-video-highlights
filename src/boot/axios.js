// import something here
import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
// export default async ({ app, router, Vue }) => {
// something to do
// }

// const api = axios.create({ baseURL: 'https://www.scorebat.com/video-api/v1' })
// Vue.prototype.$api = api

export default axios
