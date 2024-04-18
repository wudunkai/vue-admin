<script setup lang="ts">
const app = useThemeColorStore()
</script>

<template>
  <div class="theme-color" @click="app.toggleDarkMode">
    <div class="dark-switch-inner"></div>
    <LightIcon class="icon" />
    <DarkIcon class="icon" />
  </div>
</template>

<style lang="scss">
.theme-color {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  width: 50px;
  height: 26px;
  margin: 0 auto;
  padding: 0 6px;
  border-radius: 30px;
  background-color: #151515;
  cursor: pointer;
  border: 1px solid transparent;
  .dark-switch-inner {
    position: absolute;
    z-index: 1;
    width: 18px;
    height: 18px;
    transition:
      transform 0.5s,
      background-color 0.5s;
    border-radius: 50%;
    background-color: #fff;
    will-change: transform;
  }
  .icon {
    width: 1rem;
    height: 1rem;
    color: $primary;
    display: inline-block;
    overflow: hidden;
    fill: currentcolor;
    vertical-align: -0.15em;
  }
}
html[data-dark='dark'] {
  // 主题按钮样式
  .theme-color {
    border-color: #c4bcbc;

    .dark-switch-inner {
      transform: translateX(calc(100% + 2px));
    }
  }
}
</style>
