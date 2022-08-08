import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
export default class C_GUI extends GUI {
    constructor(params) {
        super(params);
        this.Folder = {};
        this.nowname = '';
    }
    controlName(name){
        this.nowname = name;
        this.Folder[name] = this['addFolder'](name);
        return this;
    }
    controlCamera() {
        const cameraControl = this['addFolder']('相机控制测试');
        console.log('cameraControl',cameraControl);
    }
    controlLight(lightcollection,params,name,start=0.1,end=10,step=0.1) {
        if(name == 'color'){
            this.Folder[this.nowname].addColor(params, name).onChange(function (val) {
                for (const key in lightcollection) {
                    lightcollection[key][name].setHex(val);
                }
            });
        }else{
            this.Folder[this.nowname].add(params, name, start, end).step(step).onChange(function (val) {
                if (name == 'x'||name == 'y'||name == 'z') {
                    for (const key in lightcollection) {
                        lightcollection[key].position[name] = val;
                    }
                }else{
                    for (const key in lightcollection) {
                        lightcollection[key][name] = val;
                    }
                }
            });
        }
    }
}