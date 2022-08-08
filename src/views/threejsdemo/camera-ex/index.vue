<template>
  <div>

  </div>
</template>

<script>
import C_Object3DControls from '../../../../packages/utils/threejs/originalScript/Object3DControls'
export default {
    created(){
        var a = new C_Object3DControls()
        console.log(a.test(1))
    }
}
</script>

<style>

</style>