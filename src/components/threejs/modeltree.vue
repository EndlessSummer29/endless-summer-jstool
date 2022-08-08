<template>
    <el-drawer
        :title="title"
        :visible.sync="drawerVisible"
        :wrapperClosable="false"
        :append-to-body="false"
        :modal="false"
        :size="'100%'"
        style="position:absolute;width:20%"
        z-index="1"
        @close="close"
        :direction="direction">
                <!-- :render-content="renderContent" -->
            <el-tree
                class="treestyle"
                :data="GLTFObject"
                show-checkbox
                node-key="uuid"
                :default-expand-all="false"
                :props="defaultProps"
                @node-click="handleNodeClick"
                >



                
                <span class="custom-tree-node"
                 style="flex: 1;display: flex;align-items: center;justify-content: space-between;font-size: 14px;padding-right: 8px;" 
                 slot-scope="{ node, data }">
                 <span style="display: flex;align-items: center;justify-content: flex-start;">
                    <i style="margin-right:10px;" 
                    :class="'iconfont '+(data.type=='Group'?' icon-d':
                    data.type=='Mesh'?'icon-wangluotuopu':data.type == 'Object3D'?'icon-components-full':' ')"></i>
                    <!-- <img style="height:30px;width:30px" src=""> -->
                    <span style="width:100px;overflow:hideen;width: 100px;
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;">{{node.label}}</span>
                 </span>
                    <span>
                        <!-- @animCreated="handleAnimation" -->
                        <!-- <LottieIcon 
                        :options="defaultOptions" 
                        :height="30" 
                        :width="30" 
                        @click="() => this.showmodel(node, data)"/> -->
                        <el-button size="mini" type="text" @click="() => this.showmodel(node, data)">{{data.layers.mask==1?'隐藏':'显示'}}</el-button>
                    </span>
                </span>
            </el-tree>
            <!-- lottie不删*************************************** -->
            <!-- <LottiePlayer
            v-if="testlottie"
                autoplay
                controls
                loop
                mode="normal"
                :src="testlottie"
                style="width: 320px">
            </LottiePlayer> -->
            <!-- lottie不删*************************************** -->
    </el-drawer>
</template>

<script>
var GLTFObject = []

import scrollDown from '../../../public/svg/Github/github.json';

// const scrollDown = require('../../../public/svg/Github/github.json');
// import * as scrollDown from 'https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json';

export default {
    name:'modeltree',
    data(){
        return {
            show: this.visible,
            GLTFObject:[],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            defaultOptions:{
                // animationData:'https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json',
                // animationData:'https://raw.githubusercontent.com/thesvbd/Lottie-examples/master/assets/animations/skip-forward.json',
                animationData:scrollDown
            },
        }
    },
    props:{
        title: {
            default: '模型名',
            type: String
        },
        visible: {
            default: false,
            type: Boolean
        },
        direction: {
            default: 'ltr',
            type: String
        },
        modeldata: {
            default:function () {
                return {};
            },
            type: Object,
        }
    },
    computed: {
        drawerVisible: {
            get() {
                // console.log(this.visible, 'childVisible')
                    // console.log('---继承----',window.GLTFObject)
                this.deeptraverse(window.GLTFObject)
                return this.visible
            },
            //值变化的时候会被调用
            set(v) {
                console.log(v, 'v')
                this.$emit('changeDrawer', v)
            },
        },
    },
    methods:{
        handleAnimation(anim){
         this.anim = anim;
         console.log('anim',anim); //这里可以看到 lottie 对象的全部属性
        },
        renderContent(h, { node, data, store }) {
            // <--! <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>隐藏</el-button>-->
            return (
            <span class="custom-tree-node" style="flex: 1;display: flex;align-items: center;justify-content: space-between;font-size: 14px;padding-right: 8px;">
                <span style="width:50%;overflow:hideen;">{node.label}</span>
                <span>
                <el-button size="mini" type="text" on-click={ () => this.showmodel(node, data) }>{data.layers.mask==1?'隐藏':'显示'}</el-button>
                </span>
            </span>);
        },
        close(){
            // console.log('close')
            this.$emit('changeDrawer', false)
        },
        showmodel(node, data){
            this.$emit('showmodel', data)
            // console.log(node, data)
        },
        remove(node, data){
            this.$emit('removedel', data)
            // console.log(node, data)
        },
        handleNodeClick(rebackdata){
            console.log('选择',rebackdata)
        },
        deeptraverse(object){
            // // if( instanceof Object&&object.children.length>0)
            // if(object){
            //     GLTFObject.push({
            //         name:object.name,
            //         type:object.type,
            //         num:object.children.length,
            //         children:[],
            //     })
            //     // console.group(' <' + object.type + '> ' + object.name);
            //     object.children.forEach((child,i) => {
            //                 GLTFObject.forEach((Gchild,Gi) => {
            //         console.log(child.name,'-------',Gchild.name)
            //                     if(Gchild.name == child.name){
            //                         GLTFObject[Gi].children.push({
            //                             name:child.name,
            //                             type:child.type,
            //                             num:child.length,
            //                             children:[],
            //                         })
            //                     }
            //                 })
            //                 this.deeptraverse(child)
            //     });
            //     // console.groupEnd();
            // }












            this.GLTFObject = [window.GLTFObject]

















            
            // if(object){
            //     GLTFObject.push({
            //         name:object.name,
            //         type:object.type,
            //         num:object.children.length,
            //         children:[],
            //     })
            //     // console.group(' <' + object.type + '> ' + object.name);


                
            //     GLTFObject.forEach((Gchild,Gi) => {
            //         console.log(child.name,'-------',Gchild.name)
                    
            //         object.children.forEach((child,i) => {
            //             this.deeptraverse(child)
            //         });
            //         if(Gchild.name == child.name){
            //             GLTFObject[Gi].children.push({
            //                 name:child.name,
            //                 type:child.type,
            //                 num:child.length,
            //                 children:[],
            //             })
            //         }
            //     })
            //     // console.groupEnd();
            // }















        }
    },
    mounted(){
            // setTimeout(() => {
            // console.log('scrollDown',scrollDown)
            // }, 5000);
        // this.GLTFObject = window.GLTFObject
        // console.log('this.GLTFObject',this.GLTFObject)
        // this.deeptraverse(window.GLTFObject)
        // // window.GLTFObject.traverse((node) => {
        // //     console.log(node)
        // // })
        // // console.log(window.GLTFObject)
    },
    // components:{
    //     LottiePlayer,
    // }
}
</script>

<style lang="scss" scoped>
:v-deep.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
.treestyle{
    height: 100%;
    overflow-y: scroll;
    // color: #fff;
}
.treestyle::-webkit-scrollbar {
  width: 6px;
  height: 8px
}

.treestyle::-webkit-scrollbar-track-piece {
  background: none;
}

.treestyle::-webkit-scrollbar-thumb {
  /* background-color: rgba(182, 182, 182, 0.5);
  border-radius: 8px; */
  background-color: #b7b7b7;
  border-radius: 4px;
}

.treestyle::-webkit-scrollbar-thumb:vertical {
  border-radius: 4px;
}

.treestyle::-webkit-scrollbar-thumb:hover {
  background-color: rgba(177, 177, 177, 0.8)
}
</style>