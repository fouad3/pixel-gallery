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
              <v-form v-model="valid" @submit.prevent="onSignup">
                <v-layout  class="row pl-5 pr-5">
                  <v-flex x12>
                    <v-text-field
                      v-model="email"
                      :error-messages="emailErrors"
                      label="E-mail"
                      required
                      @blur="$v.email.$touch()"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout  class="row pa-5">
                  <v-flex x12>
                    <v-text-field
                      v-model="password"
                      :error-messages="passwordErrors"
                      label="Password"
                      type="password"
                      required
                      @blur="$v.password.$touch()"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout  class="row pa-5" >
                  <v-flex sm6 offset-sm5>
                    <v-btn
                      type="submit"
                      :loading="loading"
                    >Sign up</v-btn>
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
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {
  mixins: [validationMixin],

  validations: {
    password: {
      required,
      strongPassword(password) {
        return (
          /[a-z]/.test(password) // checks for a-z
          && /[0-9]/.test(password) // checks for 0-9
          && /\W|_/.test(password) // checks for special char
          && password.length >= 8
        );
      },
    },
    email: { required, email },
  },

  data: () => ({
    password: '',
    email: '',
    valid: true,
  }),

  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      if (!this.$v.password.required) errors.push('Password is required.');
      if (!this.$v.password.strongPassword) errors.push('Min. 8 characters with at least one letter, a number and a special character.');
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      if (!this.$v.email.email) errors.push('Must be valid e-mail');
      if (!this.$v.email.required) errors.push('E-mail is required');
      return errors;
    },
    user() {
      return this.$store.state.users.user;
    },
    error() {
      return this.$store.state.error;
    },
    loading() {
      return this.$store.state.loading;
    },
  },

  methods: {
    ...mapActions('users', ['signUserUp']),
    ...mapActions(['clearError']),

    onSignup() {
      if (this.email && this.password && this.valid) {
        this.signUserUp({ email: this.email, password: this.password });
      }
      this.$v.$touch();
    },
    onDismissed() {
      this.clearError();
    },
  },
};
</script>
