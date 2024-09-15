<template>
  <div class="grid grid-cols-1 xl:grid-cols-5 h-screen">
    <sidebar
      :is-celsius="isCelsius"
      :is-fetching="isFetching"
      :is-open-search="isOpenSearch"
      :on-toggle-search-box="handleToggleSearchBox"
      :weather-data="weatherData"
      :on-start-weather-search="handleStartWeatherSearch"
      :recent-searches="recentSearches"
      :on-add-location="handleAddLocation"
      :start-search-with-coords="handleStartWeatherSearchWithCoords"
      :error="error"
    />
    <weather-display
      :is-celsius="isCelsius"
      :is-fetching="isFetching"
      :weather-data="weatherData"
      @toggle-unit="handleToggleTemperatureUnit"
    />
  </div>
</template>

<script>
import _ from "lodash";
import Sidebar from "./Sidebar";
import WeatherDisplay from "./WeatherDisplay";
export default {
  components: {
    sidebar: Sidebar,
    weatherDisplay: WeatherDisplay
  },
  data() {
    return {
      error: {},
      isCelsius: true,
      isFetching: true,
      isOpenSearch: false,
      locationData: {},
      allWeatherData: {},
      formattedWeather: {},
      recentSearches: [
        "London",
        "Dubai",
        "Johannesburg",
        "Cape Town",
        "Melbourne",
        "Tokyo",
        "Barcelona"
      ]
    };
  },
  methods: {
    handleAddLocation(event) {
      if (typeof event !== "string" || !event) return;
      const found = this.recentSearches.find(
        x => x.toLowerCase() === event.toLowerCase()
      );
      if (found) return;
      this.recentSearches.shift();
      this.recentSearches.push(event);
    },
    handleToggleTemperatureUnit(condition = true) {
      this.isCelsius = condition;
    },

    handleToggleSearchBox(condition) {
      this.isOpenSearch = condition;
    },
    async getWeatherData(cityID = "44418") {
      // get weather details
      this.isFetching = true;
      const weatherUrl = `https://api.weatherapi.com/v1/forecast.json?q=${cityID}&days=6&key=60a8e829db8d4c109d083330241509`;
      const weatherRes = await fetch(weatherUrl);
      const wd = await weatherRes.json();

      this.allWeatherData = wd;
      this.formattedWeather = wd;
      this.isFetching = false;
      this.isOpenSearch = false;
    },
    async handleStartWeatherSearch(l) {
      this.error = {};
      try {
        const weatherUrl = `https://api.weatherapi.com/v1/current.json?q=${l}&key=60a8e829db8d4c109d083330241509`;
        const weatherRes = await fetch(weatherUrl);
        const locationData = await weatherRes.json();
        const { location } = locationData;

        if (!location) {
          throw new Error("Location not found. Enter another location");
        }

        // get weather per search
        await this.getWeatherData(location?.name);
      } catch (err) {
        console.log(err.message);
        this.error = { type: "no-weather-data", message: err.message };
      }
    },
    async handleStartWeatherSearchWithCoords(coords) {
      this.error = {};
      try {
        // get weather per search
        await this.getWeatherData(coords);
      } catch (err) {
        console.log(err.message);
        this.error = { type: "no-weather-data", message: err.message };
      }
    }
  },
  computed: {
    todaysDate() {
      return new Date().toISOString().slice(0, 10);
    },
    weatherData() {
      return _.isEmpty(this.formattedWeather)
        ? {}
        : {
            city: this.formattedWeather.location.name,
            date: this.formattedWeather.location.time,
            todaysWeather: {
              ...this.formattedWeather.forecast.forecastday.find(
                date => date.date === this.todaysDate
              ),
              city: this.formattedWeather.location.name
            },
            fiveDayForecast: this.formattedWeather.forecast.forecastday.filter(
              date => date.date !== this.todaysDate
            ),
            current: this.formattedWeather.current
          };
    }
  },
  created() {
    if (navigator.geolocation) {
      const showPosition = position => {
        const coords = `${position.coords.latitude},${position.coords.longitude}`;
        this.handleStartWeatherSearchWithCoords(coords);
      };
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.error("Geolocation is not supported by this browser.");
      this.getWeatherData();
    }
  }
};
</script>

<style scoped></style>
