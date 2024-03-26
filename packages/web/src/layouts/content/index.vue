<template>
  <a-layout-content>
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component :is="Component" :key="route.name" v-if="$route.meta" />
      </keep-alive>
      <component :is="Component" :key="route.name" v-if="!$route.meta" />
    </router-view>
  </a-layout-content>
</template>

<style lang="scss"></style>
