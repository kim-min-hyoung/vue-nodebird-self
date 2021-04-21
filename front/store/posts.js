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
    const index = state.mainPosts.findIndex((v) => v.id === payload.id);
    state.mainPosts.splice(index, 1);
  },

  addCommnet(state, payload) {
    const index = state.mainPosts.findIndex((v) => v.id === payload.postId);
    state.mainPosts[index].Comments.unshift(payload);
  },

  loadPosts(state, payload) {
    state.mainPosts = state.mainPosts.concat(payload);
    state.hasMorePost = payload.length === limit;
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
        "http://localhost:3085/post",
        {
          content: payload.content,
          image: state.imagePaths,
        },
        { withCredentials: true }
      )
      .then((res) => {
        commit("addMainPost", res.data);
      })
      .catch(() => {});
  },
  remove({ commit }, payload) {
    commit("removePost", payload);
  },
  addCommnet({ commit }, payload) {
    commit("addCommnet", payload);
  },
  loadPosts({ commit, state }, payload) {
    if (state.hasMorePost) {
      this.$axios
        .get(
          `http://localhost:3085/posts?offset=${state.mainPosts.length}&limit=10`
        )
        .then(() => {
          commit("loadPosts");
        })
        .catch(() => {});
    }
  },
  uploadImages({ commit }, payload) {
    this.$axios
      .post("http://localhost:3085/post/images", payload, {
        withCredentials: true,
      })
      .then((res) => {
        commit("concatImagePaths", res.data);
      })
      .catch(() => {});
  },
};
