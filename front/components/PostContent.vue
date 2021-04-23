<template>
  <div>
    <v-card-text>
      <div>
        <h3>
          <nuxt-link :to="'/user/' + post.id">
            {{ post.User.nickname }}</nuxt-link
          >
        </h3>
        <span>{{ post.content }}</span>
      </div>
      <post-images :images="post.Images" />
    </v-card-text>
  </div>
</template>

<script>
import PostImages from "./PostImages.vue";

export default {
  components: { PostImages },

  props: {
    post: {
      type: Object,
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>
