<template>
  <div
    class="flex flex-wrap justify-center bg-primary text-center shadow-lg p-2 m-2 w-full overflow-hidden"
  >
    <div class="text-xl leading-none">{{ formattedDate }}</div>
    <div class="w-full">
      <img class="inline-block w-24 h-24" :src="cloudImage" alt="cloud" />
    </div>

    <div class="flex justify-between w-7/12 mt-4">
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
    }
  },
  data() {
    return {
      cloudImage: this.weatherData.day.condition.icon.replace("//", "https://"),
      date: this.weatherData.date
    };
  },
  computed: {
    tempUnit() {
      return this.isCelsius ? "C" : "F";
    },
    formattedDate() {
      // next day from API response time property
      var day = new Date();
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
      const {
        maxtemp_c,
        mintemp_c,
        maxtemp_f,
        mintemp_f
      } = this.weatherData.day;
      const tempMax = this.isCelsius ? maxtemp_c : maxtemp_f;
      const tempMin = this.isCelsius ? mintemp_c : mintemp_f;
      return { tempMax, tempMin };
    }
  }
};
</script>

<style scoped></style>
