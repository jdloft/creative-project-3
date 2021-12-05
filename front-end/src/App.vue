<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">List</router-link> |
      <router-link to="/class">Classes</router-link>
    </div>
    <router-view/>
    <p><a href="https://github.com/jdloft/creative-project-3">Repo</a></p>
  </div>
</template>

<style>
@import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
