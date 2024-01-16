<template>
   <header class="sticky top-0 bg-weather-secondary shadow-lg">
       <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
        <RouterLink :to="{name: 'home'}">
            <div class="flex items-center gap-3 flex-1">
                <i class="fa-solid fa-sun text-2xl"></i>
                <p class="text-2xl">Cuaca Hari Ini</p>
            </div>
        </RouterLink>
        <div class="flex gap-3 flex-1 justify-end">
            <i @click="toggleModal" class="fa-solid fa-circle-info text-xl hover:text-weather-primary duration-150 cursor-pointer"></i>
            <i class="fa-solid fa-plus text-xl hover:text-weather-primary duration-150 cursor-pointer" @click="addCity" v-if="route.query.preview">
            </i>
        </div>
        <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
            <div class="text-black">
          <h1 class="text-2xl mb-1">Tentang :</h1>
          <p class="mb-4">
            Ini Adalah aplikasi yang berfungsi untuk mengetahui
            cuaca di kota tertentu
          </p>
          <h2 class="text-2xl">Fitur :</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Cari kota yang ingin anda tahu cuacanya
            </li>
            <li>
              Pilih kota yang ingin anda tahu cuacanya
            </li>
            <li>
              Tambahkan kota ke daftar favorit anda
            </li>
          </ol>

          <h2 class="text-2xl">Menghapus favorit :</h2>
          <p>
            Untuk menghapus favorit, klik tombol hapus
            pada kota favorit
          </p>
        </div>
        </BaseModal>
       </nav>
   </header>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import BaseModal from "./BaseModal.vue";

const savedCities = ref([]);
const route = useRoute();
const router = useRouter();
const addCity = () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }
  const locationObject = {
    id: new Date().getTime(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    }
  }

  savedCities.value.push(locationObject);
  localStorage.setItem("savedCities", JSON.stringify(savedCities.value));

  let query = Object.assign({}, route.query);
  delete query.preview;
  router.replace({ query });
}
const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>
