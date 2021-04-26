<template>
  <v-app>
    <nav>
      <v-app-bar>
        <v-toolbar-title>
          <nuxt-link to="/"> NodeBird</nuxt-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-form @submit.prevent="onSearchHashtag">
            <v-text-field
              class="mt-2"
              prepend-icon="mdi-magnify"
              v-model="hashtag"
              hide-details
            />
          </v-form>
          <v-btn text nuxt to="/profile"><div>프로필</div></v-btn>
          <v-btn text nuxt to="/signup"> <div>회원가입</div></v-btn>
        </v-toolbar-items>
      </v-app-bar>
      <v-row no>
        <v-col cols="12" md="4">
          <login-form />
        </v-col>
        <v-col cols="12" md="8">
          <nuxt />
        </v-col>
      </v-row>
    </nav>
  </v-app>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
export default {
  components: { LoginForm },

  data() {
    return {
      hashtag: "",
    };
  },

  methods: {
    onSearchHashtag() {
      this.$router.push({
        path: `/hashtag/${encodeURIComponent(this.hashtag)}`,
      });
      this.hashtag = "";
    },
  },
};
</script>

<style></style>
