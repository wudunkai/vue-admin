<template>
  <a-layout-content>
    <ScrollContainer>
      <RouterView>
        <template #default="{ Component }">
          <component :is="Component" />
        </template>
      </RouterView>
    </ScrollContainer>
  </a-layout-content>
</template>

<style lang="scss"></style>
