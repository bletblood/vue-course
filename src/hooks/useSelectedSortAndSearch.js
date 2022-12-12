import { computed, ref } from "vue";

export default function useSelectedSortAndSearch(sortedPosts) {
  const searchQuery = ref('')

  const sortedAndSearchPosts = computed(() => {
    return sortedPosts.value.filter(post => post?.title.toLowerCase().includes(searchQuery.value))
  })

  return {
    searchQuery, sortedAndSearchPosts
  }
};
