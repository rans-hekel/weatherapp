<template>
<main class="container text-white">
  <div class="pt-4 mb-8 relative">
    <input type="text" @input="getSearchResults" v-model="searchQuery" class="py-2 px-6 bg-weather-secondary w-full rounded-lg focus:outline-none focus:shadow-[0_0_0_3px_#0055ff]" placeholder="Cari Kota Atau Tempat">
    <ul class="absolute bg-weather-accent text-white top-[66px]  py-2 px-3 w-full shadow-md rounded-lg max-h-[400px] overflow-y-scroll" v-if="mapboxSearchResults">
      <p class="py-2" v-if="searchError">
          Ada Kesalahan Pada Pencarian, Coba Cari Kembali
        </p>
        <p
          class="py-2"
          v-if="!searchError && mapboxSearchResults.length === 0"
        >
          Tidak Ada Hasil Pencarian Untuk "{{ searchQuery }}"
        </p>
    <li v-for="searchResult in mapboxSearchResults" :key="searchResult.id" class="py-2 cursor-pointer" @click="previewCity(searchResult)">{{ searchResult.place_name }}</li></ul>
  </div>
  <div class="flex flex-col gap-4">
    <Suspense>
      <CityList />
      <template #fallback>
        <CityCardSkeleton v-for="n in 3" :key="n" />
      </template>
    </Suspense>
  </div>
</main>

</template>



<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import CityList from '@/components/CityList.vue';
import CityCardSkeleton from '@/components/CityCardSkeleton.vue';

const router = useRouter();
const searchQuery = ref('');
const searchError = ref(null);
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const mapboxAPIKey =
  "pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q";



const previewCity = (searchResult) => {
  const [city, state] = searchResult.place_name.split(',');
  router.push({
    name: 'cityView',
    params: { state: state.replaceAll(' ', ''), city: city },
    query: { lat: searchResult.geometry.coordinates[1], lng: searchResult.geometry.coordinates[0], preview: true },
  })
}

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout( async () => {
    if (searchQuery.value !== '') {
      try {     
        const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        );
        mapboxSearchResults.value = result.data.features;
      } catch (error) {
        searchError.value
      }
      return;
    }
    mapboxSearchResults.value = null;
    
  },300)
}
</script>