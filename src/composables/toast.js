import { ref, onUnmounted } from "vue";

export const useToast = () => {
  const showToast = ref(false);
  const toastMessage = ref('');
  const toastAlertType = ref('');
  const timeout = ref(null);
  onUnmounted(() => { clearTimeout(timeout.value) })
  const triggerToast = (msg, type = 'info') => {
    toastMessage.value = msg;
    toastAlertType.value = type;
    showToast.value = true;
    timeout.value = setTimeout(() => {
      toastMessage.value = '';
      toastAlertType.value = '';
      showToast.value = false;
    }, 1000)
  }
  return {
    showToast, toastMessage, toastAlertType, triggerToast,timeout
  }
}

