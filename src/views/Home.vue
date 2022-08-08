<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
      <!-- <MapSearch height="100vh" :center="[114.303504,30.545263]"/>
      <MapSearch height="100vh" :center="[114.303504,30.542664]"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
// import MapSearch from '../../packages/components/Map-search/'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    // MapSearch
  }
}
</script>
