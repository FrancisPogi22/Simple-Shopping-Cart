<template>
  <HeaderPage />
  <section id="cart">
    <div class="wrapper">
      <div class="cart-con">
        <h2>My Cart</h2>
        <div class="cart-list-con">
          <div class="cart-widget" v-for="cart in cartItem" :key="cart.cart_id">
            <div class="product-img-con">
              <img src="../assets/default_product.jpg" alt="Image" />
            </div>
            <h4>Product Name: {{ cart.product_name }}</h4>
            <p>Product Description: {{ cart.product_description }}</p>
            <p>Quantity: {{ cart.quantity }}</p>
            <p>Price: {{ cart.price }}</p>
          </div>
          <button class="btn-primary checkout-btn" @click="checkOut()">
            Checkout
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import HeaderPage from "./partials/HeaderPage.vue";
import axios from "axios";
export default {
  data() {
    return {
    };
  },
  components: {
    HeaderPage,
  },
  mounted() {
    this.fetchCart();
  },
  methods: {
    async fetchCart() {
      await this.$store.dispatch("fetchCart", localStorage.getItem("user_id"));
    },
    async checkOut() {
      try {
        const response = await axios.delete(
          this.$store.state.apiUrl +
            "/checkOut/" +
            localStorage.getItem("user_id"),
          {
          }
        );

        if (response.status === 200) {
          alert('Successfully Checkout.');
          this.fetchCart();
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  },
  computed: {
    cartItem() {
      return this.$store.getters.getCart;
    },
  },
};
</script>

<style scoped>
#cart .wrapper {
  max-width: 1440px;
}

#cart .cart-con {
  padding: 100px 0;
}

#cart .cart-list-con {
  margin-top: 50px;
}

#cart .cart-widget {
  padding: 20px;
  border-radius: 20px;
  background: var(--global-color-white);
  box-shadow: var(--global-shadow);
  max-width: 300px;
  text-align: center;
  width: 100%;
}

#cart .product-img-con {
  width: 200px;
  height: 150px;
}

#cart .product-img-con img {
  width: 100%;
  height: 150px;
}

#cart .checkout-btn {
  margin-top: 50px;
}
</style>