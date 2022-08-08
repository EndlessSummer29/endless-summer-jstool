{/* <template>
<div style="height:100%;width:100%;">
  
  <HeaderMenu/>
  <div style="position:relative;height:100%;width:100%;">
    <div style="position:absolute;top:0;left:50%;">
        
        gltf加载器
        <input @change="uploadCode($event)" type="file" id="fileInput" />
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
export default {
  data(){
    return {
      visible:false,
      modeldata:{},
    }
  },
mounted() {
    this.init();
    this.statsinit();
    this.guiinit();
},
  methods: {
    uploadCode(event) {
      const file =  new UploadFiles()
      const status = file.uploadCode(event)
      this.gltfld(status)
      console.log(status)
      //此处校验文件后缀
      // var filea = event.target.files[0];
      // let file = event.target.files[0].name; // (利用console.log输出看file文件对象)json
      // let num = file.split(".");
      // let mun = num[num.length - 1];
      // if (mun === "gltf") {
      //   let _that = this;
      //   const selectedFile = event.target.files[0];
      //   // 读取文件名
      //   const name = selectedFile.name;
      //   // 读取文件大小
      //   const size = selectedFile.size;
      //   // FileReader对象，h5提供的异步api，可以读取文件中的数据。
      //   const reader = new FileReader();
      //   // readAsText是个异步操作，只有等到onload时才能显示数据。
      //   reader.readAsText(selectedFile);
      //   this.gltfld(URL.createObjectURL(selectedFile))
      // } else {
      //   this.$message({
      //     message: "请重新点击选择文件传入符合标准的文件",
      //     type: "warning",
      //   });
      // }
    },
    init() {
      var gltfinit = document.getElementsByClassName("gltfinit")[0];
      console.log('gltfinit',gltfinit);
      var Canvas = document.createElement("canvas");
      Canvas.style.width = '100%'
      Canvas.style.height = '100%'
      Canvas.id = "rendercanvas";
      gltfinit.appendChild(Canvas);
      scene = new THREE.Scene();
      camera = new C_PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      scene.add(camera);
      console.log("camera", camera);
      renderer = Renderer({
        Canvas: Canvas,
      });
      renderer.render(scene, camera);
      renderer.setSize(gltfinit.offsetWidth, gltfinit.offsetHeight);


      light1  = new THREE.AmbientLight(lightstate.ambientColor, lightstate.ambientIntensity);
      light1.name = 'ambient_light';
      scene.add( light1 );
      const light2  = new THREE.DirectionalLight(lightstate.directColor, lightstate.directIntensity);
      light2.position.set(0.5, 0, 0.866); // ~60º
      light2.name = 'main_light';
      scene.add(light2);



    //   var initdom = document.getElementById("container");
      // initdom.appendChild(stats.dom)
      gltfinit.appendChild(renderer.domElement);
      controls = new OrbitControls(camera, renderer.domElement);
      // controls.minPolarAngle = 0.3;//最大俯角
      controls.maxPolarAngle = 1.75; //最大仰角
      //事件
      window.addEventListener("resize", function () {
        const resolution = new THREE.Vector2();
        console.log(gltfinit.offsetWidth, gltfinit.offsetHeight)
        resolution.set(document.body.clientWidth, window.innerHeight);
        camera.resize(resolution);
        camera.updateProjectionMatrix();
        // renderer.setSize(window.innerWidth, window.innerHeight);
        // renderer.setSize(gltfinit.innerWidth, gltfinit.innerWidth);
        renderer.setSize(gltfinit.offsetWidth, gltfinit.offsetHeight);
      });
    },
    statsinit(){
      stats = new Stats();
      stats.domElement.style.position = 'absolute'; //绝对坐标  
      stats.domElement.style.left = '0px';// (0,0)px,左上角  
      stats.domElement.style.top = '0px'; 
      stats.domElement.style.height = '40px'; 
      document.getElementById("stats").appendChild(stats.dom)
    },
    guiinit(){
      const lil_gui = new C_GUI({ container: document.getElementById( 'container' ) })
      lil_gui.renderer(renderer)
      lil_gui.control_light(lightstate,light1)
    },
    animate(time){
        animateID = requestAnimationFrame(this.animate);
        // console.log('ss保存销毁需要解决',animateID)
        controls.update();
        TWEEN.update(time);
        renderer.render(scene, camera);
        stats.update();
        // console.log('ss保存销毁需要解决',lightstate.directIntensity)
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
    clears(){
      clearTimeout()
        try {
          // 清除
          var requestID = window.cancelAnimationFrame(animateID);
          scene.remove( ModelObject );
          if(ModelObject){
            ModelObject.traverse((node) => {
              if ( !node.isMesh ) return;
              node.geometry.dispose();
            } );
          }
          //ssssssssss
          scene.clear()
          renderer.dispose()
          renderer.forceContextLoss()
          renderer.content = null
        } catch (e) {
          console.log(e)
        }
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
    this.clears()
    // 清空
    console.log('!!!!! !!!')
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
</style> */}