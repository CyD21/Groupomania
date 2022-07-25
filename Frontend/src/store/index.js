import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    user: [],
  },
  getters: {
    user: (state) => {
      return state.user;
    },
  },
  actions: {
    user(context, user) {
      context.commit("user", user);
    },
  },
  mutations: {
    user(state, user) {
      state.user = user;
    },
  },
});

export default store;
