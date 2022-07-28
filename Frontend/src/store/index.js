import { createStore } from "vuex";


const store = createStore({
  state: {
    user: [],
  },
  getters: {
    user: (state) => {
      return state.user;
    },
  },
  mutations: {
    user(state, user) {
      state.user = user;
    },
  },
  actions: {
    user(context, user) {
      context.commit("user", user);
    },
  },
});

export default store;
