// 用户信息

const user = {
  state: {
    userId: undefined
  },
  getters: {
    getUser: (state: object) => {
      return {
        ...state
      };
    }
  },
  mutations: {
    // 更新用户信息
    setUser: (state: object, userInfo: object) => {
      state = Object.assign(state, userInfo);
    }
  },
  actions: {
    // 登录
    login(
      { commit, state }: { commit: Function; state: object },
      formData: object
    ) {},
    // 登出
    loginOut({ commit, state }: { commit: Function; state: object }) {}
  }
};
export default user;
