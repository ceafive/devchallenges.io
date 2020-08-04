<template>
  <div class="xl:col-span-4 text-white bg-secondary">
    <div
      class="relative flex flex-col justify-between items-center h-full max-h-full p-8"
    >
      <div
        v-if="isFetching"
        class="flex flex-col justify-center items-center w-full h-screen"
      >
        <half-circle-spinner
          :animation-duration="2000"
          :size="100"
          color="#3C47E9"
        />
      </div>

      <div v-else>
        <div class="flex justify-end w-full font-black">
          <button
            @click="$emit('toggle-unit', true)"
            class="bg-textPrimary font-black text-white text-xl p-1 overflow-hidden focus:outline-none rounded-full mr-2"
          >
            <span><sup>o</sup>C</span>
          </button>
          <button
            @click="$emit('toggle-unit', false)"
            class="bg-textPrimary font-black text-white text-xl p-1 overflow-hidden focus:outline-none rounded-full"
          >
            <span><sup>o</sup>F</span>
          </button>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <weather-card
            v-for="fiveDayForecast in weatherData.fiveDayForecast"
            :key="fiveDayForecast.id"
            :weather-data="fiveDayForecast"
            :current-date="weatherData.date"
            :is-celsius="isCelsius"
          />
        </div>

        <div class="w-full">
          <h1 class="text-3xl font-semibold tracking-wide mt-2 mb-2">
            Today's Highlights
          </h1>

          <div class="grid lg:grid-cols-2 gap-8 my-2">
            <highlights-card>
              <template v-slot:header>
                <h1 class="text-2xl tracking-tight leading-none">
                  Wind Status
                </h1>
              </template>
              <h1 class="font-bold text-6vw tracking-tight leading-none">
                {{ highlightsCardData.wind.speed
                }}<span class="font-normal text-5xl"> mph</span>
              </h1>
              <template v-slot:footer>
                <div class="flex justify-between w-1/10 items-center">
                  <svg
                    class="fill-current h-10 w-10 mr-4"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z"
                      style="fill:none;stroke:#6E707A;stroke-miterlimit:10;stroke-width:32px"
                    />
                    <path
                      d="M350.67,150.93l-117.2,46.88a64,64,0,0,0-35.66,35.66l-46.88,117.2a8,8,0,0,0,10.4,10.4l117.2-46.88a64,64,0,0,0,35.66-35.66l46.88-117.2A8,8,0,0,0,350.67,150.93ZM256,280a24,24,0,1,1,24-24A24,24,0,0,1,256,280Z"
                    />
                  </svg>
                  <h1 class="tracking-tight leading-none text-2xl">
                    {{ highlightsCardData.wind.direction }}
                  </h1>
                </div>
              </template>
            </highlights-card>

            <highlights-card>
              <template v-slot:header>
                <h1 class="text-2xl tracking-tight leading-none">
                  Humidity
                </h1>
              </template>
              <h1 class="font-bold text-6vw tracking-tight leading-none">
                {{ highlightsCardData.humidity
                }}<span class="font-normal text-5xl">%</span>
              </h1>
              <template v-slot:footer>
                <div class="bg-white w-full h-2 rounded overflow-hidden">
                  <div
                    class="bg-yellow-500"
                    :style="{
                      height: '100%',
                      width: highlightsCardData.humidity + '%'
                    }"
                  ></div>
                </div>
              </template>
            </highlights-card>

            <highlights-card>
              <template v-slot:header>
                <h1 class="text-2xl tracking-tight leading-none">
                  Visibility
                </h1>
              </template>
              <h1 class="font-bold text-6vw tracking-tight leading-none">
                {{ highlightsCardData.visibility
                }}<span class="font-normal text-6xl"> miles</span>
              </h1>
            </highlights-card>

            <highlights-card>
              <template v-slot:header>
                <h1 class="text-2xl tracking-tight leading-none">
                  Air Pressure
                </h1>
              </template>
              <h1 class="font-bold text-6vw tracking-tight leading-none">
                {{ highlightsCardData.airPressure
                }}<span class="font-normal text-6xl"> mb</span>
              </h1>
            </highlights-card>
          </div>
        </div>
        <p class="text-center text-textPrimary mt-0">
          <a class="text-red-500" href="https://github.com/ceafive/"
            >Castro Agbo</a
          >
          @ DevChallenges.io
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { HalfCircleSpinner } from "epic-spinners";
import WeatherCard from "./WeatherCard";
import HighlightsCard from "./HighlightsCard";
export default {
  components: {
    "half-circle-spinner": HalfCircleSpinner,
    "weather-card": WeatherCard,
    "highlights-card": HighlightsCard
  },
  props: {
    isCelsius: {
      type: Boolean,
      default: true
    },
    isFetching: {
      type: Boolean,
      default: false
    },
    weatherData: {
      type: Object,
      required: true
    }
  },
  computed: {
    highlightsCardData() {
      const { todaysWeather } = this.weatherData;
      return {
        wind: {
          speed: todaysWeather.wind_speed.toFixed(),
          direction: todaysWeather.wind_direction_compass
        },
        humidity: todaysWeather.humidity,
        visibility: todaysWeather.visibility.toFixed(1),
        airPressure: todaysWeather.air_pressure.toFixed()
      };
    }
  }
};
</script>

<style scoped></style>
