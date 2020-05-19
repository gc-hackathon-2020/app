import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'src/store/modules/firebase'
import {instanceWeb as webFirebase} from 'src/store/modules/firebase'
import { isWebDeploy } from 'src/static'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function () {
  return new Vuex.Store({
    modules: {
      firebase: isWebDeploy ? webFirebase : firebase
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })
}
