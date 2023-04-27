<template>
  <div class="card mb-2">
    <div
      @click="moveToPage(i.id)"
      class="card-body p-2 d-flex"
      v-for="i in todos"
      :key="i.id"
      style="cursor: pointer"
    >
      <div class="form-check flex-grow-1">
        <label class="form-check-label" :class="{ todo: i.completed }">
          {{ i.subject }}
          <input
            type="checkbox"
            class="form-check-input"
            :value="todos.completed"
            @change="toggleTodo(i.id, $event)"
            @click.stop
            :checked="i.completed"
          />
        </label>
      </div>
      <div>
        <button class="btn btn-danger btn-sm" @click.stop="openModal(i.id)">
          삭제<!--
            Modal.vue 에서 삭제하기 버튼 클릭시 호출
            deleteTodo(i.id)-->
        </button>
      </div>
    </div>
  </div>
  <Modal v-if="showModal" @close="closeModal" @delete="deleteTodo" />
</template>

<script>
import { useRouter } from "vue-router";
import Modal from "@/components/Modal.vue";
import { ref } from "vue";

export default {
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  components: {
    Modal,
  },

  emits: ["toggle-todo", "delete-todo"],
  setup(props, { emit }) {
    const router = useRouter();
    let showModal = ref(false);
    let todoDeltedId=ref(null);
    const openModal = (id) =>{
      todoDeltedId.value=id;
      showModal.value =true;
    }
    const toggleTodo = (index, event) => {
      console.log("👩‍👦‍👦", index, event.target.checked);
      emit("toggle-todo", index, event.target.checked);
    };
    const deleteTodo = (index) => {
      emit("delete-todo", index);
    };
    const moveToPage = (todoId) => {
      router.push({
        name: "Todo",
        params: {
          id: todoId,
        },
      });
    };
    const closeModal = () =>{
      todoDeltedId.value=null;
      showModal.value=false;
    }
    return {
      toggleTodo,
      deleteTodo,
      moveToPage,
      openModal,
      showModal,
      closeModal,
    };
  },
};
</script>

<style>
.form-check-label {
  cursor: pointer;
}
</style>
