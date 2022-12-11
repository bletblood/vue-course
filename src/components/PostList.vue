<template >
  <div v-if="posts.length > 0">
    <h3>Список</h3>
    <transition-group name="list">
      <post-item 
        v-for="post in posts"
        :post="post"
        :key="post.id"
        @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <div v-else>
    <h3 style="color: red">Список пуст</h3>
  </div>

</template>
<script>
import PostItem from "@/components/PostItem";

export default {
  components: {
    PostItem
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>
<style scoped> 
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active,
  .list-leave-active {
    transition: all .4s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(130px);
  }

  .list-move {
    transition: transform 0.8s ease;
  }
</style>