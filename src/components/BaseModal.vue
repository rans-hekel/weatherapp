<template>
    <Teleport to="body">
        <Transition name="slide-fade">
            <div v-show="modalActive" class="absolute w-full bg-black bg-opacity-50 h-screen top-0 left-0 flex justify-center px-8">
                <Transition name="slide-fade">
                    <div v-if="modalActive" class="p-4 bg-white self-start mt-32 max-w-screen-md">
                        <slot />
                        <button class="text-white mt-8 bg-weather-primary py-2 px-6" @click="$emit('close-modal')">Close</button>
                    </div>
                </Transition>
            </div>
        </Transition>
        </Teleport>
</template>


<script setup>
defineEmits(['close-modal'])
defineProps({
    modalActive: {
        type: Boolean,
        default: false
    }
})
</script>

<style scoped>/*
Enter and leave animations can use different
durations and timing functions.
*/
.slide-fade-enter-active {
transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
transform: translateY(20px);
opacity: 0;
}
</style>