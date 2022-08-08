import * as THREE from 'three';
import TWEEN from "@tweenjs/tween.js";
export default class C_PerspectiveCamera extends THREE.PerspectiveCamera {
    /**
     * 
     * @param {*} fov 视场-从相机位置能够看到的部分场景
     * @param {*} aspect 长宽比-渲染结构输出区的横向长度和纵向长度比值
     * @param {*} near 近面-从距离相机多近的地方开始渲染场景
     * @param {*} far 远面-相机可以从它所处的位置看多远
     */
    constructor(fov, aspect, near, far) {
        super(fov, aspect, near, far);
        this.cameraResolution = new THREE.Vector2();
        this.time = 0;
    }
    /**
     * 
     * @param {*} fov 视场-从相机位置能够看到的部分场景
     * @param {*} near 近面-从距离相机多近的地方开始渲染场景
     * @param {*} far 远面-相机可以从它所处的位置看多远
     */
    start(fov = 75, aspect = window.innerWidth / window.innerHeight, near = 0.1, far = 1000) {
        this.setFocalLength(fov);
        this.aspect = aspect;
        this.near = near;
        this.far = far;
    }
    /**
     * 相机按轨迹移动
     * @param {*} controls 控制器
     * @param {*} cameraTarget 相机轨迹
     * @param {*} controlsTarget 控制器轨迹
     * @param {*} time 动画时间
     */
    animate(controls,cameraTarget,controlsTarget,time=3000) {
        var tween_start = {x:0}
        const CameraCurve = new THREE.CatmullRomCurve3(cameraTarget,false,'chordal',0.5);
        const ControlsCurve = controlsTarget.length>1?new THREE.CatmullRomCurve3(controlsTarget,false,'chordal',0.5):false;
        let cameraTween = new TWEEN.Tween(tween_start)
        .to({x:1},time)
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .onUpdate((e)=>{
            const Controlsposition = ControlsCurve?ControlsCurve.getPointAt(e.x):false;
            const position = CameraCurve.getPointAt(e.x);
            this.position.copy(position);
            if (Controlsposition) {
                controls.target.copy({
                    x: Controlsposition.x,
                    y: Controlsposition.y,
                    z: Controlsposition.z,
                });
            } else {
                controls.target = new THREE.Vector3(0, 0, 0)
            }
        })
        cameraTween.start();
    }
    moveto(controls,selectObject,objectName,speed = 4000){
        const selectObjectXYZ = selectObject.localToWorld(new THREE.Vector3());
        // // 简略版
        // var cameraset = {
        //     focus: {
        //         x: selectObjectXYZ.x,
        //         y: selectObjectXYZ.y,
        //         z: selectObjectXYZ.z,
        //     },
        //     place: {
        //         x:selectObjectXYZ.x,
        //         y:selectObjectXYZ.y,
        //         z:selectObjectXYZ.z,
        //     },
        // };
        // var modelpostions = cameraset.place;
        // var camerafocus = cameraset.focus;
        // controls.target = new THREE.Vector3(camerafocus.x,camerafocus.y,camerafocus.z)
        // var tween_camera_foucs = new TWEEN.Tween(controls.target)
        //     .to(camerafocus, speed)
        //     .easing(TWEEN.Easing.Quadratic.Out);
        // tween_camera_foucs.start();
    
        // var tween_camera = new TWEEN.Tween(this.position)
        //     .to(modelpostions, speed)
        //     .easing(TWEEN.Easing.Quadratic.Out);
        // tween_camera.start();


        // // 特殊版本
        // var mx = selectObjectXYZ.x;
        // var mz = selectObjectXYZ.z;
        // var cx = this.position.x;
        // var cz = this.position.z;
        // var res_x = mx > cx ? mx - cx : cx - mx;
        // var res_z = mz > cz ? mz - cz : cz - mz;
        // var cameraset = {
        //     focus: {
        //         x: selectObjectXYZ.x,
        //         y: selectObjectXYZ.y,
        //         z: selectObjectXYZ.z,
        //     },
        //     place: {
        //         x:
        //             selectObject.userData.name.indexOf(objectName) > -1
        //                 ? res_x > res_z
        //                     ? selectObjectXYZ.x > this.position.x
        //                         ? selectObjectXYZ.x - 1
        //                         : selectObjectXYZ.x + 1
        //                     : selectObjectXYZ.x
        //                 : (this.position.x - selectObjectXYZ.x) / 2,
        //         y:
        //             selectObject.userData.name.indexOf(objectName) > -1
        //                 ? selectObjectXYZ.y + 0.1
        //                 : (this.position.y - selectObjectXYZ.y) / 2,
        //         z:
        //             selectObject.userData.name.indexOf(objectName) > -1
        //                 ? res_x < res_z
        //                     ? selectObjectXYZ.z > this.position.z
        //                         ? selectObjectXYZ.z - 1
        //                         : selectObjectXYZ.z + 1
        //                     : selectObjectXYZ.z
        //                 : (this.position.z - selectObjectXYZ.z) / 2,
        //     },
        // };
        // var modelpostions = cameraset.place;
        // var camerafocus = cameraset.focus;
        // var tween_camera_foucs = new TWEEN.Tween(controls.target)
        //     .to(camerafocus, 2000)
        //     .easing(TWEEN.Easing.Quadratic.Out);
        // // .onUpdate((e) => {});
        // tween_camera_foucs.start();
    
        // var tween_camera = new TWEEN.Tween(this.position)
        //     .to(modelpostions, 2000)
        //     .easing(TWEEN.Easing.Quadratic.Out);
        // // .onUpdate(() => {});
        // tween_camera.start();
    }
    resize(resolution) {
      this.aspect = resolution.x / resolution.y;
      this.updateProjectionMatrix();
    }
}