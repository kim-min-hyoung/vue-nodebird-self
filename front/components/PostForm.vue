<template>
  <v-card class="ma-5 pa-4">
    <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
      <v-textarea
        v-model="content"
        outline
        auto-grow
        clearable
        label="어떤 신기한 일이 있었나요"
        :hide-details="hideDetails"
        :success="success"
        :success-message="successMessage"
        :rules="[(v) => !!v.trim() || '내용을 입력하세요']"
        @input="onChangeTextarea"
      />

      <v-btn type="submit" color="cyan" class="white--text" absolute right>
        짹짹
      </v-btn>
      <input
        ref="imageInput"
        type="file"
        multiple
        hidden
        @change="onChangeImages"
      />
      <v-btn type="button" @click="onClickUploadImages"> 이미지 업로드 </v-btn>
      <div>
        <div
          v-for="(p, i) in imagePaths"
          :key="p"
          style="display: inline-block"
        >
          <img
            :src="`http://localhost:3085/${p}`"
            :alt="p"
            style="width: 200px"
          />
          <div>
            <button @click="onRemoveImage(i)" type="button">제거</button>
          </div>
        </div>
      </div>
    </v-form>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      valid: false,
      hideDetails: false,
      success: false,
      successMessage: "",
      content: "",
    };
  },

  computed: {
    ...mapState("users", ["me"]),
    ...mapState("posts", ["imagePaths"]),
  },

  methods: {
    onChangeTextarea(value) {
      if (value.length) {
        this.hideDetails = true;
        this.success = true;
        this.successMessage = "";
      }
    },

    onSubmitForm() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("posts/add", {
            content: this.content,
          })
          .then(() => {
            this.content = "";
            this.hideDetails = true;
            this.success = true;
            this.successMessage = "게시물 등록 성공";
          })
          .catch(() => {});
      }
    },

    onClickUploadImages() {
      this.$refs.imageInput.click();
    },

    onChangeImages(e) {
      console.log(e.target.files);
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, (f) => {
        imageFormData.append("image", f);
        //{image: [file1, file2]}
      });
      this.$store.dispatch("posts/uploadImages", imageFormData);
    },

    onRemoveImage(index) {
      this.$store.commit("posts/removeImagePaths", index);
    },
  },
};
</script>

<style></style>
