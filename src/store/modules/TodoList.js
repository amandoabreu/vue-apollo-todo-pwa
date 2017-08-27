import * as types from '../mutation-types'

const state = {
  todos: [
    { id: 0, name: 'Clean bedroom', done: false },
    { id: 1, name: 'Feed hamster', done: false },
    { id: 2, name: 'Wake up', done: true }
  ]
}

const mutations = {
  [types.ADD_TODO] (state, payload) {
    state.todos.push({ name: payload.todoName, done: false })
  },
  [types.TOGGLE_DONE] (state, payload) {
    var selectedTodo = state.todos.find(todo => todo.name === payload.todoName)
    selectedTodo.done = !selectedTodo.done
  }
}

const actions = {
  addTodo ({ commit, state }, name) {
    commit(types.ADD_TODO, {
      todoName: name
    })
  },
  toggleDone ({ commit }, name) {
    commit(types.TOGGLE_DONE, {
      todoName: name
    })
  }
}

const getters = {
  todos: state => state.todos
}

export default {
  state,
  getters,
  actions,
  mutations
}
