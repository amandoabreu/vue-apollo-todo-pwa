import * as types from '../mutation-types'

const state = {
  todos: []
}

const mutations = {
  [types.SET_TODOS] (state, payload) {
    state.todos = payload.todos.map(todo => Object.assign({}, todo))
  },

  [types.ADD_TODO] (state, payload) {
    state.todos.push({ name: payload.todoName, done: false })
  },

  [types.TOGGLE_DONE] (state, payload) {
    var selectedTodo = state.todos.find(todo => todo.name === payload.todoName)
    selectedTodo.done = !selectedTodo.done
  }
}

const actions = {
  setTodos ({ commit, state }, todos) {
    commit(types.SET_TODOS, {
      todos
    })
  },
  addTodo ({ commit, state, rootState }, name) {
    console.log(rootState)
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
