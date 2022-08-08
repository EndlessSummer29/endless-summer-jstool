<template>
  <div id="app">
    
          <router-view/>
    <!-- <el-container height="100%">
  <el-aside width="200px">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link> |
          <router-link to="/threejs">threejs</router-link> |
          <router-link to="/editormd">editors-mg</router-link> |
          <router-link to="/editorw">editors</router-link>
  </el-aside>
  
  <el-container height="100vh">
    <el-header style="text-align: right; font-size: 12px">

      s
    </el-header>
    
    <el-main>

          <router-view/>
    </el-main>
  </el-container>
</el-container> -->
  </div>
</template>
<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>
<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
.el-header{
  background-color: #ffffff;
  // box-shadow: 0 3px 8px 0 rgba(116,129,141,0.1);
  box-shadow: 0 8px 12px #ebedf0;
  border-bottom: 1px solid #d4dadf;
}
.el-aside{
  background-color: #ffffff;
  box-shadow: 0 8px 12px #ebedf0;
}
// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
