import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'bottom',
  timeout: 2000,
  textColor: 'white',
  actions: [{ icon: 'close', color: 'white' }],
  progress: true,
  persistent: true,
  classes: 'glossy'
})
