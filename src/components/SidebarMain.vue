<template>
  <div class="col-span-1 p-6 w-full h-full">
    <div
      id="weather-top"
      class="flex flex-wrap justify-center min-h-1/2 w-full p-3"
    >
      <div class="flex justify-between items-center w-full">
        <button
          @click="$emit('toggle-search-box', true)"
          class="bg-buttonPrimary text-textSecondary md:text-2xl lg:text-3xl xl:text-base font-hairline py-2 px-4 focus:outline-none"
        >
          Search for places
        </button>
        <div
          class="flex justify-center items-center w-10 h-10 md:w-16 md:h-16 xl:w-10 xl:h-10 bg-buttonPrimary rounded-full"
        >
          <button
            class=" text-textSecondary font-hairline p-2 focus:outline-none"
          >
            <svg
              class="inline-block h-8 w-8 md:h-10 md:w-10 xl:h-6 xl:w-6 cursor-pointer"
              viewBox="0 0 512 512"
            >
              <line
                x1="256"
                y1="96"
                x2="256"
                y2="56"
                style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"
              />
              <line
                x1="256"
                y1="456"
                x2="256"
                y2="416"
                style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"
              />
              <path
                d="M256,112A144,144,0,1,0,400,256,144,144,0,0,0,256,112Z"
                style="fill:none;stroke:#fff;stroke-miterlimit:10;stroke-width:32px"
              />
              <line
                x1="416"
                y1="256"
                x2="456"
                y2="256"
                style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"
              />
              <line
                x1="56"
                y1="256"
                x2="96"
                y2="256"
                style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"
              />
            </svg>
          </button>
        </div>
      </div>
      <div>
        <img
          class="inline w-56 lg:w-72 xl:w-40"
          :src="require(`../assets/images/${cloudImage}.png`)"
          alt="heavy rain"
        />
      </div>
    </div>

    <div
      id="weather-down"
      class="flex flex-wrap justify-center items-center w-full min-h-1/2"
    >
      <h1
        class="flex justify-center items-center w-full text-7rem md:text-8rem lg:text-10rem xl:text-8vw leading-none"
      >
        {{ todaysTemp
        }}<span class="text-textPrimary text-4xl xl:text-6xl"
          ><sup class="text-xl lg:text-3xl xl:text-4xl">o</sup
          ><span class="text-4xl lg:text-6xl">{{ tempUnit }}</span></span
        >
      </h1>
      <p
        class="flex justify-center w-full font-semibold text-textPrimary md:text-4xl xl:text-3xl leading-none"
      >
        {{ cloudInfo }}
      </p>
      <p
        class="flex justify-between items-center w-8/12 text-textPrimary md:text-2xl xl:text-sm"
      >
        Today
        <span class="text-lg">&bull;</span>
        {{ new Date().toDateString() }}
      </p>
      <p class="flex justify-between items-center w-2/5 text-textPrimary">
        <svg class="inline-block h-8 w-8 xl:h-6 xl:w-6" viewBox="0 0 512 512">
          <path
            d="M256,48c-79.5,0-144,61.39-144,137,0,87,96,224.87,131.25,272.49a15.77,15.77,0,0,0,25.5,0C304,409.89,400,272.07,400,185,400,109.39,335.5,48,256,48Z"
            style="fill:none;stroke:#A09FB1;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
          />
          <circle
            cx="256"
            cy="192"
            r="48"
            style="fill:none;stroke:#A09FB1;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
          />
        </svg>
        <span class="md:text-3xl xl:text-base">{{ todaysData.city }}</span>
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
    todaysData: {
      type: Object,
      required: true
    }
  },
  computed: {
    tempUnit() {
      return this.isCelsius ? "C" : "F";
    },
    cloudInfo() {
      return this.todaysData.weather_state_name;
    },
    cloudImage() {
      return this.todaysData.weather_state_name.split(" ").join("");
    },
    todaysTemp() {
      return this.todaysData.the_temp.toFixed();
    }
  }
};
</script>

<style scoped>
#weather-top {
  /* background-image: url("../assets/images/Cloud-background.png"); */
  background-repeat: no-repeat;
  background-attachment: initial;
  background-position: contain;
  background-size: 500px 300px;
  background-blend-mode: luminosity;
}
</style>
