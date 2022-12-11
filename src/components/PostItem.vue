<template>
  <div class="post">
    <div>
      <div><strong>Название:</strong> {{ post.title }}</div>
      <div><strong>Описание:</strong> {{ post.body }}</div>
    </div>
    <div class="post-btns">
      <my-button
        @click="$router.push(`/posts/${post.id}`)"
      >
        Открыть
      </my-button>
      <my-button
        @click="$emit('remove', post)"
      >
        Удалить
      </my-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style scoped>
  .post {
    padding: .75rem;
    margin-top: .5rem;
    border: 2px solid teal;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .post-btns {
    display: flex;
  }
</style>