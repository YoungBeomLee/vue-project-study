<template>
  <TodoForm :editing="true" />
</template>
<script>
import TodoForm from "@/components/TodoForm.vue";
export default {
  components: { TodoForm }
}
</script>
<style></style>