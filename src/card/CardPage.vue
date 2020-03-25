<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="mx-auto blue lighten-5" :loading="loading">
          <v-card-text>
            <v-layout row justify-center>
              <h2 class="display-1 font-weight-bold">Total:  ${{cardPrice}}</h2>
            </v-layout>
          </v-card-text>
          <v-container>
            <v-item-group multiple>
              <v-row>
                <v-col
                  v-for="(item) in cardItems"
                  md="4"
                  :key="item[0]"
                  cols="12">
                  <v-item>
                    <v-img
                      :src="item[1].url"
                      class="text-right pa-2">
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-5">
                          </v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </v-item>
                </v-col>
              </v-row>
            </v-item-group>
            </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    cardItems() {
      return this.getCardItems();
    },
    cardPrice() {
      return this.getCardPrice();
    },
    loading() {
      return this.$store.state.loading;
    },
  },
  methods: {
    ...mapGetters('users', ['getCardItems', 'getCardPrice']),
  },
};
</script>
