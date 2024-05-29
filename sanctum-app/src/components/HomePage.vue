<template>
  <HeaderPage />
  <section id="dashboard">
    <div class="wrapper">
      <div class="dashboard-con">
        <h2>Products</h2>
        <div class="product-con">
          <div class="filter-con">
            <h4>Filter</h4>
            <div class="filter-row">
              <input
                type="checkbox"
                id="low_price"
                @change="toggleLowPriceFilter"
                ref="lowPriceCheckbox"
              />
              <label for="low_price">LOW PRICE</label>
            </div>
            <div class="filter-row">
              <input
                type="checkbox"
                id="high_price"
                @change="toggleHighPriceFilter"
                ref="highPriceCheckbox"
              />
              <label for="high_price">HIGH PRICE</label>
            </div>
          </div>
          <transition-group name="fade" tag="div" class="product-list-con">
            <div
              class="product-widget"
              v-for="product in products"
              :key="product.product_id"
            >
              <div class="product-img-con">
                <img src="../assets/default_product.jpg" alt="Image" />
              </div>
              <div class="product-details">
                <h4>{{ product.product_name }}</h4>
                <p>{{ product.product_description }}</p>
                <p>₱ {{ product.price }}</p>
              </div>
              <div class="product-button-con">
                <button class="btn-primary" @click="viewProduct(product)">
                  View
                </button>
                <button class="btn-primary">Edit</button>
                <button class="btn-primary">Delete</button>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </section>
  <ViewProduct
    :visible="showProductModal"
    @update:visible="toggleViewProduct"
    :product="selectedProduct"
  />
</template>

<script>
import HeaderPage from "./partials/HeaderPage.vue";
import ViewProduct from "./modals/ViewProduct.vue";

export default {
  data() {
    return {
      account_type: 0,
      showOrderModal: false,
      showProductModal: false,
      selectedProduct: null,
    };
  },
  mounted() {
    this.account_type = localStorage.getItem("account_type");
    this.fetchProducts();
  },
  components: {
    HeaderPage,
    ViewProduct,
  },
  methods: {
    async fetchProducts() {
      await this.$store.dispatch("fetchProducts");
    },
    async toggleLowPriceFilter(event) {
      let isChecked = event.target.checked;
      if (isChecked) {
        this.$refs.highPriceCheckbox.checked = false;
      }
      await this.$store.dispatch("filterProducts", isChecked ? "low" : "");
    },
    async toggleHighPriceFilter(event) {
      let isChecked = event.target.checked;
      if (isChecked) {
        this.$refs.lowPriceCheckbox.checked = false;
      }
      await this.$store.dispatch("filterProducts", isChecked ? "high" : "");
    },
    viewProduct(product) {
      this.selectedProduct = product;
      this.showProductModal = true;
    },
    toggleViewProduct() {
      this.showProductModal = !this.showProductModal;
    },
  },
  computed: {
    products() {
      return this.$store.getters.getProducts;
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

#dashboard .wrapper {
  max-width: 1440px;
}

#dashboard .dashboard-con {
  padding: 100px 0;
}

#dashboard .product-list-con {
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
}

#dashboard .product-con {
  display: flex;
  margin-top: 50px;
}

#dashboard .filter-con {
  position: relative;
  margin-right: 50px;
  padding-right: 30px;
  max-width: 275px;
  height: 100%;
  width: 100%;
}

#dashboard .filter-con:before {
  content: "";
  position: absolute;
  width: 3px;
  right: 0;
  z-index: -1;
  height: 100%;
  background: var(--global-color-primary);
}

#dashboard .dashboard-con .product-widget {
  padding: 20px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  display: flex;
  text-align: center;
  gap: 10px;
  align-items: center;
  flex-direction: column;
  box-shadow: var(--global-shadow);
  background: #e0e7ff;
}

#dashboard .product-details h4 {
  font-size: 16px;
  font-weight: 700;
}

#dashboard .product-details p {
  font-size: 12px;
}

#dashboard .product-details p:nth-child(2) {
  color: var(--global-color-gray);
}

#dashboard .dashboard-con .product-widget::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  transition: 0.2s;
  opacity: 0;
  top: 0;
  left: 0;
  background: linear-gradient(
    360deg,
    rgb(131, 117, 255) 0.01%,
    rgba(126, 108, 192, 0.1) 100%
  );
}

#dashboard .dashboard-con .product-widget:hover::before {
  opacity: 1;
}

#dashboard .dashboard-con .product-widget:hover .product-button-con {
  opacity: 1;
}

#dashboard .product-img-con {
  width: 200px;
  height: 150px;
}

#dashboard .filter-con h4 {
  margin-bottom: 30px;
  font-weight: 700;
}

#dashboard .filter-row input {
  width: 15px;
  height: 15px;
}

#dashboard .filter-row label {
  margin-left: 20px;
  font-family: "Poppins", sans-serif;
}

#dashboard .filter-row {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
}

#dashboard .product-button-con {
  transition: 0.2s;
  position: absolute;
  opacity: 0;
  height: 100%;
  width: 100%;
  flex-direction: column;
  gap: 20px;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

#dashboard .product-button-con button {
  max-width: 150px;
  width: 100%;
}

#dashboard .product-img-con img {
  width: 100%;
  object-fit: cover;
  height: 100%;
}
</style>