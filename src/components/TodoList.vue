<template>
  <div class="todoList">
    <form>
      <input class="input" v-model="newTodoName" placeholder="I need to..."/>
      <button class="btn btn--submit" type="submit" @click="handleClick(newTodoName)">Add Todo</button>
    </form>
    <ul class="todoList__list">
      <li v-for="todo in todos" class="todo" v-bind:class="{ 'todo--done': todo.done }" @click="toggleDone(todo.name)">
        <TodoItem :name="todo.name"></TodoItem>
      </li>
    </ul>
    <!--<ul>
      <li v-for="todo in allTodos">
        <TodoItem :name="todo.name"></TodoItem>
      </li>
    </ul>-->
  </div>
</template>

<script>
// import store from '../store/index'
import gql from 'graphql-tag'
import { mapGetters, mapActions } from 'vuex'
import TodoItem from './TodoItem'
// import * as types from '../store/mutation-types'

const getTodosQuery = gql`
  query allTodos {
    allTodoes(orderBy: createdAt_DESC) {
      name
      done
      createdAt
    }
  }
`

/* const createTodo = gql`
  mutation CreateTodo($name: String!) {
    createTodo(name: $name) {
      name
    }
  }
` */

export default {
  computed: {
    ...mapGetters({
      todos: 'todos'
    })
  },
  methods: {
    ...mapActions([
      'addTodo',
      'toggleDone',
      'setTodos'
    ]),
    handleClick (todoName) {
      this.addTodo(todoName)  // Add todo to state
      this.newTodoName = '' // Set temporary todo name to nothing
      return false // Don't refresh page
    }
  },
  data: function () {
    return {
      newTodoName: ''
    }
  },
  components: {
    TodoItem
  },
  apollo: {
    allTodos: {
      fetchPolicy: 'cache-first',
      query: getTodosQuery,
      update (data) {
        this.setTodos(data.allTodoes)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.todoList{
  max-width:300px;
  margin:0 auto;
  &__list{
    list-style-type:none;
    padding:0;
    margin:0;
  }
}
.todo {
  padding: 10px 15px;
  background: #2F97C1;
  margin:5px 0;
  color:white;
  font-weight:bold;
  box-shadow: 2px 2px 2px #222;
  &--done{
    text-decoration: line-through;
  }
}

.input{
  padding:5px 15px;
  width:100%;
  box-sizing:border-box;
  box-shadow: 2px 2px 2px #222;
}

.btn{
  margin-top:5px;
  box-shadow: 2px 2px 2px #222;
  &--submit{
    background: #11DC6B;
    outline:none;
    border:1px solid #fff;
    padding:5px 15px;
    color:white;
    font-weight:bold;
  }
  width:100%;
}
</style>
