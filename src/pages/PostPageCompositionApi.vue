<template>
  <div class="wrapper">
    <div class="wrapper-btns">

      <div class="btn-group">
        <my-button @click="showDialog">Создать пост</my-button>
        <my-button @click="fetchPosts">Обновить список</my-button>
      </div>

      <div class="btn-group">
        <my-input v-model="searchQuery" placeholder="Поиск по названию..."/>
        <my-select v-model="selectedSort" :options="sortOptions" />
      </div>

    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form 
      />
    </my-dialog>

    <post-list 
      v-if="!isLoading"
      :posts="sortedAndSearchPosts"
    />
    <div v-else><h3>Загрузка...</h3></div>
    <!-- <div class="wrapper-observer">
      <div v-intersection="loadMorePosts" class="observer">Показать еще</div>
    </div> -->
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

import PostForm from '@/components/PostForm'
import PostList from '@/components/PostList'

import usePosts from '@/hooks/usePosts'
import useSortedPosts from '@/hooks/useSortedPosts'
import useSelectedSortAndSearch from '@/hooks/useSelectedSortAndSearch'

export default {
    components: {
        PostForm,
        PostList
    },

    data() {
        return {
            dialogVisible: false,
            sortOptions: [
              {value: '', name: 'Выберите из списка', disabled: true},
              {value: 'title', name: 'По название'},
              {value: 'body', name: 'По описанию'},
              {value: 'id', name: 'По идентификатору'},
            ]

        }
    },
    setup(props) {
      const { posts, isLoading, totalPages } = usePosts(10)
      const { selectedSort, sortedPosts } = useSortedPosts(posts)
      const { searchQuery, sortedAndSearchPosts } = useSelectedSortAndSearch(sortedPosts)

      return {
        posts, isLoading, totalPages, selectedSort, sortedPosts, searchQuery, sortedAndSearchPosts
      }
    }
}
</script>

<style lang="scss" scoped>  
  .wrapper {
    padding: .75rem;

    &-btns {
      display: flex;
      justify-content: space-between;
    }

    &-pagination {
      display: flex;
      flex-direction: row;
    }

    .page {
      width: 16px;
      padding: .25rem;
      margin: .25rem;

      text-align: center;

      border: 1px solid teal;
    }

    .current-page {
      width: 16px;
      padding: .25rem;
      margin: .25rem;

      text-align: center;
      
      border: 1px solid blue;
    }

    .wrapper-observer{
      width: 100%;

      visibility: hidden;
      display: flex;
      justify-content: center;

      .observer {
        width: 128px;
  
        padding: .5rem;
        margin: .5rem;
  
        border: 2px solid teal;
        text-align: center;
  
        font-weight: bold;
        font-size: normal;
      }
    }

    .hidden {
      display: none;
    }
  }
</style>