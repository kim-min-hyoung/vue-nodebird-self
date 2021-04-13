<template>
  <div>
    <v-card class="mt-6 mr-5">
      <v-img />
      <v-card-text>
        <div>
          <h3>김민형</h3>
          <span>안녕하세요</span>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="orange">
          <v-icon>mdi-twitter-retweet</v-icon>
        </v-btn>
        <v-btn text color="orange">
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn>
        <v-btn text color="orange">
          <v-icon>mdi-comment-outline</v-icon>
        </v-btn>
        <v-btn text color="orange">
          <v-icon>mdi-dots-horizontal</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {};
  },

  methods: {},
};
</script>

<style></style>
