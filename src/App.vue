<template>
    <div class="wrapper">
        <my-button @click="showDialog">Создать пост</my-button>
        <my-button @click="fetchPosts">Обновить список</my-button>
        <my-dialog v-model:show="dialogVisible">
            <post-form 
                @create="createPost"
            />
        </my-dialog>
        <post-list 
            :posts="posts"
            @remove="removePost"
        />
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
            try {
                setTimeout(async () => {
                    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${Math.floor(Math.random() * 10)}`)
                    this.posts = response.data
                }, 1000);
            } catch (error) {
                console.log(error);
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
</style>