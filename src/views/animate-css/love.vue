<template>
  <div class="controls__item like active">
    <svg width="397" height="470" version="1">
      <path
        class="main"
        d="M211 226c9-9 21-14 34-14 29 0 50 26 50 54 0 34-53 77-78 95-5 3-7 3-12 0-25-18-78-61-78-95 0-28 21-54 50-54 13 0 25 5 34 14z"
        style="transform: scale(0)"
      ></path>
      <path
        class="second"
        d="M211 226c9-9 21-14 34-14 29 0 50 26 50 54 0 34-53 77-78 95-5 3-7 3-12 0-25-18-78-61-78-95 0-28 21-54 50-54 13 0 25 5 34 14z"
        style="transform: scale(1)"
      ></path>
      <path
        class="line line1"
        d="M171 294c-43-12-106-47-111-62-18-52 0-125 0-125"
      ></path>
      <path
        class="line line2"
        d="M197 244c-11-31-25-75-32-119-12-79-5-125-5-125"
      ></path>
      <path
        class="line line3"
        d="M258 251c23-18 49-43 61-67 25-50 19-74 13-153"
      ></path>
      <path
        class="line line4"
        d="M246 304c22 15 54 34 79 37 46 7 58-53 62-88s-8-96-8-96"
      ></path>
      <path
        class="line line5"
        d="M217 330c6 36 23 85 62 111 69 46 117-56 117-56"
      ></path>
      <path
        class="line line6"
        d="M204 330c-9 46-25 112-46 134-34 35-66-111-66-111"
      ></path>
      <path
        class="line line7"
        d="M191 309c-24 25-69 63-108 74C15 402 0 234 0 234"
      ></path>
    </svg>
    <img
      class="heart heart1"
      :src="heart"
      width="40"
      alt=""
      style="
        display: block;
        transform: translateX(60px) translateY(107px) scale(0);
      "
    />
    <img
      class="heart heart2"
      :src="heart"
      width="40"
      alt=""
      style="
        display: block;
        transform: translateX(160px) translateY(0px) scale(0);
      "
    />
    <img
      class="heart heart3"
      :src="heart"
      width="40"
      alt=""
      style="
        display: block;
        transform: translateX(332px) translateY(31px) scale(0);
      "
    />
    <img
      class="heart heart4"
      :src="heart"
      width="40"
      alt=""
      style="
        display: block;
        transform: translateX(379px) translateY(157px) scale(0);
      "
    />
    <img
      class="heart heart5"
      :src="heart"
      width="40"
      alt=""
      style="
        display: block;
        transform: translateX(396px) translateY(385px) scale(0);
      "
    />
    <img
      class="heart heart6"
      :src="heart"
      width="40"
      alt=""
      style="
        display: block;
        transform: translateX(92px) translateY(353px) scale(0);
      "
    />
    <img
      class="heart heart7"
      :src="heart"
      width="40"
      alt=""
      style="
        display: block;
        transform: translateX(0px) translateY(234px) scale(0);
      "
    />
  </div>
</template>

<script>
export default {
    data(){
        return {
            heart:require('../../../public/svg/dating-hearts.svg')
        }
    }
};
</script>

<style lang="scss" scoped>
.like {
    margin-top: -38px;
    position: relative;
    svg {
        transition: all .2s ease-in-out;
        position: relative;
        overflow: visible;
        z-index: 2;
        cursor: pointer;
    }
    .main {
        stroke: #c50000;
        stroke-width: 5px;
        fill: #ffe2ea;
        -webkit-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
    }
    .second {
        fill: #c50000;
        -webkit-transform: scale(0);
        transform: scale(0);
        -webkit-transform-origin: 53% 61% 0px;
        transform-origin: 53% 61% 0px;
    }
    .line {
        fill: none;
    }
}
</style>