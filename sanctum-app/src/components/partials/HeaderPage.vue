<template>
  <section id="header">
    <div class="wrapper">
      <div class="header-con">
        <ul class="navbar">
          <router-link v-if="!isAuthenticate" to="/register"
            >Register</router-link
          >
          <router-link v-if="!isAuthenticate" to="/">Login</router-link>
          <router-link v-if="isAuthenticate" to="/dashboard"
            >Dashboard</router-link
          >
          <router-link v-if="account_type == 1" to="/myStore"
            >My Store</router-link
          >
          <router-link v-if="account_type == 1" to="/userAccounts"
            >Accounts</router-link
          >
          <router-link v-if="account_type == 2" to="/myCart">Cart</router-link>
          <router-link v-if="account_type == 2" to="/myOrder"
            >Orders</router-link
          >
          <router-link v-if="isAuthenticate" to="/logout">Logout</router-link>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      account_type: 0,
      isAuthenticate: false,
    };
  },
  mounted() {
    this.account_type = localStorage.getItem("account_type");
    this.isAuthenticate = !!localStorage.getItem("token");
  },
};
</script>
