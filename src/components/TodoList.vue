<template>
  <div class="hello">
    <ul>
      <li v-for="todo in todos" v-bind:class="{ todoDone: todo.done }" @click="toggleDone(todo.name)">
        <span>{{ todo.name }}</span>
      </li>
    </ul>
    <input v-model="newTodoName" placeholder="I need to..."/><button type="button" @click="handleClick(newTodoName)">Add Todo</button>
  </div>
</template>

<script>
// import store from '../store/index'
import { mapGetters, mapActions } from 'vuex'
// import * as types from '../store/mutation-types'

export default {
  computed: {
    ...mapGetters({
      todos: 'todos'
    })
  },
  methods: {
    ...mapActions([
      'addTodo',
      'toggleDone'
    ]),
    handleClick (todoName) {
      this.addTodo(todoName)  // Add todo to state
      this.newTodoName = '' // Set temporary todo name to nothing
    }
  },
  data: function () {
    return {
      newTodoName: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.todoDone{
  text-decoration: line-through;
}
</style>
