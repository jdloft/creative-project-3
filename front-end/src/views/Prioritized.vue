<template>
  <div class="container m-5 p-2 rounded mx-auto bg-light shadow">
    <div class="row m-1 p-4">
      <div class="col">
        <div
          class="p-1 h1 text-primary text-center mx-auto display-inline-block"
        >
          <i class="fa fa-check bg-primary text-white rounded p-2"></i>
          To-do List (Prioritized)
        </div>
      </div>
    </div>
      <p v-show="activeTodos.length === 0">
        All tasks completed. Make a new one!
      </p>
      <div class="controls">
        <button v-on:click="showAll()" class="btn btn-primary">Show All</button>
        <button v-on:click="showActive()" class="btn btn-primary">Show Active</button>
        <button v-on:click="showCompleted()" class="btn btn-primary">Show Completed</button>
      </div>
      <ul>
        <li
          v-for="item in prioritizedTodos"
          :key="item.text"
          draggable="true"
        >
          <input type="checkbox" v-model="item.completed" />
          <label v-bind:class="{ completed: item.completed }">{{
            item.text
          }}</label>
          <div class="priority">{{ getPriorityLabel(item.priority) }}</div>
        </li>
      </ul>
    </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&amp;display=swap");
body {
  font-family: "Arvo";
  font-size: 16px;
  padding: 20px 100px 0px 100px;
  background: #f3f3f3;
}

/* List */

ul {
  list-style: none;
}

li {
  background: #fff;
  width: 500px;
  min-height: 30px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 1em;
  display: flex;
  align-items: center;
}

label {
  width: 400px;
}

.completed {
  text-decoration: line-through;
}

/* Form */

input[type="checkbox"] {
  transform: scale(1.5);
  margin-right: 10px;
}

input[type="text"] {
  font-size: 1em;
}

button {
  font-family: "Arvo";
  font-size: 1em;
}

/* Controls */

.controls {
  margin-top: 20px;
}

.controls>.btn {
  margin-right: 5px;
}
</style>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  computed: {
    activeTodos() {
        return this.$store.state.todos.filter((item) => {
            return !item.completed;
        });
    },
    prioritizedTodos() {
        return this.$store.state.todos.filter((item) => {
            return !item.completed;
        }).sort(function(a, b) {
            return a.priority - b.priority;
        });
    },
    message() {
      return this.$store.state.message;
    },
    priority() {
      return this.$store.state.priority;
    },
  },
  methods: {
    showAll() {
      this.$store.commit("setShow", "all");
    },
    showActive() {
      this.$store.commit("setShow", "active");
    },
    showCompleted() {
      this.$store.commit("setShow", "completed");
    },
    updateMessage(e) {
      this.$store.commit("setMessage", e.target.value);
    },
    getPriorityLabel(priority) {
      switch (priority) {
        case 1:
          return "High";
        case 2:
          return "Medium";
        case 3:
          return "Low";
      }
    },
  },
};
</script>
