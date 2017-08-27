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

Now, let’s change the Hello.vue to TodoList.vue, change the export’s name to todolist , which means you will also have to change router/index.js to import TodoList from @/components/TodoList instead of Hello. Change the routes to:

routes: [
    {
      path: '/',
      name: 'TodoList',
      component: TodoList
    }
  ]

Let’s add dummy data to our store, register it, and pass it onto the global context.

In modules/TOdoList.js

const state = {
  todos: [
    { name: 'Clean bedroom', done: false },
    { name: 'Feed hamster', done: false },
    { name: 'Wake up', done: true }
  ]
}

Main.js:

import store from './store/index'

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
