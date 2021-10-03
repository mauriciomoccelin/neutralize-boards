<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <span class="headline">Boards</span>
      </div>
      <v-spacer />
    </v-app-bar>

    <v-main>
      <boards />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Boards from "./components/Boards.vue";

export default Vue.extend({
  name: "App",
  components: {
    Boards,
  },
});
</script>
