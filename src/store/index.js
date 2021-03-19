import Vue from 'vue'
import Vuex from 'vuex'

import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    membre: false,
    token: false,
    membres: [],
    conversations: [],
  },
  mutations: {
    setMembre(state, membre) {
      state.membre = membre;
    },
    setMembres(state, membres) {
      state.membres = membres;
    },
    setConversations(state, conversations) {
      state.conversations = conversations;
    },
    setToken(state, token) {
      state.token = token;
    },
    seDeconnecter(state){
      state.membre = false;
      state.token = false;
    },
  },
  getters: {
    getMembre: (state) => (id) => {
      return state.membres.find(membre => membre.id == id);
    },
    dateFormatter: (state) => (date) => {
      let options = {weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric'};
      let dateFormatee = new Date(date).toLocaleDateString('fr-FR', options);
      return dateFormatee;
    },
    sortByDate: (state) => (messages) => {
        return messages.sort((a, b)=> {
          if (a.created_at > b.created_at ){
            return 1;
          }
          if(a.created_at < b.created_at){
            return 0;
          };
        });
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
