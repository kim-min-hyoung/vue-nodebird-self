<template>
  <v-form
    class="mx-5"
    ref="form"
    v-model="valid"
    style="position: relative"
    @submit.prevent="onSubmitForm"
  >
    <v-textarea
      v-model="content"
      filled
      auto-grow
      label="댓글 달기"
      :hide-detaile="hideDetails"
      :success="success"
      :success-message="successMessage"
      @input="onChangeTextarea"
    />
    <v-btn type="submit" absolute top right dark color="cyan">삐약</v-btn>
  </v-form>
</template>

<script>
export default {
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      valid: false,
      content: "",
      success: false,
      successMessage: "",
      hideDetails: true,
    };
  },

  computed: {
    me() {
      return this.$store.state.users.me;
    },
  },

  methods: {
    onChangeTextarea(value) {
      if (value.length) {
        this.hideDetails = true;
        this.success = false;
        this.successMessage = "";
      }
    },
    onSubmitForm() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("posts/addComment", {
            postId: this.postId,
            content: this.content,
          })
          .then(() => {
            this.content = "";
            this.success = true;
            this.successMessage = "댓글이 작성됨";
            this.hideDetails = false;
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
  },
};
</script>

<style></style>
