<script setup lang="ts">
const app = useThemeColorStore()
</script>

<template>
  <div class="theme-color" @click="app.toggleDarkMode">
    <div class="dark-switch-inner"></div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon light-icon"
      viewBox="0 0 1024 1024"
      fill="currentColor"
      aria-label="light icon"
      style="display: block"
    >
      <path
        d="M952 552h-80a40 40 0 0 1 0-80h80a40 40 0 0 1 0 80zM801.88 280.08a41 41 0 0 1-57.96-57.96l57.96-58a41.04 41.04 0 0 1 58 58l-58 57.96zM512 752a240 240 0 1 1 0-480 240 240 0 0 1 0 480zm0-560a40 40 0 0 1-40-40V72a40 40 0 0 1 80 0v80a40 40 0 0 1-40 40zm-289.88 88.08-58-57.96a41.04 41.04 0 0 1 58-58l57.96 58a41 41 0 0 1-57.96 57.96zM192 512a40 40 0 0 1-40 40H72a40 40 0 0 1 0-80h80a40 40 0 0 1 40 40zm30.12 231.92a41 41 0 0 1 57.96 57.96l-57.96 58a41.04 41.04 0 0 1-58-58l58-57.96zM512 832a40 40 0 0 1 40 40v80a40 40 0 0 1-80 0v-80a40 40 0 0 1 40-40zm289.88-88.08 58 57.96a41.04 41.04 0 0 1-58 58l-57.96-58a41 41 0 0 1 57.96-57.96z"
      ></path>
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon dark-icon"
      viewBox="0 0 1024 1024"
      fill="currentColor"
      aria-label="dark icon"
      style="display: block"
    >
      <path
        d="M524.8 938.667h-4.267a439.893 439.893 0 0 1-313.173-134.4 446.293 446.293 0 0 1-11.093-597.334A432.213 432.213 0 0 1 366.933 90.027a42.667 42.667 0 0 1 45.227 9.386 42.667 42.667 0 0 1 10.24 42.667 358.4 358.4 0 0 0 82.773 375.893 361.387 361.387 0 0 0 376.747 82.774 42.667 42.667 0 0 1 54.187 55.04 433.493 433.493 0 0 1-99.84 154.88 438.613 438.613 0 0 1-311.467 128z"
      ></path>
    </svg>
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
