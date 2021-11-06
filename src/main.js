import Vue from 'vue'
import Vuex from 'vuex'

import App from './App.vue'
import router from './router'

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
    addItem(state) {
      state.todos.push({ text: state.message, completed: false });
      state.message = "";
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
