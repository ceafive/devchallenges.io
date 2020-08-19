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
      <transition name="slideIn">
        <sidebar-main
          key="1"
          v-if="!isOpenSearch"
          @toggle-search-box="onToggleSearchBox"
          :todays-data="weatherData.todaysWeather"
          :is-celsius="isCelsius"
        />
        <sidebar-search
          key="2"
          v-else
          :recent-searches="recentSearches"
          :error="error"
          @add-location="onAddLocation"
          @toggle-search-box="onToggleSearchBox"
          @start-weather-search="onStartWeatherSearch"
        />
      </transition>
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slideIn-enter-active {
  animation: slideIn 1s forwards;
}
.slideIn-leave-active {
  animation: slideIn 0.5s reverse;
}
@keyframes slideIn {
  0% {
    transform: translateX(-900px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
