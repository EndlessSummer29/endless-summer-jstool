import MapSearch from './src/map-search';

/* istanbul ignore next */
MapSearch.install = function(Vue) {
  Vue.component(MapSearch.name, MapSearch);
};

export default MapSearch;