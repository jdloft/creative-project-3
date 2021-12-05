import Vue from 'vue'
import Vuex from 'vuex'
import vSelect from 'vue-select'

import App from './App.vue'
import router from './router'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('v-select', vSelect)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    todos: [
      {
        text: "make an app",
        completed: false,
        priority: 1,
      },
      {
        text: "declare victory",
        completed: false,
        priority: 2,
      },
      {
        text: "profit",
        completed: false,
        priority: 3,
      },
    ],
    message: "",
    priority: 2,
    show: "all",
    drag: {},
  },
  mutations: {
    addItem(state, date) {
      state.todos.push({ text: state.message, completed: false, priority: state.priority, date: date });
      state.message = "";
      state.priority = 2;
    },
    setShow(state, show) {
      state.show = show;
    },
    setMessage(state, message) {
      state.message = message;
    },
    setPriority(state, priority) {
      state.priority = priority;
    },
    dragItem(state, item) {
      state.drag = item;
    },
    dropItem(state, item) {
      const indexItem = state.todos.indexOf(state.drag);
      const indexTarget = state.todos.indexOf(item);
      state.todos.splice(indexItem, 1);
      state.todos.splice(indexTarget, 0, state.drag);
    },
  }
})

new Vue({
  router,
  render: h => h(App),
  store: store,
}).$mount('#app')
