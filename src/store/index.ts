import { createStore } from 'vuex'

interface User {
  seq: number,
  nickname: string,
  email: string,
  profile: string | null,
  adAgree: boolean
}

interface Network {
  isLoading: boolean,
}

interface State {
  user: User | null | undefined
  network: Network
}

export default createStore<State>({
  state: {
    user: null,
    network: {
      isLoading: false,
    },
  },
  getters: {
    getUser: state => state.user,
    getNetworkStatus: state => state.network.isLoading,
  },
  mutations: {
    setUser: (state, payload: User) => { state.user = payload },
    setNetworkStatus: (state, payload: boolean) => { state.network.isLoading = payload },
  },
  actions: {
  },
  modules: {
  },
})
