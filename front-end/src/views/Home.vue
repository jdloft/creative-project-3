<template>
  <div class="container m-5 p-2 rounded mx-auto bg-light shadow">
    <div class="row m-1 p-4">
      <div class="col">
        <div
          class="p-1 h1 text-primary text-center mx-auto display-inline-block"
        >
          <i class="fa fa-check bg-primary text-white rounded p-2"></i>
          To-do List
        </div>
      </div>
    </div>
    <div class="row m-1 p-3">
      <form v-on:submit.prevent="addItem">
      <div class="col col-11 mx-auto">
        <div
          class="
            row
            bg-white
            rounded
            shadow-sm
            p-2
            add-todo-wrapper
            align-items-center
            justify-content-center
          "
        >
          <div class="col">
            <input
              class="
                form-control form-control-lg
                border-0
                add-todo-input
                bg-transparent
                rounded
              "
              type="text"
              placeholder="New todo..."
              v-model="message"
            />
          </div>
          <div class="col">
            <select v-model="priority" selected="2">
              <option value="1">High</option>
              <option value="2">Medium</option>
              <option value="3">Low</option>
            </select>
          </div>
          <div class="col-auto px-0 mx-0 mr-2">
            <button type="submit" class="btn btn-primary">Add</button>
          </div>
        </div>
      </div>
      </form>
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
        v-for="item in filteredTodos"
        :key="item.text"
        draggable="true"
        v-on:dragstart="dragItem(item)"
        v-on:dragover.prevent
        v-on:drop="dropItem(item)"
      >
        <input type="checkbox" v-model="item.completed" />
        <label v-bind:class="{ completed: item.completed }">{{
          item.message
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
  text-align: left;
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

import axios from 'axios';
export default {
  name: "Home",
  data: function() {
    return {
      message: "",
      priority: 2,
      todos: [],
    };
  },
  computed: {
    activeTodos() {
      return this.todos.filter((item) => {
        return !item.completed;
      });
    },
    filteredTodos() {
      if (this.$store.state.show === "active")
        return this.todos.filter((item) => {
          return !item.completed;
        });
      if (this.$store.state.show === "completed")
        return this.todos.filter((item) => {
          return item.completed;
        });
      return this.todos;
    },
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      console.log("Getting items");
      try {
        let response = await axios.get("/api/items");
        console.log(response.data);
        this.todos = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async addItem() {
      console.log("Adding item " + this.message);
      var today = new Date();
      var currentDate = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
      this.$store.commit("addItem", currentDate);
      this.todos.push({
        message: this.message,
        priority: this.priority,
        completed: false,
      });
      try {
        await axios.post("/api/items", {
          message: this.message,
          priority: this.priority,
          completed: false,
          date: currentDate,
        });
      } catch (error) {
        console.log(error);
      }
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
