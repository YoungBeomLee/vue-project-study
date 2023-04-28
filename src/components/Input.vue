<template>
  <div class="form-group">
    <label>{{ label }} </label>
    <input type="text" class="form-control" v-model="todo.subject"/>
  </div>
  <div v-if="error" class="red">
    {{ error }}
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, required: true },
    error: { type: String, required: true },
  },
};
</script>

<style>
</style>