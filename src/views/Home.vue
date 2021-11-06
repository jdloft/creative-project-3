<template>
  <div class="home">
    <h1>A List of Things To Do</h1>
    <p v-show="activeTodos.length === 0">
      You are done with all your tasks! Good job!
    </p>
    <form v-on:submit.prevent="addItem">
      <input type="text" :value="message" @input="updateMessage" />
      <select :value="priority" @input="updatePriority" selected="2">
        <option value="1">High</option>
        <option value="2">Medium</option>
        <option value="3">Low</option>
      </select>
      <button type="submit">Add</button>
    </form>
    <div class="controls">
      <button v-on:click="showAll()">Show All</button>
      <button v-on:click="showActive()">Show Active</button>
      <button v-on:click="showCompleted()">Show Completed</button>
    </div>
    <ul>
      <li
        v-for="item in filteredTodos"
        :key="item.text"
        draggable="true"
        v-on:dragstart="dragItem(item)"
        v-on:dragover.prevent
        v-on:drop="dropItem(item)"
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
    filteredTodos() {
      if (this.$store.state.show === "active")
        return this.$store.state.todos.filter((item) => {
          return !item.completed;
        });
      if (this.$store.state.show === "completed")
        return this.$store.state.todos.filter((item) => {
          return item.completed;
        });
      return this.$store.state.todos;
    },
    message() {
      return this.$store.state.message;
    },
    priority() {
      return this.$store.state.priority;
    }
  },
  methods: {
    addItem() {
      this.$store.commit("addItem");
    },
    dragItem(item) {
      this.$store.commit("dragItem", item);
    },
    dropItem(item) {
      this.$store.commit("dropItem", item);
    },
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
    updatePriority(e) {
      console.log("Priority set to " + e.target.value);
      this.$store.commit("setPriority", e.target.value);
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
    }
  }
};
</script>
