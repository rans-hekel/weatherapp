<template>
<div>
    <Suspense>
        <AsyncCityView />
        <template #fallback>
            <div>Loading...</div>
        </template>
    </Suspense>
</div>

</template>


<script setup>
import AsyncCityView from '@/components/AsyncCityView.vue';



</script>