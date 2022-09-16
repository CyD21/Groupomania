/* eslint-disable prettier/prettier */
import { createStore } from "vuex";

const store = createStore({
  state: {
    user: [],
    posts: {},
    comments: [],
  },
  getters: {
    user: (state) => {
      return state.user;
    },
    posts: (state) => {
      return state.posts;
    },
    comments: (state) => {
      return state.comments;
    },
    formatDate: function(state) {
      state
      return function(dateFR) {
          if (!dateFR) {
              return ""
          }
          const formatDateFR = new Date(dateFR);
          const date = new Intl.DateTimeFormat('fr-FR').format(formatDateFR);
          const time = new Intl.DateTimeFormat('fr-FR', {timeStyle: 'short' }).format(formatDateFR);
          return `${date.replaceAll('/', '.')} à ${time}`;
      }
    },
  },
  mutations: {
    user(state, user) {
      state.user = user;
    },
    posts(state, posts) {
      state.posts = posts;
    },
    comments(state, comments) {
      state.comments = comments;
    }
  },
  actions: {
    user(context, user) {
      context.commit("user", user);
    },
    posts(context, posts) {
      context.commit("posts", posts);
    },
    comments(context, comments) {
      context.commit("comments", comments);
    },
  },
});

export default store;
