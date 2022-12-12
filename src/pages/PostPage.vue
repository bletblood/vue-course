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
          @create="createPost"
      />
    </my-dialog>

    <post-list 
      v-if="!isLoading"
      :posts="sortedAndSearchPosts"
      @remove="removePost"
    />
    <div v-else><h3>Загрузка...</h3></div>
    <div class="wrapper-observer">
      <div v-intersection="loadMorePosts" class="observer">Показать еще</div>
    </div>
    <!-- <div class="wrapper-pagination" :class="{'hidden': this.$refs.observer}">
      <div  
        v-for="pageNumber in totalPages" 
        :key="pageNumber"
        :class="{
          'current-page': this.page === pageNumber 
        }"
        @click="changePage(pageNumber)"
        class="page" 
      >
        {{ pageNumber }}
      </div>
    </div> -->
  </div>
</template>

<script>
import PostForm from '@/components/PostForm'
import PostList from '@/components/PostList'
import axios from 'axios'

export default {
    components: {
        PostForm,
        PostList
    },

    data() {
        return {
            posts: [],
            dialogVisible: false,
            isLoading: false,
            selectedSort: '',
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPages: 0,
            sortOptions: [
              {value: '', name: 'Выберите из списка', disabled: true},
              {value: 'title', name: 'По название'},
              {value: 'body', name: 'По описанию'},
              {value: 'id', name: 'По идентификатору'},
            ]

        }
    },

    methods: {
        createPost(post) {
          this.posts.push(post)
          this.dialogVisible = false
        },
        removePost(post){
          this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog() {
          this.dialogVisible = true
        },
        changePage(pageNumber) {
          this.page = pageNumber  
        },
        async fetchPosts() {
          try {
              this.isLoading = true
              const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
                params: {
                  _page: this.page,
                  _limit: this.limit
                }
              })
              this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
              this.posts = response.data
            } catch (error) {
                console.log(error);
            } finally {
                this.isLoading = false
            }
        },  
        async loadMorePosts() {
            try {
              this.page += 1
              const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
                params: {
                  _page: this.page,
                  _limit: this.limit
                }
              })
              this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
              this.posts = [...this.posts, ...response.data]
            } catch (error) {
                console.log(error);
            }
        },  
    },
    mounted() {
        this.fetchPosts()
    },
    computed: {
      sortedPosts() {
        return [...this.posts].sort((post1, post2) => {
          if(this.selectedSort === 'id') return post1[this.selectedSort] - post2[this.selectedSort]
          return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
        })
      },
      sortedAndSearchPosts() {
        return this.sortedPosts.filter(post => post?.title.toLowerCase().includes(this.searchQuery))
      }
    },
    watch: {
      // page() {
      //   if(!this.$refs.observer) return this.fetchPosts()
      // }
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