<template>
  <div>
    {{ testvalue }}
  </div>
</template>

<script>
import testWorker from "../../../packages/webworker/testworker.worker";
export default {
  data() {
    return {
      testvalue: "000000",
    };
  },
  mounted() {
    const worker = new testWorker();
    worker.postMessage(Math.PI * 1.1);
    worker.onmessage = function (e) {
      
      console.log("onmessage",e.data)
    };
  },
};
</script>

<style>
</style>