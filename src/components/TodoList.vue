<template>
  <List :items="todos">
    <template #default="{ item, index }">
      <div class="d-flex p-2 align-item-center" @click="moveToPage(item.id)" style="cursor:pointer">
        <div class="flex-grow-1">
          <input
            type="checkbox"
            class="ml-2 mr-2"
            :checked="item.completed"
            @change="toggleTodo(index, $event)"
            @click.stop
          />
          <span :class="{ todo: item.completed }">{{ item.subject }}</span>
        </div>
        <div>
          <button class="btn btn-danger btn-sm" @click.stop="openModal(item.id)">
            삭제
          </button>
        </div>
      </div>
    </template>
  </List>

  <teleport to="#mango">
    <Modal v-if="showModal" @close="closeModal" @delete="deleteTodo" />
  </teleport>
</template>

<script>
import { useRouter } from "vue-router";
import { ref } from "vue";
import Modal from "@/components/DeleteModal.vue";
import List from "@/components/List.vue";
export default {
  components: {
    Modal,
    List,
  },
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  emits: ["toggle-todo", "delete-todo"],
  setup(props, { emit }) {
    const router = useRouter();
    let showModal = ref(false);
    let todoDeltedId = ref(null);
    const openModal = (id) => {
      todoDeltedId.value = id;
      showModal.value = true;
    };
    const toggleTodo = (index, event) => {
      console.log("👩‍👦‍👦", index, event.target.checked);
      emit("toggle-todo", index, event.target.checked);
    };
    const deleteTodo = () => {
      emit("delete-todo", todoDeltedId.value);
      showModal.value = false;
      todoDeltedId.value = null;
    };
    const moveToPage = (todoId) => {
      router.push({
        name: "Todo",
        params: {
          id: todoId,
        },
      });
    };
    const closeModal = () => {
      todoDeltedId.value = null;
      showModal.value = false;
    };
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
