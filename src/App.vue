<template lang="">
  <navbar />
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar'
export default {
  components: {
    Navbar
  }
}
</script>
<style>
  * {
    margin: 0;
    padding: 0;
    border-style: border-box;
  }
</style>