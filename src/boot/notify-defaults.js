import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'bottom',
  timeout: 1500,
  textColor: 'white',
  actions: [{ icon: 'close', color: 'white' }],
  progress: true,
  persistent: true,
  classes: 'glossy'
})
