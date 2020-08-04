<template>
  <div
    class="flex flex-wrap justify-center bg-primary text-center shadow-lg p-2 m-2 w-full overflow-hidden"
  >
    <div class="text-xl leading-none">{{ formattedDate }}</div>
    <div class="w-full">
      <img
        class="inline-block w-24 h-24"
        :src="require(`../assets/images/${cloudInfo}.png`)"
        alt="cloud"
      />
    </div>

    <div class="flex justify-between w-1/2 mt-4">
      <p>
        <span>{{ temperature.tempMax }}</span>
        <span><sup>o</sup>{{ tempUnit }}</span>
      </p>
      <p>
        <span> {{ temperature.tempMin }}</span>
        <span><sup>o</sup>{{ tempUnit }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isCelsius: {
      type: Boolean,
      default: true
    },
    weatherData: {
      type: Object,
      required: true
    },
    currentDate: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      cloudInfo: this.weatherData.weather_state_name.split(" ").join(""),
      date: this.weatherData.applicable_date
    };
  },
  computed: {
    tempUnit() {
      return this.isCelsius ? "C" : "F";
    },
    formattedDate() {
      // next day from API response time property
      const todayDate = this.currentDate.split("T")[0];
      const convert = new Date(todayDate).toUTCString();
      var day = new Date(convert);
      var nextDay = new Date(day);
      nextDay.setDate(day.getDate() + 1);
      const convertNextDay = nextDay.toUTCString();

      const event = new Date(this.date).toUTCString();
      const splitDate = event.split(" ");
      const splitNextDay = convertNextDay.split(" ");
      const formattedDate = splitDate
        .filter(x => splitDate.indexOf(x) < 3)
        .join(" ");
      const formattedNextDate = splitNextDay
        .filter(x => splitNextDay.indexOf(x) < 3)
        .join(" ");

      return formattedDate === formattedNextDate ? "Tomorrow" : formattedDate;
    },
    temperature() {
      const { max_temp, min_temp } = this.weatherData;
      const tempMax = max_temp.toFixed();
      const tempMin = min_temp.toFixed();
      return { tempMax, tempMin };
    }
  }
};
</script>

<style scoped></style>
