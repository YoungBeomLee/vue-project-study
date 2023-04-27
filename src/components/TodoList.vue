<template>
  <div class="card mb-2">
    <div @click="moveToPage(i.id)" class="card-body p-2 d-flex" v-for="i in todos" :key="i.id" style="cursor:pointer">
      <div class="form-check flex-grow-1">
        <label class="form-check-label" :class="{ todo: i.completed }">
          {{ i.subject }}
          <input
            type="checkbox"
            class="form-check-input"
            :value="todos.completed"
            @change="toggleTodo(i.id,$event)"
            @click.stop :checked="i.completed"
          />
        </label>
      </div>
      <div>
        <button class="btn btn-danger btn-sm" @click.stop="deleteTodo(i.id)">
          삭제
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  emits: ["toggle-todo", "delete-todo"],
  setup(props, { emit }) {
    const router=useRouter();
    const toggleTodo = (index,event) => {
      console.log("👩‍👦‍👦", index,event.target.checked);
      emit("toggle-todo", index,event.target.checked);
    };
    const deleteTodo = (index) => {
      emit("delete-todo", index);
    };
    const moveToPage=(todoId)=>{
      router.push({
        name:'Todo',
        params:{
          id:todoId,
        }
      });
    }
    return {
      toggleTodo,
      deleteTodo,
      moveToPage
    };
  },
};
</script>

<style></style>
