<template>
  <!-- As a link -->
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand" >망고노트</router-link>
      <div class="navbar-nav"><router-link class="nav-link active" to="/todos">망고의 일정목록</router-link></div>
    </div>
  </nav>
  <div class="container">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style>

</style>
