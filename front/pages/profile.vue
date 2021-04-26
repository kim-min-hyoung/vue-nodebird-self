<template>
  <v-container>
    <v-card class="pa-6 ma-3">
      <v-header>프로필</v-header>
      <v-form ref="form" v-model="valid" @submit.prevent="onChangeNickname">
        <v-text-field
          label="닉네임"
          v-model="nickname"
          :rules="nicknameRules"
          required
        />
        <v-btn color="cyan" type="submit" class="white--text" :disabled="!valid"
          >수정</v-btn
        >
      </v-form>
    </v-card>
    <v-card class="pa-6 ma-3">
      <v-subheader>팔로잉</v-subheader>
      <follow-list :users="followingList" :remove="removeFollowing" />
      <v-btn
        @click="loadMoreFollowings"
        v-if="hasMoreFollowing"
        dark
        color="blue"
        style="width: 100%"
        >더보기</v-btn
      >
    </v-card>
    <v-card class="pa-6 ma-3">
      <v-subheader>팔로워</v-subheader>
      <follow-list :users="followerList" :remove="removeFollower" />
      <v-btn
        @click="loadMoreFollowers"
        v-if="hasMoreFollower"
        dark
        color="blue"
        style="width: 100%"
        >더보기</v-btn
      >
    </v-card>
  </v-container>
</template>

<script>
import FollowList from "../components/FollowList";

export default {
  components: { FollowList },

  data() {
    return {
      valid: false,
      nickname: "",
      nicknameRules: [(v) => !!v.trim() || "닉네임을 입력하세요"],
    };
  },

  computed: {
    followingList() {
      return this.$store.state.users.followingList;
    },

    followerList() {
      return this.$store.state.users.followerList;
    },
    hasMoreFollowing() {
      return this.$store.state.users.hasMoreFollowing;
    },
    hasMoreFollower() {
      return this.$store.state.users.hasMoreFollower;
    },
  },
  fetch({ store }) {
    return Promise.all([
      store.dispatch("users/loadFollowings", { offset: 0 }),
      store.dispatch("users/loadFollowers", { offset: 0 }),
    ]);
  },

  methods: {
    onChangeNickname() {
      this.$store.dispatch("users/changeNickname", {
        nickname: this.nickname,
        valid: true,
      });
    },
    removeFollowing(userId) {
      this.$store.dispatch("users/unfollow", { userId });
    },
    removeFollower(userId) {
      this.$store.dispatch("users/removeFollower", { userId });
    },
    loadMoreFollowings() {
      this.$store.dispatch("users/loadFollowings");
    },
    loadMoreFollowers() {
      this.$store.dispatch("users/loadFollowers");
    },
  },
  layout: "admin",

  head: {
    title: "프로필",
  },

  middleware: "authenticated",
};
</script>

<style></style>
