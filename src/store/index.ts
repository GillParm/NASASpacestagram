import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [createPersistedState()],
  state: {
    liked: [] as string[]
  },
  mutations: {
    UPDATE_LIKED (state, payload) {
      state.liked = payload
    }
  },
  actions: {
    addToLiked: function (context, payload) {
      const liked = context.state.liked
      liked.push(payload)
      context.commit('UPDATE_LIKED', liked)
    },
    removeFromLiked: function (context, payload) {
      const liked = context.state.liked
      const index = liked.indexOf(payload)
      liked.splice(index, 1)
      context.commit('UPDATE_LIKED', liked)
    }
  },
  modules: {
  }
})
