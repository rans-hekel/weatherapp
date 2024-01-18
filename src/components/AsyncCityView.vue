<template>
<div class="flex flex-col flex-1 items-center text-white">
    <!-- banner start -->
    <div v-if="route.query.preview" class="text-white p-4 bg-weather-accent w-full text-center">
    <p>
    Click + untuk tambahkan ke favorit, Enjoy! #Rangga
    </p>
    </div>
    <div v-if="route.query.id" class="text-white p-4 bg-green-500 w-full text-center">
    <p>Kota Ini Adalah Kota Favoritmu #Rangga
    </p>
    </div>
    <!-- banner end -->
    <!-- cuaca start -->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p class="text-sm mb-12">
        {{
          new Date(weatherData.currentTime).toLocaleDateString(
            "id-ID",
            {
              weekday: "short",
              day: "2-digit",
              month: "long",
            }
          )
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString(
            "id-ID",
            {
              timeStyle: "short",
            }
          )
        }}
      </p>
      <p class="text-8xl mb-8">
        {{ FahrenheitToCelsius(Math.round(weatherData.current.temp)) }}&deg;
      </p>
      <p>
        Berawan
        {{ FahrenheitToCelsius(Math.round(weatherData.current.feels_like)) }}&deg;
      </p>
      <img
        class="w-[150px] h-auto"
        :src="
          `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
        "
        alt=""
      />
    </div>
    <!-- cuaca end -->
    
    <hr class="border-white border-opacity-10 border w-full" />

    <!-- hourly weather start -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Cuaca Per Jam</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div
            v-for="hourData in weatherData.hourly"
            :key="hourData.dt"
            class="flex flex-col gap-4 items-center"
          >
            <p class="whitespace-nowrap text-md">Pukul 
              {{
                new Date(
                  hourData.currentTime
                ).toLocaleTimeString("id-ID", {
                  hour: "numeric",
                  
                })
              }}
            </p>
            <img
              class="w-auto h-[50px] object-cover"
              :src="
                `http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`
              "
              alt=""
            />
            <p class="text-xl">
              {{ FahrenheitToCelsius(hourData.temp) }}&deg;
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- hourly weather end -->
    <hr class="border-white border-opacity-10 border w-full" />
    <!-- cuaca mingguan start -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Rekaman Dalam 7 Hari</h2>
        <div
          v-for="day in weatherData.daily"
          :key="day.dt"
          class="flex items-center"
        >
          <p class="flex-1">
            {{
              new Date(day.dt * 1000).toLocaleDateString(
                "id-ID",
                {
                  weekday: "long",
                }
              )
            }}
          </p>
          <img
            class="w-[50px] h-[50px] object-cover"
            :src="
              `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
            "
            alt="example"
          />
          <div class="flex gap-2 flex-1 justify-end">
            <p>Tertinggi: {{ FahrenheitToCelsius(Math.round(day.temp.max)) }} <span class="text-sm">°C</span>
            </p>
            <p>Terendah: {{ FahrenheitToCelsius(Math.round(day.temp.min)) }} <span class="text-sm">°C</span> </p>
          </div>
        </div>
      </div>
    </div>

    <!-- cuaca mingguan end -->
    <!-- hapus kota favorit start -->
    <div v-if="route.query.id" class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500" @click="removeCity">
      <i class="fa-solid fa-trash" >
      </i>
      <p>Hapus Kota favorit</p>
    </div>

    <!-- hapus kota favorit end-->


</div>
</template>


<script setup>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const FahrenheitToCelsius = (temp) => {
  return (((temp - 32) * 5) / 9).toFixed(0);
}
const route = useRoute();
const router = useRouter();
const getWeatherData = async () => {
    try {
        const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`)
         // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;

    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime =
        utc + 1000 * weatherData.data.timezone_offset;
    });

    await new Promise(resolve => setTimeout(resolve, 1000))

    return weatherData.data;
    } catch (error) {
        console.log(error);
    }

}
const weatherData = await getWeatherData();
console.log(weatherData);

const removeCity = () => {
    const current= JSON.parse(localStorage.getItem("savedCities"));
    const filteredCity = current.filter((city) => city.id !== route.query.id);
    localStorage.setItem("savedCities", JSON.stringify(filteredCity));
    router.push({ name: "home" });
}

</script>