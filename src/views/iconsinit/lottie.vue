<template>
  <div style="overflow-y: scroll;height:100%;">
        <div @click="setp">
            点击
        </div>
        <div @click="setp1">
            点击1
        </div>
        <LottieIcon 
        :options="defaultOptions3" 
        :height="500" 
        :width="500" 
        @animCreated="showmodel"/>
        <LottieIcon 
        :options="defaultOptions" 
        :height="100" 
        :width="100" />
        <LottieIcon 
        :options="defaultOptions2" 
        :height="500" 
        :width="500" />
        <LottieIcon 
        :options="defaultOptions1" 
        :height="500" 
        :width="500" />
  </div>
</template>

<script>
import jsonData from '../../../public/svg/Github/github.json';
import jsonData1 from '../../../public/svg/Loading V2/loadingV2.json';
import jsonData2 from '../../../public/svg/cp/107653-trophy.json';
import jsonData3 from '../../../public/svg/testae/data.json';
export default {
    data(){
        return {
            defaultOptions:{
                // animationData:'https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json',
                // animationData:'https://raw.githubusercontent.com/thesvbd/Lottie-examples/master/assets/animations/skip-forward.json',
                animationData:jsonData,
            },
            defaultOptions1:{
                animationData:jsonData1,
            },
            defaultOptions2:{
                animationData:jsonData2,
            },
            defaultOptions3:{
                animationData:jsonData3,
            },
            lottie:null,
        }
    },
    methods:{
        showmodel(e){
            this.lottie = e
            console.log(e)
        },
        setp(){
            // console.log(this.lottie)
            this.lottie.goToAndStop(40,false)
            // this.lottie.goToAndPlay(40,true)
            // this.lottie.playSegments(40,true)
        },
        setp1(){
            this.lottie.play()
        }
    }
}
</script>

<style>
</style>