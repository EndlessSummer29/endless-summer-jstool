import * as THREE from 'three';
import TWEEN from "@tweenjs/tween.js";
export default class C_Object3DControls {
    constructor(){

    }
    ControlLights(Object3D,SetOptions,speed=1000){
        var OLDRectAreaLightIntensity = Number(Object3D[0].intensity);
        var oldIntensity = {
            x:OLDRectAreaLightIntensity
        };
        var newIntensity = {
            x:SetOptions.intensity
        }
        var colors = Object.prototype.hasOwnProperty.call(SetOptions,'colors')
        var intensity = Object.prototype.hasOwnProperty.call(SetOptions,'intensity')
        console.log(
            "调亮",intensity?SetOptions.intensity:'',
            "调色",colors?SetOptions.colors:''
        )
        var RectAreaLightTWEEN = new TWEEN.Tween(oldIntensity)
        .to(newIntensity,speed)
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .onUpdate((e)=>{
            for (const key in Object3D) {
                if(intensity){
                    Object3D[key].intensity = e.x
                }
                if(colors){
                    Object3D[key].color.set(SetOptions.colors)
                }
            }
        })
        RectAreaLightTWEEN.start();
    }
    test(x){
        return (x - 1)*(29/1) + 1
    }
    /**
     * 数字区间转换
     * @param {Number} num 需要转换的数字
     * @param {Number} oldMinNum 需要转换数字的最小区间
     * @param {Number} oldMaxNum 需要转换数字的最大区间
     * @param {Number} newMinNum 转换后的最小区间默认为1
     * @param {Number} newMaxNum 转换后的最大区间默认为30
     * @returns 
     */
    NumberRange(num,oldMinNum,oldMaxNum,newMinNum=1,newMaxNum=30,int=false){
        if(int){
            return ((((num - oldMinNum) * (newMaxNum - newMinNum)) / (oldMaxNum - oldMinNum)) + newMinNum)^0
        }else{
            // return (num - (oldMaxNum-oldMinNum))*((newMaxNum-newMinNum)/(oldMaxNum-oldMinNum)) + (oldMaxNum-oldMinNum)
            return ((((num - oldMinNum) * (newMaxNum - newMinNum)) / (oldMaxNum - oldMinNum)) + newMinNum)^0
        }
    }
}