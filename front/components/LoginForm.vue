<template>
  <v-container v-if="!me">
    <v-card class="mt-2 pa-4">
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-text-field
          v-model="userId"
          :rules="userIdRules"
          label="아이디"
          required
        />
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="비밀번호"
          type="password"
          required
        />
        <v-btn type="submit" color="cyan" :disabled="!valid">로그인</v-btn>
        <v-btn nuxt to="/signup">회원가입</v-btn>
      </v-form>
    </v-card>
  </v-container>
  <v-container v-else>
    <v-card class="mt-3 ml-2 pa-8">
      {{ me.nickname }}님이 로그인 되었습니다.
      <v-btn @click="onLogOut">로그아웃</v-btn>
      <v-row>
        <v-col cols="4"
          >{{ me.Followings.length }}
          <div>following</div></v-col
        >
        <v-col cols="4"
          >{{ me.Followers.length }}
          <div>follower</div></v-col
        >
        <v-col cols="4"
          >{{ Posts.length }}
          <div>postings</div></v-col
        >
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      userId: "",
      password: "",
      userIdRules: [
        (v) => !!v || "아이디는 필수입니다",
        (v) => /.+@.+/.test(v) || "이메일이 유효하지 않습니다",
      ],
      passwordRules: [(v) => !!v || "비밀번호는 필수입니다"],
    };
  },

  computed: {
    me() {
      return this.$store.state.users.me;
    },
    Posts() {
      return this.$store.state.posts.mainPosts;
    },
  },

  methods: {
    onSubmitForm() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("users/logIn", {
          userId: this.userId,
          nickname: "제목없음",
          password: this.password,
        });
      } else {
        alert("폼이 유효하지 않습니다");
      }
    },
    onLogOut() {
      this.$store.dispatch("users/logOut");
    },
  },
};
</script>

<style></style>
