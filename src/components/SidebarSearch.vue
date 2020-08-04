<template>
  <div class="relative col-span-1 flex flex-wrap h-full max-h-full w-full p-6">
    <div class="absolute top-0 right-0 my-3">
      <svg
        @click="$emit('toggle-search-box', false)"
        class="fill-current text-white inline-block h-10 w-10 cursor-pointer"
        width="32"
        height="32"
        viewBox="0 0 512 512"
      >
        <polygon
          points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"
        />
      </svg>
    </div>
    <div class="flex w-full justify-between items-center mt-10">
      <input
        v-model="location"
        class="appearance-none w-9/12 block bg-transparent text-textPrimary border border-gray-500 py-2 px-4 leading-tight focus:outline-none"
        id="grid-first-name"
        type="text"
        placeholder="search location"
      />
      <button
        @click="emitEvents"
        class="bg-accent text-sm text-white py-2 px-3 focus:outline-none"
        type="button"
      >
        Search
      </button>
    </div>
    <div class="w-full mt-0">
      <p class="text-red-500 text-xs text-center leading-none">
        {{ error.message }}
      </p>
    </div>

    <!-- random locations -->
    <div class="text-white w-full mt-20">
      <h1>Recent Searches</h1>
      <button
        @click="emitEvents(location)"
        v-for="(location, index) in recentSearches"
        :key="index"
        class="inline-flex items-center justify-between w-full bg-transparent py-2 px-2 my-4 border border-gray-500 focus:outline-none"
      >
        <span>{{ location }}</span>
        <svg class="h-6 w-6" viewBox="0 0 512 512">
          <polyline
            points="184 112 328 256 184 400"
            style="fill:none;stroke:#E7E7EB;stroke-linecap:square;stroke-miterlimit:10;stroke-width:16px"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object
    },
    recentSearches: {
      type: Array
    }
  },
  data() {
    return {
      location: ""
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    emitEvents(search) {
      if (!this.location && !search) return;
      this.$emit("add-location", this.location || search);
      this.$emit("start-weather-search", this.location || search);
    }
  }
};
</script>

<style scoped></style>
