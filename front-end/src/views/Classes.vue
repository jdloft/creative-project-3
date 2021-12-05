<template>
  <div class="container m-5 p-2 rounded mx-auto bg-light shadow">
    <div class="row m-1 p-4">
      <div class="col">
        <div
          class="p-1 h1 text-primary text-center mx-auto display-inline-block"
        >
          <i class="fa fa-check bg-primary text-white rounded p-2"></i>
          Classes
        </div>
      </div>
    </div>
    <div class="row m-1 p-3">
      <form v-on:submit.prevent="addClass">
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
              placeholder="New class..."
              v-model="newClassName"
            />
          </div>
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
              placeholder="Description..."
              v-model="newClassDescription"
            />
          </div>
          <div class="col-auto px-0 mx-0 mr-2">
            <button type="submit" class="btn btn-primary">Add</button>
          </div>
        </div>
      </div>
      </form>
    </div>
    <p>
      Click a class to go to that class's specific to-do list.
    </p>
    <ul>
      <li
        v-for="item in classes"
        :key="item.name"
      >
        <router-link :to="'/class/' + item.name">
          <label class="class-name">{{ item.name }}</label>
          <label class="class-description">{{ item.description }}</label>
        </router-link>
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

.class-name {
  width: 50;
}

.class-description {
  width: 50;
}
</style>

<script>
// @ is an alias to /src

import axios from 'axios';
export default {
  name: "Classes",
  data: function() {
    return {
      classes: [],
      newClassName: "",
      newClassDescription: "",
    }
  },
  created() {
    this.getClasses();
  },
  methods: {
    async getClasses() {
      console.log("Getting classes");
      try {
        let response = await axios.get("/api/classes");
        console.log(response.data);
        this.classes = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async addClass() {
      console.log("Adding class " + this.newClassName);
      this.classes.push({
        name: this.newClassName,
        description: this.newClassDescription,
      });
      try {
        await axios.post("/api/classes", {
          name: this.newClassName,
          description: this.newClassDescription,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
