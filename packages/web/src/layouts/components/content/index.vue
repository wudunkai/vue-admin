<template>
  <a-layout-content>
    <RouterView>
      <template #default="{ Component }">
        <component :is="Component" />
      </template>
    </RouterView>
  </a-layout-content>
</template>

<style lang="scss"></style>
