export const state = () => ({
  token: null
})

export const mutations = {
  setUser(state, token) {
    state.token = token
    if(token) {
      this.$axios.defaults.headers.common['Authorization'] = `bearer ${token}`
    } else {
      delete this.$axios.defaults.headers.common['Authorization']
    }
  },
}

export const getters = {
  getToken(state){
    return state.token;
  },
}