<template>
  <Modal>
    <template v-slot:title><h2>일정삭제🚔</h2></template>
    <template #body>일정이 삭제됩니다.</template>
    <template #footer>
      <button type="button" class="btn btn-secondary" @click="onClose">
        취소
      </button>
      <button type="button" class="btn btn-danger" @click="onDelete"></button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
export default {
  components: {
    Modal,
  },
  setup(props, { emit }) {
    const onClose = () => {
      emit("close");
    };
    const onDelete = () => {
      emit("delete");
    };
    return { onClose, onDelete };
  },
};
</script>

<style></style>
