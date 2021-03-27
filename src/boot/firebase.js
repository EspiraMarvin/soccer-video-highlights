// import something here
import firebase from 'firebase'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async (/* { app, router, Vue ... } */) => {
  // something to do
  firebase.initializeApp({
    apiKey: 'AIzaSyDAWJil8m0vVkq6sdSH7Hcix4HIuLUaSxg',
    authDomain: 'social-media-auth-a092b.firebaseapp.com',
    databaseURL: 'https://social-media-auth-a092b.firebaseio.com',
    projectId: 'social-media-auth-a092b',
    storageBucket: 'social-media-auth-a092b.appspot.com',
    messagingSenderId: '812810120918',
    appId: '1:812810120918:web:5da539978bac6b4313e377',
    measurementId: 'G-VPVXR71FM5'
  })
}
