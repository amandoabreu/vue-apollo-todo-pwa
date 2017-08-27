import Vue from 'vue'
import Router from 'vue-router'
import TodoList from '@/components/TodoList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'TodoList',
      component: TodoList
    }
  ]
})
