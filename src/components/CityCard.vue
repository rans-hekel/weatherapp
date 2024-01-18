<template>
    <div class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer">
        <div class="flex flex-col flex-1">
            <h2 class="text-3xl">{{ city.city }}</h2>
            <h3 class="text-2xl">{{ city.state }}</h3>
        </div>
        <div class="flex flex-col gap-2">
            <p class="text-3xl self-end">{{ FahrenheitToCelsius(Math.round(city.weather.main.temp)) }}&deg;C</p>

        <div class="flex gap-2">
            <span class="text-xs">
                Tertinggi : {{ FahrenheitToCelsius(Math.round(city.weather.main.temp_max)) }}&deg;C
            </span>
            <span class="text-xs">
                Terendah : {{ FahrenheitToCelsius(Math.round(city.weather.main.temp_min)) }}&deg;C
            </span>
        </div>
    </div>
    </div>
</template>

<script setup>
defineProps({
    city: Object,
    default: () => ({})
})
const FahrenheitToCelsius = (temp) => {
  return (((temp - 32) * 5) / 9).toFixed(0);
}
</script>