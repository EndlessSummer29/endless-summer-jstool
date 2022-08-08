<template>
<div class="header">
  <el-menu
    :default-active="activeIndex"
    class="el-menu-three"
    mode="horizontal"
    @select="handleSelect"
  >
    <HeaderItem :subMenuList="menuList" />
    <!-- <el-menu-item index="1">处理中心</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">我的工作台</template>
      <el-menu-item index="3-1">选项1</el-menu-item>
      <el-menu-item index="3-2">选项2</el-menu-item>
      <el-menu-item index="3-3">选项3</el-menu-item>
      <el-submenu index="3-4">
        <template slot="title">选项4</template>
        <el-menu-item index="3-4-1">选项1</el-menu-item>
        <el-menu-item index="3-4-2">选项2</el-menu-item>
        <el-menu-item index="3-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu> -->
  </el-menu>
</div>
  <!-- <div class="output">
    <div class="headerone">
        <div v-for="item in menu" :key="item.name">
            <div class="first">
                {{item.name}}
                <div class="second">
                    <div v-if="item.child.length>0">
                        <div v-for="child in item.child" :key="child">
                            {{child.name}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div> -->
</template>

<script>
import HeaderItem from './header-item'
import menuList from './header-menulist'
import { emitter } from "../../main";
export default {
    data(){
        return {
            activeIndex:'0',
            menuList:[...menuList]
        }
    },
    methods:{
        handleSelect(e){
            emitter.emit(e,true)
            // console.log(e)
        },
    },
    components:{
        'HeaderItem':HeaderItem
    }
};
</script>

<style lang="scss" scoped>
// .output{
//     background: #fff;
//     .headerone{
//         display: flex;
//         justify-content: flex-start;
//         align-items: center;
//         .first{
//             position: relative;
//             background: #fff;
//             transition:  all 0.5s;
//             height: 50px;
//             padding: 10px 15px;
//             .second{
//                 position: absolute;
//                 left: 0;
//                 top: 50px;
//                 background: #fff;
//                 // display: none;
//                 opacity: 0;
//                 transition:  all 0.5s;
//             }
//         }
//         .first:hover{

//             background: #f5f5f5;
//         }
//         .first:hover .second{
//             // display: block;
//             opacity: 1;
//         }
//         .second:hover{
//             display: block;
//             opacity: 1;
//         }
//     }
// }
.header{
    height: 40px;
    .el-menu-three{
        height: 100%;
    }
}
// .el-menu-three::v-deep{
//     .el-menu-item{
//         height: 100% !important;
//         line-height: 40px !important;
//         padding: 0 15px !important;
//     }
//     .el-submenu{
//         height: 100% !important;
//     }
//     .el-submenu__title{
//         height: 100% !important;
//         line-height: 40px !important;
//         padding: 0 15px !important;
//     }
// }
</style>