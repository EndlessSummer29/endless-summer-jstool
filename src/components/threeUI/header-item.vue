<template>
<!--  class="extendul el-menu--horizontal" -->
    <div class="extendul">
        <template v-for="(item, index) in subMenuList">
            <el-submenu
                v-if="item.children && item.children.length > 0"
                :key="index + 'el-submenu'"
                :index="item.ename"
            >
                <template slot="title" @click="openone(item.action)">
                    {{item.name}}
                <!-- <i :class="item.meta.icon&&item.meta.icon"></i> -->
                <!-- <span>{{ item.meta.name }}</span> -->
                </template>
                <HeaderItem :subMenuList="item.children" />
            </el-submenu>
            <el-menu-item v-else :key="index + item.ename" :index="item.ename">
                <span slot="title" @click="openone(item.action)">
                    {{item.name}}
                <!-- <i :class="item.meta.icon&&item.meta.icon"></i> -->
                <!-- <span>{{ item.meta.name }}</span> -->
                </span>
            </el-menu-item>
        </template>
    </div>
</template>

<script>
import HeaderItem from './header-item'
import { emitter } from "../../main";
import clickbus from './header-click'
export default {
    name: "HeaderItem",
    data(){
        return {
        }
    },
    props: {
        subMenuList: {
            //接收到的菜单信息
            type: Array,
            default: [],
        },
        authority: {
            //填报权限 0 1不展示
            type: Number,
            default: 0,
        },
        mode: {
            //菜单 水平  垂直
            type: String,
            default: "horizontal",
        },
    },
    methods:{
        openone(name){
            // emitter.emit(name,true)
            // clickbus(name)
        }
    },
    components:{
        'HeaderItem':HeaderItem
    }
};
</script>

<style lang="scss">

/* 水平样式 */
.el-menu--horizontal>div>.el-submenu {
    float: left !important;
}
/* 一级菜单的样式 */
.el-menu--horizontal>div>.el-menu-item {
    float: left !important;
    height: 40px !important;
    line-height: 40px !important;
    margin: 0 !important;
    border-bottom: 2px solid transparent !important;
    color: #909399 !important;
}
/* 解决下图1 下拉三角图标 */
.el-menu--horizontal>div>.el-submenu .el-submenu__icon-arrow {
    position: static !important;
    vertical-align: middle !important;
    margin-left: 8px !important;
    margin-top: -3px !important;
}
/* 解决下图2 无下拉菜单时 不对齐问题 */
.el-menu--horizontal>div>.el-submenu .el-submenu__title {
    height: 40px !important;
    line-height: 40px !important;
    border-bottom: 2px solid transparent !important;
    color: #909399 !important;
}
.extendul{
    height: 100%;
    // list-style-type: disc;
    //     box-sizing: inherit;
    //         list-style: none;
    // float: left;
    // display: flex;
    // .el-submenu {
    //     float: left;
    // }
    // .el-submenu {
    // height: 60px !important;
    // line-height: 60px;
    // border-bottom: 2px solid transparent;
    // color: #909399;
    // }
}
// .extendul .el-submenu__title {
//     height: 60px !important;
//     line-height: 60px;
//     border-bottom: 2px solid transparent;
//     color: #909399;
// }
// .header{
//     height: 40px;
//     .el-menu-three{
//         height: 100%;
//     }
// }
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