import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    apiUrl: "http://127.0.0.1:8000/api",
    products: [],
    product: [],
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
    getProduct: (state) => (id) => {
      return axios
        .get(state.apiUrl + "/showProduct/" + id)
        .then((response) => {
          state.product = response.data;
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    updateProductName(state, productName) {
      state.product.product_name = productName;
    },
    updateProductDescription(state, productDescription) {
      state.product.product_description = productDescription;
    },
    updateProductQuantity(state, productQuantity) {
      state.product.quantity = productQuantity;
    },
    updateProductPrice(state, productPrice) {
      state.product.price = productPrice;
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
    updateProductName({ commit }, productName) {
      commit("updateProductName", productName);
    },
    updateProductDescription({ commit }, productDescription) {
      commit("updateProductDescription", productDescription);
    },
    updateProductQuantity({ commit }, productQuantity) {
      commit("updateProductQuantity", productQuantity);
    },
    updateProductPrice({ commit }, productPrice) {
      commit("updateProductPrice", productPrice);
    },
  },
  modules: {},
});
