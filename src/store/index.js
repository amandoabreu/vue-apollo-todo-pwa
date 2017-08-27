import Vue from 'vue'
import Vuex from 'vuex'
import TodoList from './modules/TodoList'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  modules: {
    TodoList
  },
  plugins: [vuexLocal.plugin]
})
