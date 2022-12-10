<template>
  <button>
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: 'my-button'
}
</script>
<style scoped>
  button {
    padding: .5rem;

    background: none;
    border: 1px solid teal;

    align-self: flex-end;
  }
</style>