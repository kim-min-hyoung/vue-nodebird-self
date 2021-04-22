import Vue from "vue";
// import throttle from "lodash.throttle";

export const state = () => ({
  mainPosts: [],
  hasMorePost: true,
  imagePaths: [],
});

export const mutations = {
  addMainPost(state, payload) {
    state.mainPosts.unshift(payload);
    state.imagePaths = [];
  },

  removePost(state, payload) {
    const index = state.mainPosts.findIndex((v) => v.id === payload.postId);
    state.mainPosts.splice(index, 1);
  },

  loadComments(state, payload) {
    const index = state.mainPosts.findIndex((v) => v.id === payload.postId);
    console.log(payload);
    Vue.set(state.mainPosts[index], "Comments", payload);
  },

  addComment(state, payload) {
    const index = state.mainPosts.findIndex((v) => v.id === payload.PostId);
    console.log(index);
    state.mainPosts[index].Comments.unshift(payload);
  },

  loadPosts(state, payload) {
    state.mainPosts = state.mainPosts.concat(payload);
    state.hasMorePost = payload.length === 10;
  },

  concatImagePaths(state, payload) {
    state.imagePaths = state.imagePaths.concat(payload);
  },

  removeImagePaths(state, payload) {
    state.imagePaths.splice(payload, 1);
  },
};

export const actions = {
  add({ commit, state }, payload) {
    //서버에 게시글 등록 요청 보냄
    this.$axios
      .post(
        "/post",
        {
          content: payload.content,
          image: state.imagePaths,
        },
        { withCredentials: true }
      )
      .then((res) => {
        commit("addMainPost", res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },

  remove({ commit }, payload) {
    this.$axios
      .delete(`/post/${payload.postId}`, {
        withCredentials: true,
      })
      .then(() => {
        commit("removePost", payload);
      })
      .catch((err) => {
        console.error(err);
      });
  },

  loadComments({ commit }, payload) {
    this.$axios
      .get(`/post/${payload.postId}/comments`)
      .then((res) => {
        commit("loadComments", { postId: payload.postId, data: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
  },

  addComment({ commit }, payload) {
    this.$axios
      .post(
        `/post/${payload.postId}/comment`,
        { content: payload.content },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        commit("addComment", res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },

  loadPosts({ commit, state }, payload) {
    if (state.hasMorePost) {
      this.$axios
        .get(`/posts?offset=${state.mainPosts.length}&limit=10`)
        .then((res) => {
          console.log("res.data:", res.data);
          commit("loadPosts", res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  },

  uploadImages({ commit }, payload) {
    this.$axios
      .post("/post/images", payload, {
        withCredentials: true,
      })
      .then((res) => {
        commit("concatImagePaths", res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
