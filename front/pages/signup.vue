<template>
  <v-container>
    <v-card class="pa-6 ma-3">
      <h3>회원가입</h3>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-text-field
          v-model="userId"
          label="이메일"
          :rules="userIdRules"
          required
        />
        <v-text-field
          v-model="password"
          label="비밀번호"
          type="password"
          :rules="passwordRules"
          required
        />
        <v-text-field
          v-model="passwordCheck"
          label="비밀번호 확인"
          type="password"
          :rules="passwordCheckRules"
          required
        />
        <v-text-field
          v-model="nickname"
          label="닉네임"
          type="nickname"
          :rules="nicknameRules"
          required
        />
        <v-checkbox
          :rules="[(v) => !!v || '약관에 동의해야 합니다.']"
          v-model="terms"
          required
          label="동의하십니까"
        />
        <v-btn type="submit" color="cyan" class="white--text">가입</v-btn>
      </v-form>
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
      nickname: "",
      terms: false,
      userIdRules: [
        (v) => !!v || "아이디는 필수입니다",
        (v) => /.+@.+/.test(v) || "아이디가 유효하지 않습니다",
      ],
      passwordRules: [(v) => !!v || "비밀번호는 필수입니다"],
      passwordCheckRules: [
        (v) => !!v || "비밀번호 확인은 필수입니다",
        (v) => v === this.password || "비밀번호가 일치하지 않습니다",
      ],
      nicknameRules: [(v) => !!v || "닉네임은 필수입니다"],
    };
  },

  computed: {
    me() {
      this.$store.state.users.me;
    },
  },

  methods: {
    onSubmitForm() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("users/signUp", {
            nickname: this.nickname,
            userId: this.userId,
            password: this.password,
          })
          .then(() => {
            this.$router.push({
              path: "/",
            });
          })
          .catch(() => {
            alert("회원가입 실패");
          });
      }
    },
  },
  head: {
    title: "회원가입",
  },

  middleware: "anonymous",
};
</script>

<style></style>
