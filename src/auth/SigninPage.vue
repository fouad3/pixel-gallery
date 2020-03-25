<template>
  <v-container class="pt-12">
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="blue lighten-5">
          <v-card-text>
            <v-container>
              <v-form @submit.prevent="onSignin">
                <v-layout class="row pl-5 pr-5">
                  <v-flex x12>
                    <v-text-field
                      v-model="email"
                      label="E-mail"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout class="row pa-5">
                  <v-flex x12>
                    <v-text-field
                      v-model="password"
                      label="Password"
                      type="password"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout class="row pa-5">
                  <v-flex sm6 offset-sm5>
                    <v-btn
                      class="mr-4"
                      type="submit"
                      :disabled= "isEmpty"
                      :loading="loading"
                    >Sign in</v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data: () => ({
    password: '',
    email: '',
  }),

  computed: {
    user() {
      return this.$store.state.users.user;
    },
    isEmpty() {
      return this.email === '' || this.password === '';
    },
    error() {
      return this.$store.state.error;
    },
    loading() {
      return this.$store.state.loading;
    },
  },

  methods: {
    ...mapActions('users', ['signUserIn']),
    ...mapActions(['clearError']),

    onSignin() {
      this.signUserIn({ email: this.email, password: this.password });
    },
    onDismissed() {
      this.clearError();
    },
  },
};
</script>
