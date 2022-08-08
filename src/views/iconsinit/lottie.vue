<template>
  <div>
        <LottieIcon 
        :options="defaultOptions" 
        :height="100" 
        :width="100" 
        @click="showmodel"/>
        <LottieIcon 
        :options="defaultOptions1" 
        :height="500" 
        :width="500" />
  </div>
</template>

<script>
import jsonData from '../../../public/svg/Github/github.json';
import jsonData1 from '../../../public/svg/Loading V2/loadingV2.json';
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
        }
    },
    methods:{
        showmodel(e){

        }
    }
}
</script>

<style>

</style>