<template>
  <div>
    <post-form v-if="me" />

    <div>
      <post-card v-for="p in mainPosts" :key="p.id" :post="p"> </post-card>
    </div>
  </div>
</template>

<script>
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

export default {
  components: { PostForm, PostCard },

  data() {
    return {
      name: "Nuxt.js",
    };
  },

  computed: {
    me() {
      return this.$store.state.users.me;
    },
    mainPosts() {
      return this.$store.state.posts.mainPosts;
    },
    hasMorePost() {
      return this.$store.state.posts.hasMorePost;
    },
  },

  fetch({ store }) {
    return store.dispatch("posts/loadPosts", { reset: true });
  },

  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },

  methods: {
    onScroll() {
      console.log(this.hasMorePost);
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (this.hasMorePost) {
          this.$store.dispatch("posts/loadPosts");
        }
      }
    },
  },
};
</script>

<style></style>
