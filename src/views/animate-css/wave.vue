<template>
    <div style="height:100%;width:100%;background: #0A212E;">
        <div class="waves">
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.waves {
  position: relative;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
//   margin-left: -25px;
//   margin-top: -25px;
  border-radius: 50%;
  -webkit-backface-visibility: hidden;
}

.wave, .waves:before, .waves:after {
  position: absolute;
  background: white;
  margin-left: -12px;
  margin-top: -12px;
  width: 50px;
  height: 50px;
  content: "";
  display: block;
  border-radius: 50%;
  -webkit-backface-visibility: hidden;
}

.waves:before {
  animation: wave-animate 3s infinite ease-out;
}

.waves:after {
  opacity: 0;
  animation: wave-animate 3s 1.5s infinite ease-out;
}

@keyframes wave-animate {
  0% {
    transform: scale(0);
    opacity: 1;
    transform-origin: center;
  }
  100% {
    transform: scale(3);
    opacity: 0;
    transform-origin: center;
  }
}
</style>