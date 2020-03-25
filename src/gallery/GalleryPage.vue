<template>
  <v-container>
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
                <v-layout row>
                  <v-col>
                    <span class="title">Choose From Our Galary</span >
                  </v-col>
                  <v-col>
                    <v-btn
                      absolute
                      right
                      color="primary"
                      :disabled= "selected.length === 0"
                      @click="extendCard()"
                    >Add to card</v-btn>
                  </v-col>
                </v-layout>
                <v-layout class="row pt-5">
                  <v-flex xs12>
                    <v-data-table
                      v-model="selected"
                      :headers="headers"
                      :items="photos"
                      item-key="id"
                      show-select
                      :loading="photos.length === 0"
                      loading-text="Loading... Please wait"
                      class="elevation-1 blue lighten-5">
                      <template v-slot:top>
                        <v-dialog v-model="dialog" max-width="600px">
                          <v-img
                          :src="link"
                          aspect-ratio="1"
                          class="grey lighten-2"
                          max-width="600"
                          max-height="400"
                          >
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
                        </v-dialog>
                      </template>
                      <template v-slot:item.price="{ item }">
                        ${{ item.price }}
                      </template>
                      <template v-slot:item.actions="{ item }">
                          <v-icon class="ml-2" @click="showPhoto(item)">mdi-eye</v-icon>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
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
    dialog: false,
    link: '',
    selected: [],
    headers: [
      {
        text: 'Name',
        align: 'start',
        sortable: true,
        value: 'name',
      },
      { text: 'Price', value: 'price' },
      { text: 'View', value: 'actions', sortable: false },
    ],
  }),

  computed: {
    card() {
      return this.$store.state.users.user.card;
    },
    photos() {
      return this.$store.state.photos;
    },
    error() {
      return this.$store.state.error;
    },
  },

  methods: {
    ...mapActions('users', ['addToCard']),
    ...mapActions(['clearError']),
    showPhoto(item) {
      this.link = item.url;
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.link = '';
      }, 300);
    },
    extendCard() {
      const cardItems = {};
      this.selected.forEach((item) => {
        cardItems[item.id] = {
          id: item.id,
          price: item.price,
          name: item.name,
          url: item.url,
        };
        return item;
      });
      this.selected = [];
      this.addToCard(cardItems);
    },
    onDismissed() {
      this.clearError();
    },
  },
};
</script>
