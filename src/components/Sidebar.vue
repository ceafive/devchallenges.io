<template>
  <div class="bg-primary text-white">
    <div
      v-if="isFetching"
      class="flex flex-col justify-center items-center w-full h-screen"
    >
      <half-circle-spinner
        :animation-duration="2000"
        :size="50"
        color="#3C47E9"
      />
    </div>
    <div v-else class="w-full h-screen">
      <sidebar-main
        v-if="!isOpenSearch"
        @toggle-search-box="onToggleSearchBox"
        :todays-data="weatherData.todaysWeather"
        :is-celsius="isCelsius"
      />
      <sidebar-search
        v-else
        :recent-searches="recentSearches"
        :error="error"
        @add-location="onAddLocation"
        @toggle-search-box="onToggleSearchBox"
        @start-weather-search="onStartWeatherSearch"
      />
    </div>
  </div>
</template>

<script>
import { HalfCircleSpinner } from "epic-spinners";
import SidebarMain from "./SidebarMain.vue";
import SidebarSearch from "./SidebarSearch.vue";
export default {
  components: {
    "half-circle-spinner": HalfCircleSpinner,
    "sidebar-main": SidebarMain,
    "sidebar-search": SidebarSearch
  },
  props: {
    error: {
      type: Object
    },
    isCelsius: {
      type: Boolean,
      default: true
    },
    isFetching: {
      type: Boolean,
      default: false
    },
    isOpenSearch: {
      type: Boolean,
      default: false
    },
    onToggleSearchBox: {
      type: Function,
      required: true
    },
    weatherData: {
      type: Object,
      required: true
    },
    onStartWeatherSearch: {
      type: Function,
      required: true
    },
    onAddLocation: {
      type: Function,
      required: true
    },
    recentSearches: {
      type: Array
    }
  }
};
</script>

<style scoped></style>
