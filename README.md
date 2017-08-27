# NOT FISNIHED, IGNORE
# vue-apollo-todo-pwa

> A todo list with persistent data in graph.cool

## Build Setup

Install vue-cli

`vue init pwa vue-apollo-todo-pwa`
Install vue.router? Yes, everything else is optional

`npm install`
`npm install vue-apollo vuex vuex-persist --save`

`npm run dev`

`localhost:8080` should be serving your app.

Requirements for the todo list:

 - Each item has two fields, “name” and “done”.
 - Name is a string, done is boolean
 - There should be a form to add an item with just the name, “done” should default to “false”, this should go into the database.
 - Clicking on a previously added item should toggle done (false|true)

Signup to graphcool, create a new app.
Create a new object:

```
type Item implements Node {
  createdAt: DateTime!
  id: ID! @isUnique
  updatedAt: DateTime!
  name: String!
  done: Boolean @defaultValue(value: false)
}
```

Now, let’s change the Hello.vue to TodoList.vue, which means you will also have to change router/index.js to import TodoList from @/components/TodoList instead of Hello. Change the routes to:

```
routes: [
  {
    path: '/',
    name: 'TodoList',
    component: TodoList
  }
]
```

Let’s add dummy data to our store(to quickly check how things work), register it, and pass it onto the global context.

In modules/TodoList.js

```
const state = {
  todos: [
    { name: 'Clean bedroom', done: false },
    { name: 'Feed hamster', done: false },
    { name: 'Wake up', done: true }
  ]
}
```

Main.js:

```
import store from './store/index'

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
```

Now, we should be able to prepare our frontend

I made a TodoItem in components/

```
<template>
  <span>{{ name }}</span>
</template>

<script>
export default {
  props: ['name']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
```

And in TodoList:

```
<template>
  <div>
    <ul>
      <li v-for="todo in todos" v-bind:class="{ todoDone: todo.done }" @click="toggleDone(todo.name)">
        <TodoItem :name="todo.name"></TodoItem>
      </li>
    </ul>
    <input v-model="newTodoName" placeholder="I need to..."/><button type="button" @click="handleClick(newTodoName)">Add Todo</button>
  </div>
</template>

<script>
// import store from '../store/index'
import { mapGetters, mapActions } from 'vuex'
import TodoItem from './TodoItem'
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
  },
  components: {
    TodoItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.todoDone{
  text-decoration: line-through;
}
</style>
```

`v-bind:class="{ todoDone: todo.done }"` adds the todoDone class depending on the truthiness of todo.done

```
.todoDone{
  text-decoration: line-through;
}
```

All this does is map the getter in this.$store.getters.todos to this.todos, you can even change its name by doing it like so:

```
...mapGetters({
      renamedTodos: 'todos'
})
```

This maps `this.$store.getters.todos` to `this.renamedTodos`, we could simply not use it at all but it’s quite cumberstone to write the whole thing all the time.

The `mapActions` does the exact same thing but for actions

I didn’t add the `newTodoName` to the store, as it’s a temporary value that doesn’t really matter anymore as soon as it’s added

```
handleClick (todoName) {
  this.addTodo(todoName)  // Add todo to state
  this.newTodoName = '' // Set temporary todo name to nothing
}
```

Handle click add the todo to the state, and sets the `newTodoName` to `‘’` (so the value doesn’t stay there after clicking)

The state is changed with a mutation via an action, this.addTodo is an action:
```
const actions = {
  addTodo ({ commit, state }, name) {
    commit(types.ADD_TODO, {
      todoName: name
    })
  }
}
```

Which in turns makes a mutation to the state:
```
const mutations = {
  [types.ADD_TODO] (state, payload) {
    state.todos.push({ name: payload.todoName, done: false })
  },
}
```

`payload.todoName` is passed in `commit(types.ADD_TODO, { todoName: name })`, `name` comes from the parameter in `this.addTodo(todoName)`
