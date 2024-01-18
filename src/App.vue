<template>
<div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
  <SiteNavigation />
  <RouterView v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</div>

</template>

<script>
import { RouterView } from 'vue-router'
import SiteNavigation from './components/SiteNavigation.vue';
export default {
    components: { SiteNavigation }
}
</script>

<style scoped>
.page-enter-active {
  transition: 600ms ease all;
}

.page-enter-from {
  opacity: 0;
}
</style>