import DestinyChild from './src/destinychild.vue';

/* istanbul ignore next */
DestinyChild.install = function(Vue) {
  Vue.component(DestinyChild.name, DestinyChild);
};

export default DestinyChild;