export const state = () => ({
  mainPosts: [],
});

export const mutations = {
  addMainPost(state, payload) {
    state.mainPosts.unshift(payload);
  },
  removePost(state, payload) {
    const index = state.mainPosts.findIndex((v) => v.id === payload.id);
    state.mainPosts.splice(index, 1);
  },
  addCommnet(state, payload) {
    const index = state.mainPosts.findIndex((v) => v.id === payload.postId);
    state.mainPosts[index].Comments.unshift(payload);
  },
};

export const actions = {
  add({ commit }, payload) {
    commit("addMainPost", payload);
  },
  remove({ commit }, payload) {
    commit("removePost", payload);
  },
  addCommnet({ commit }, payload) {
    commit("addCommnet", payload);
  },
};
