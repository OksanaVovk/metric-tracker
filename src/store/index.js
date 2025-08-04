import { createStore } from "vuex";

const InitialState = {
  experiments: [],
};

const store = createStore({
  state: { ...InitialState },
  mutations: {
    setExperiments(state, data) {
      state.experiments = data;
    },
  },
});

export default store;
