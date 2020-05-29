export const mutationFirebaseInstance = 'webFirebaseInstance';
export const mutationFirebaseMessageInstance= 'mutationFirebaseMessageInstance';
export const mutationPushNewMessage = 'mutationPushNewMessage';
export const actionInitializeApp = 'webFirebaseInitializeApp';
export const actionMessageReceived = 'actionMessageReceived';

const initial = {

}

export const instanceWeb = {
  ...initial,
  ...{
    state: {
      firebase: {},
      messaging: {},
      chat: []
    },
    mutations: {
      [mutationFirebaseInstance]: (state, payload) => {
        state.firebase = payload;
      },
      [mutationFirebaseMessageInstance]: (state, payload) => {
        state.messaging = payload;
      },
      [mutationPushNewMessage]: (state, payload) => {
        state.chat.push(payload);
      }
    },
    actions: {
      [actionInitializeApp]: ({commit, state, dispatch}, payload) => {
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

        const messaging = state.firebase.messaging()
        messaging.usePublicVapidKey(payload.vapidKey)
        messaging.onMessage((payload) => {
          console.log(payload);
          dispatch(actionMessageReceived, payload);
        });
      },
      [actionMessageReceived]: ({commit}, payload) => {
        commit(mutationPushNewMessage, payload);
      }
    }
  }
}

export default initial

