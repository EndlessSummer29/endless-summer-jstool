<template>
<div style="height:100%;width:100%;">
  
  <HeaderMenu/>
  <div style="position:relative;height:100%;width:100%;">
    <div style="position:absolute;top:0;left:50%;">
        
        <!-- gltf加载器
        <input @change="uploadCode($event)" type="file" id="fileInput" /> -->
        <button @click="showtree">显示树装</button>
        <button @click="exGLTF">导出gltf</button>
    </div>
    <div class="gltfinit"></div>
    <div id="container"></div>
    <div id="stats"></div>
    <ModelTree @removedel="removedel" @showmodel="showmodel" :modeldata="modeldata" :visible="visible" @changeDrawer="changeDrawer"/>
  </div>
</div>
</template>

<script>
import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import Stats from 'three/examples/jsm/libs/stats.module.js';
import C_GUI from '../../../../packages/utils/threejs/originalScript/lilGUI'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import C_PerspectiveCamera from "../../../../packages/utils/threejs/originalScript/Camera";
import { Renderer } from "../../../../packages/utils/threejs/originalScript/Renderer-s";

import modeltree from "../../../components/threejs/modeltree.vue"
import headermenu from "../../../components/threeUI/header.vue"

import ModelExporter from '../../../../packages/utils/threejs/exporters/index'
import UploadFiles from '../../../../packages/utils/upload/index'

import Threeinit from '../../../../packages/utils/threejs/index'
import { emitter } from "../../../main";
import onemit from '../../../components/threeUI/header-onemit'
var scene, camera, renderer,controls;
var animateID;
var stats;
var ambient,ModelObject;
var light1
var lightstate = {
  directIntensity:0.8 * Math.PI,
  directColor: 0xFFFFFF,
  ambientIntensity: 0.3,
  ambientColor: 0xFFFFFF,
}


var three;
export default {
  data(){
    return {
      visible:false,
      modeldata:{},
    }
  },
mounted() {
    this.init();
    emitter.on('exportGLTF',data=>{
        console.log('asfasfsafasfasfsafasf',data)
    })
    emitter.on('importGLTF',data=>{
        let that = this
        let inputdom = document.createElement("input")
        inputdom.type = 'file'
        inputdom.style.display = 'none'
        document.body.appendChild(inputdom)
        inputdom.onchange = function loaderfile(params) {
          that.uploadCode(params)
          document.body.removeChild(inputdom)
        }
        inputdom.click()
    })
},
  methods: {
    uploadCode(event) {
      const file =  new UploadFiles()
      three.GLTF_Add(file.uploadCode(event))
    },
    init() {
      var gltfinit = document.getElementsByClassName("gltfinit")[0];
      var statsinit = document.getElementById("stats")
      var containerinit = document.getElementById("container")
      three = new Threeinit(gltfinit)
      three.Stats_Add(statsinit)
      three.GUIinit(containerinit)
      // onemit()
    },
    gltfld(file){
        const loader = new GLTFLoader();
        // const dracoLoader = new DRACOLoader()
        loader.load(file,(gltf) =>{
            console.log('gltf',gltf)
            ModelObject = gltf.scene || gltf.scenes[0];
            const RedirectBox = new THREE.Box3().setFromObject(ModelObject);
            const size = RedirectBox.getSize(new THREE.Vector3()).length();
            // console.log(size, "size")
            const center = RedirectBox.getCenter(new THREE.Vector3());
            controls.reset();
            ModelObject.position.x += ModelObject.position.x - center.x;
            ModelObject.position.y += ModelObject.position.y - center.y;
            ModelObject.position.z += ModelObject.position.z - center.z;
            // controls.maxDistance = size * 1;
            camera.near = size / 100;
            camera.layers.set(0)
            camera.far = size * 100;
            camera.updateProjectionMatrix();
            camera.position.copy(center);
            //不要删
            camera.position.x += size / 30.0;
            camera.position.y += size / 80.0;
            camera.position.z += size / 25.0;
            //不要删
            console.log('原',ModelObject)
            window.GLTFObject = ModelObject
            scene.add(ModelObject);
            //ss
            this.animate();
        })
    },
    changeDrawer(v){
      this.visible = v
    },
    showtree(){
        // this.modeldata = ModelObject
        // console.log(this.modeldata)
      // if(this.visible){

      // }else{
      //   this.modeldata = ModelObject
      // }
      this.visible = !this.visible
    },
    showmodel(selectdata){
      var changedata = scene.getObjectByProperty('uuid',selectdata.uuid)
      let layers = new THREE.Layers();
      let cameralayers = camera.layers.mask
      let selectlayers = selectdata.layers.mask
      layers.set(cameralayers == selectlayers?1:0);
      changedata.layers = layers
      console.log('选中的data',changedata)
    },
    removedel(selectdata){
      var changedata = scene.getObjectByProperty('uuid',selectdata.uuid)
      let layers = new THREE.Layers();
      layers.set(1);
      changedata.layers = layers
    },
    exGLTF(){
      const options = {
          // trs: document.getElementById( 'option_trs' ).checked,
          onlyVisible: true,
          truncateDrawRange: true,
          // binary: document.getElementById( 'option_binary' ).checked,
          // maxTextureSize: Number( document.getElementById( 'option_maxsize' ).value ) || Infinity // To prevent NaN value
      };
      const GLTF = new ModelExporter()
      GLTF.GLTF(ModelObject,options)
    }
  },
  components:{
    "ModelTree":modeltree,
    "HeaderMenu":headermenu,
  },
  beforeDestroy(){
    three.Destroy()
  }
};
</script>
<style lang="scss">
.gltfinit{
    height: 100%;
    width: 100%;
    overflow: hidden;
    #rendercanvas{
        width: 100%;
        height: 100%;
    }
}
#container{
  position: absolute;
  top: 0;
  right: 0;
}
#stats{
  div{
    z-index: 1 !important;
  }
}
</style>