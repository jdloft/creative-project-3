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
      },
      {
        text: "declare victory",
        completed: false,
      },
      {
        text: "profit",
        completed: false,
      },
    ],
    message: "",
    show: "all",
    drag: {},
  },
  mutations: {
    addItem(state) {
      state.todos.push({ text: state.message, completed: false });
      state.message = "";
    },
    deleteItem(state, item) {
      var index = state.todos.indexOf(item);
      if (index > -1) state.todos.splice(index, 1);
    },
    setShow(state, show) {
      state.show = show;
    },
    setMessage(state, message) {
      state.message = message;
    },
    deleteCompleted(state) {
      state.todos = state.todos.filter((item) => {
        return !item.completed;
      });
    },
    dragItem(state, item) {
      state.drag = item;
    },
    dropItem(state, item) {
      const indexItem = state.todos.indexOf(this.$root.drag);
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
