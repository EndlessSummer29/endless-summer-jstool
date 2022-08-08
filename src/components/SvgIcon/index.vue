<template>
<div class="i-iconfont" style="display:inline-block;height:100%;">
  <div style="height:100%;display:flex;justify-content: center;
    align-items: center;">
      <i :class="'el-icon-zoulu'+' iconfont'" :style="{fontSize:fontsize,}"></i>
  </div>
</div>
  <!-- <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg> -->
</template>

<script>
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
// import { isExternal } from '@/utils/validate'

export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    fontsize:{
      type:String,
      default:'20px'
    }
  },
  computed: {
    // isExternal() {
    //   return isExternal(this.iconClass)
    // },
    // iconName() {
    //   return `#icon-${this.iconClass}`
    // },
    // svgClass() {
    //   if (this.className) {
    //     return 'svg-icon ' + this.className
    //   } else {
    //     return 'svg-icon'
    //   }
    // },
    // styleExternalIcon() {
    //   return {
    //     mask: `url(${this.iconClass}) no-repeat 50% 50%`,
    //     '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
    //   }
    // }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
  
}
.i-iconfont .iconfont{
  margin:0 !important;
}
</style>
