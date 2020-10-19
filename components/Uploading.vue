<template>
  <!-- Section 2 -->
  <div
    class="flex flex-col items-center justify-center text-black w-full h-full animate__animated px-6 md:px-24"
  >
    <div class="flex flex-wrap md:flex-no-wrap justify-between w-full h-full">
      <div
        class="flex flex-col items-center justify-center w-full md:w-1/3 lg:w-1/4"
      >
        <h1
          class="font-bold text-2xl md:text-4xl lg:text-6xl tracking-tighter text-center w-full"
        >
          Image is being sent to server
        </h1>
      </div>

      <div
        class="flex flex-col items-center justify-center w-full md:w-1/2 lg:w-2/3"
      >
        <div
          class="flex flex-col items-center justify-center text-white bg-appBox shadow-shadowApp1 h-smallUploaderHeight w-smallUploaderWidth md:h-mediumUploaderHeight md:w-mediumUploaderWidth lg:h-uploaderHeight lg:w-uploaderWidth"
        >
          <div class="text-center w-full p-10">
            <div class="font-bold text-4xl">
              <h1>Uploading...</h1>
            </div>
            <div class="w-full h-2 bg-white rounded">
              <div
                class="bg-appBox rounded border border-white transition-all duration-500 ease-in-out"
                :style="{
                  height: '100%',
                  width: progressBarWidth + '%',
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End section 2 -->
</template>

<script>
export default {
  name: 'Uploading',
  computed: {
    progressBarWidth() {
      return this.$store.getters['upload/progressBarWidth']
    },
  },
}
</script>

<style scoped></style>
