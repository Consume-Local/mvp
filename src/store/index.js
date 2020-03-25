import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { categories } from './categories.json';
import { states } from './states.json';

// @TODO Put inside a secret or an .env file
const idSheets = '1iZyysygqeyx_a2qDEzuF19otP8HSR2MIFr0MkSSKUCs';
const apiKey = 'AIzaSyD2BDqSLvHXyTslgFko8BZg4xKtCIMceYk';

export default new Vuex.Store({
  state: {
    listings: [],
    categories,
    states,
  },
  mutations: {
    addListings(state, payload) {
      state.listings = payload;
    },
  },
  actions: {
    FETCH_LISTINGS(context) {
      const values = 'A2:AZ100';
      const fetchUrl = `https://content-sheets.googleapis.com/v4/spreadsheets/${idSheets}/values/A2:AZ100?access_token=${apiKey}&key=${apiKey}`;
      fetch(fetchUrl)
        .then((list) => {
          return list.json()
        }).then((items) => {
          console.log(items.values);
          context.commit('addListings', items.values)
        }).catch(err => {
          console.log(err);
        })
    },
  },

  getters: {
    // Returns all listings
    listings: (state) => state.listings,

    // Returns a listing by slug
    listingBySlug: (state) => (slug) => {
      return state.listings.find(el => el[23] === slug)
    },

    // Returns all categories
    categories: (state) => state.categories,

    // Returns all states
    states: (state) => state.states,
  },
})
