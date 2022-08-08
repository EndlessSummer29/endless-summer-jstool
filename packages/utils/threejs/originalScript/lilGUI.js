import GUI from 'lil-gui';
export default class C_GUI extends GUI {
    constructor(params) {
        super(params);
        this.Folder = {};
        this.nowname = '';
    }
    renderer(renderer){
        const rendererGUI = this.addFolder( 'Renderer' );
        rendererGUI.add(renderer, 'toneMappingExposure', 0, 2);

    }
    control_light(lightstate,light){
        const lightGUI = this.addFolder( 'Light' );
        lightGUI.add(lightstate, 'directIntensity', 0, 100) // TODO(#116)
        lightGUI.addColor(lightstate, 'directColor')
        lightGUI.add(lightstate, 'ambientIntensity', 0, 2).onChange(res=>{
            console.log(res)
            light.intensity = res
        })
        lightGUI.addColor(lightstate, 'ambientColor')
    }
    changetest(lightstate,light){
        light.intensity = lightstate.ambientIntensity
    }
    // controlName(name){
    //     this.nowname = name;
    //     this.Folder[name] = this['addFolder'](name);
    //     return this;
    // }
    // controlCamera() {
    //     const cameraControl = this['addFolder']('相机控制测试');
    //     console.log('cameraControl',cameraControl);
    // }
    // controlLight(lightcollection,params,name,start=0.1,end=10,step=0.1) {
    //     if(name == 'color'){
    //         this.Folder[this.nowname].addColor(params, name).onChange(function (val) {
    //             for (const key in lightcollection) {
    //                 lightcollection[key][name].setHex(val);
    //             }
    //         });
    //     }else{
    //         this.Folder[this.nowname].add(params, name, start, end).step(step).onChange(function (val) {
    //             if (name == 'x'||name == 'y'||name == 'z') {
    //                 for (const key in lightcollection) {
    //                     lightcollection[key].position[name] = val;
    //                 }
    //             }else{
    //                 for (const key in lightcollection) {
    //                     lightcollection[key][name] = val;
    //                 }
    //             }
    //         });
    //     }
    // }
}