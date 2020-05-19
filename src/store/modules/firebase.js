export const mutationFirebaseInstance = 'webFirebaseInstance';
export const actionInitializeApp = 'webFirebaseInitializeApp';

const initial = {

}

export const instanceWeb = {
  ...initial,
  ...{
    state: {
      firebase: {}
    },
    mutations: {
      [mutationFirebaseInstance]: (state, payload) => {
        state.firebase = payload;
      }
    },
    actions: {
      [actionInitializeApp]: ({commit, state}, payload) => {
        commit(mutationFirebaseInstance, payload.firebase);

        const { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId } = payload
        state.firebase.initializeApp({
          apiKey,
          authDomain,
          databaseURL,
          projectId,
          storageBucket,
          messagingSenderId,
          appId
        });
      }
    }
  }
}

export default initial

