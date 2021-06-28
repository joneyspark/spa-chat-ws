<template>
  <div class="home col-8 mx-auto py-5 mt-5">
    <h1>Dashboard</h1>
    <div class="card">
      <div class="card-body" v-if="user">
        <h3>Hello, {{ user.name }}</h3>
        <span>{{ user.email }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../apis/User";

export default {
  data() {
    return {
      user: null,
    };
  },

  async mounted() {
    await User.auth().then((response) => {
      this.user = response.data;
    });
    console.log(this.user.id);
  },
};
</script>
