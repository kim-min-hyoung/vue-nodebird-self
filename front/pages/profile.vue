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
      <follower-list :users="followingList" :remove="removeFollowing" />
    </v-card>
    <v-card class="pa-6 ma-3">
      <v-subheader>팔로워</v-subheader>
      <follower-list :users="followerList" :remove="removeFollower" />
    </v-card>
  </v-container>
</template>

<script>
import FollowerList from "../components/FollowerList";

export default {
  components: { FollowerList },

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
  },

  methods: {
    onChangeNickname() {
      this.$store.dispatch("users/changeNickname", {
        nickname: this.nickname,
        valid: true,
      });
    },
    removeFollowing(id) {
      this.$store.dispatch("users/removeFollowing", { id });
    },
    removeFollower(id) {
      this.$store.dispatch("users/removeFollower", { id });
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
