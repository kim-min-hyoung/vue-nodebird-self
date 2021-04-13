<template>
  <v-app>
    <nav>
      <v-app-bar>
        <v-toolbar-title>
          <nuxt-link to="/"> NodeBird</nuxt-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-text-field
            :style="{ marginTop: '8px' }"
            prepend-icon="mdi-magnify"
          />
          <v-btn text nuxt to="/profile"><div>프로필</div></v-btn>
          <v-btn text nuxt to="/signup"> <div>회원가입</div></v-btn>
        </v-toolbar-items>
      </v-app-bar>
      <v-row no>
        <v-col class="red" cols="12" md="4">
          <login-form />
        </v-col>
        <v-col class="yellow" cols="12" md="8">
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
};
</script>

<style></style>
