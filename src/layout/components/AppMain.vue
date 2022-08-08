<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  // overflow-y: scroll;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
.app-main::-webkit-scrollbar {
  width: 6px;
  height: 8px
}

.app-main::-webkit-scrollbar-track-piece {
  background: none;
}

.app-main::-webkit-scrollbar-thumb {
  /* background-color: rgba(182, 182, 182, 0.5);
  border-radius: 8px; */
  background-color: #b7b7b7;
  border-radius: 4px;
}

.app-main::-webkit-scrollbar-thumb:vertical {
  border-radius: 4px;
}

.app-main::-webkit-scrollbar-thumb:hover {
  background-color: rgba(177, 177, 177, 0.8)
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
