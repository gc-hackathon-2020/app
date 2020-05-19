import * as firebase from 'firebase/app';
import 'firebase/messaging'
import 'firebase/performance'
import 'firebase/analytics'
import { actionInitializeApp } from 'src/store/modules/firebase'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default ({store}) => {
  const firebaseConfig = require('src/firebase.json')

  store.dispatch(actionInitializeApp, {
    firebase,
    ...firebaseConfig
  });
}
