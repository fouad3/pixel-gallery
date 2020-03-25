<template>
  <v-app>
    <v-content class="light-blue accent-1">
      <v-card>
        <v-toolbar color="blue lighten-5">
          <v-toolbar-title>
            <router-link to="/" style="color: inherit; text-decoration: none">
              Pixel Gallery
            </router-link>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tab class="pt-2" v-if="userIsAuthenticated && !loading" >
            <router-link to="/card" style="color: inherit; text-decoration: none">
              <v-badge v-show="cardItemsNumber"
                color="blue"
                :content="cardItemsNumber"
              >
                <v-icon>mdi-cart</v-icon>
              </v-badge>
              <v-icon v-show="!cardItemsNumber">mdi-cart</v-icon>
            </router-link>
          </v-tab>
          <v-tab class="pt-2" v-if="userIsAuthenticated" @click="onLogout">
            logout
          </v-tab>
          <v-tab class="pt-2" v-if="!userIsAuthenticated">
            <router-link to="/signup" style="color: inherit; text-decoration: none">
              sign up
            </router-link>
          </v-tab>
          <v-tab class="pt-2 v-cloak--hidden" v-if="!userIsAuthenticated">
            <router-link to="/signin" style="color: inherit; text-decoration: none">
              sign in
            </router-link>
          </v-tab>
        </v-toolbar>
      </v-card>
      <main class="pt-6">
        <v-content>
          <router-view />
        </v-content>
      </main>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    cardItemsNumber() {
      return Object.keys(this.$store.state.users.user.card).length;
    },
    userIsAuthenticated() {
      if (this.$store.state.users.user !== null && this.$store.state.users.user !== undefined) {
        return true;
      }
      return false;
    },
    loading() {
      return this.$store.state.loading;
    },
  },
  methods: {
    ...mapActions('users', ['logout']),
    onLogout() {
      this.logout();
    },
  },
};
</script>
