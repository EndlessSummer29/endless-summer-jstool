import LottieIcon from './src/lottie.vue';

/* istanbul ignore next */
LottieIcon.install = function(Vue) {
  Vue.component(LottieIcon.name, LottieIcon);
};

export default LottieIcon;