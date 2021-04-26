<template>
  <div>
    <div>
      <h3>
        <nuxt-link :to="'/user/' + post.User.id">
          {{ post.User.nickname }}</nuxt-link
        >
        <v-btn v-if="canFollow" @click="onFollow">팔로우</v-btn>
        <v-btn v-if="canUnFollow" @click="onUnFollow">언팔로우</v-btn>
      </h3>
    </div>
    <v-card-text>
      <template v-for="(node, i) in nodes">
        <nuxt-link
          v-if="node.startsWith('#')"
          :key="i"
          :to="`/hashtag/${node.slice(1)}`"
          >{{ node }}</nuxt-link
        >
        <template v-else>{{ node }}</template>
      </template>
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
  computed: {
    nodes() {
      return this.post.content.split(/(#[^\s#]+)/);
    },

    me() {
      return this.$store.state.users.me;
    },
    canFollow() {
      return (
        this.me && //로그인을 해야 하고
        this.post.User.id !== this.me.id && //내 아이디가 아니어야 하며
        !this.me.Followings.find((v) => v.id === this.post.User.id) // 기존에 나를 팔로워하고 있지 않아야 버튼이 뜸
      );
    },
    canUnFollow() {
      return (
        this.me && //로그인을 해야 하고
        this.post.User.id !== this.me.id && //내 아이디가 아니어야 하며
        this.me.Followings.find((v) => v.id === this.post.User.id) // 기존에 나를 팔로워하고 있어야 버튼이 뜸
      );
    },
  },

  methods: {
    onFollow() {
      this.$store.dispatch("users/follow", {
        userId: this.post.UserId,
      });
    },
    onUnFollow() {
      this.$store.dispatch("users/unfollow", {
        userId: this.post.UserId,
      });
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
