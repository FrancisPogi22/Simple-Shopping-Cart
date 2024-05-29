import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    apiUrl: "http://127.0.0.1:8000/api",
    products: [],
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
  },
  actions: {
    async fetchProducts({ state, commit }) {
      try {
        const response = await axios.get(state.apiUrl + "/products");
        commit("setProducts", response.data);
      } catch (error) {
        alert("Error fetching products: " + error.message);
      }
    },
    async filterProducts({ state, commit }, price) {
      try {
        let response;
        if (price === "") {
          response = await axios.get(state.apiUrl + "/products");
        } else {
          response = await axios.get(state.apiUrl + "/filter/" + price);
        }
        commit("setProducts", response.data);
      } catch (error) {
        alert("Error filtering products: " + error.message);
      }
    },
  },
  modules: {},
});
