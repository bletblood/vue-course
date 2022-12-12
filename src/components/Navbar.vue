<template lang="">
  <div class="navbar">
    <div @click="$router.push('/')" style="margin: 0 .5rem">Vue 3</div>
    <div class="btn-group">
      <my-button @click="$router.push('/posts')">Посты</my-button>
      <my-button @click="$router.push('/composition')">Composition</my-button>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
  .navbar {
    width: 100%;
    height: 48px;

    background: lightgrey;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
</style>