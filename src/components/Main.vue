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
      isFetching: false,
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
      if (typeof event !== "string") return;
      const found = this.recentSearches.find(
        x => x.toLowerCase() === event.toLowerCase()
      );
      if (found) return;
      this.recentSearches.shift();
      this.recentSearches.push(event);
    },
    handleToggleTemperatureUnit(condition = true) {
      this.isCelsius = condition;
      const celsiusWeather = { ...this.allWeatherData };
      const farenheitWeather = { ...this.allWeatherData };
      const formattedConsolidatedWeather = farenheitWeather.consolidated_weather.map(
        x => ({
          ...x,
          max_temp: (x.max_temp / 5) * 9 + 32,
          min_temp: (x.min_temp / 5) * 9 + 32,
          the_temp: (x.the_temp / 5) * 9 + 32
        })
      );
      farenheitWeather.consolidated_weather = formattedConsolidatedWeather;

      return !condition
        ? (this.formattedWeather = farenheitWeather)
        : (this.formattedWeather = celsiusWeather);
    },

    handleToggleSearchBox(condition) {
      this.isOpenSearch = condition;
    },
    async getWeatherData(cityID = "44418") {
      // get weather details
      this.isFetching = true;
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      const weatherUrl = `https://www.metaweather.com/api/location/${cityID}`;
      const weatherRes = await fetch(proxyurl + weatherUrl);
      const weatherData = await weatherRes.json();

      this.allWeatherData = weatherData;
      this.formattedWeather = weatherData;
      this.isFetching = false;
      this.isOpenSearch = false;
    },
    async handleStartWeatherSearch(location) {
      this.error = {};
      try {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const weatherUrl = `https://www.metaweather.com/api/location/search/?query=${location}`;
        const weatherRes = await fetch(proxyurl + weatherUrl);
        const locationData = await weatherRes.json();

        if (locationData.length <= 0) {
          throw new Error("Location not found. Enter another location");
        }
        const woeid = locationData[0].woeid;
        // get weather per search
        await this.getWeatherData(woeid);
      } catch (err) {
        console.log(err.message);
        this.error = { type: "no-weather-data", message: err.message };
      }
    }
  },
  computed: {
    todaysDate() {
      return new Date(this.allWeatherData.time.split("T")[0])
        .toISOString()
        .slice(0, 10);
    },
    weatherData() {
      return _.isEmpty(this.formattedWeather)
        ? {}
        : {
            city: this.formattedWeather.title,
            date: this.formattedWeather.time,
            todaysWeather: {
              ...this.formattedWeather.consolidated_weather.find(
                date => date.applicable_date === this.todaysDate
              ),
              city: this.formattedWeather.title
            },
            fiveDayForecast: this.formattedWeather.consolidated_weather.filter(
              date => date.applicable_date !== this.todaysDate
            )
          };
    }
  },
  created() {
    this.getWeatherData();
  }
};
</script>

<style scoped></style>
