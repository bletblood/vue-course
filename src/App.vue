<template>
  <div class="wrapper">
    <div class="wrapper-btns">

      <div class="btn-group">
        <my-button @click="showDialog">Создать пост</my-button>
        <my-button @click="fetchPosts">Обновить список</my-button>
      </div>

      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form 
          @create="createPost"
      />
    </my-dialog>

    <post-list 
      v-if="!isLoading"
      :posts="posts"
      @remove="removePost"
    />
    <div v-else><h3>Загрузка...</h3></div>
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
            sortOptions: [
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
        async fetchPosts() {
            this.isLoading = true
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${Math.floor(Math.random() * 10)}`)
                this.posts = response.data
            } catch (error) {
                console.log(error);
            } finally {
                this.isLoading = false
            }
        }
    },
    mounted() {
        this.fetchPosts()
    }
}
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
        border-style: border-box;
    }
    
    .wrapper {
        padding: .75rem;
    }

    .wrapper-btns {
      display: flex;
      justify-content: space-between;
    }
</style>