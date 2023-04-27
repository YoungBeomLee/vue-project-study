<template>
  <div class="alert toast-box" :class="`alert-${type}`">
    {{ message }}
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'info',
    }
  }

}
</script>
<style>
.toast-box {
  position: fixed;
  top: 10px;
  right: 10px;
}
</style>