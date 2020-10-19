<template>
  <!-- Section 3 -->
  <div
    class="flex flex-col items-center justify-center text-black w-full h-full animate__animated px-6 md:px-24"
  >
    <div class="flex flex-wrap md:flex-no-wrap justify-between w-full h-full">
      <div
        class="flex flex-col items-center justify-center w-full md:w-1/3 lg:w-1/4"
      >
        <h1
          class="font-bold text-xl md:text-4xl lg:text-6xl stracking-tighter text-center w-full mb-4"
        >
          Your image has been served
        </h1>
        <button
          class="bg-appBox text-white lg:text-xl font-light py-2 px-6 lg:py-4 lg:px-12 cursor-pointer focus:outline-none"
          @click="reset"
        >
          Upload Again
        </button>
      </div>

      <div
        class="flex flex-col items-center justify-center w-full md:w-1/2 lg:w-2/3"
      >
        <div
          class="flex flex-col items-center justify-center text-white bg-appBox py-4 shadow-shadowApp1 h-smallUploaderHeight w-smallUploaderWidth md:h-mediumUploaderHeight md:w-mediumUploaderWidth lg:h-uploaderHeight lg:w-uploaderWidth"
        >
          <!-- 1 -->
          <div class="text-center">
            <div>
              <i class="material-icons md-48 text-white text-6xl"
                >check_circle</i
              >
            </div>
            <div class="font-bold text-3xl">
              <h2>Uploaded Successfully!</h2>
            </div>
          </div>

          <!-- 2 -->
          <div class="rounded-lg overflow-hidden m-4">
            <img
              id="image-success-preview"
              class="h-smallShowImageBoxHeight w-smallShowImageBoxWidth md:w-mediumShowImageBoxWidth l:h-mediumShowImageBoxHeight md:w-showImageBoxWidth l:h-showImageBoxHeight rounded-lg object-contain"
              :src="`${showImg}`"
              :alt="showImg"
            />
          </div>

          <!-- 3 -->
          <div
            class="flex justify-between bg-gray-200 py-1 px-1 text-black border border-gray-400 w-11/12"
          >
            <input
              ref="url_box"
              v-model="showImg"
              type="text"
              class="flex-1 bg-gray-200 focus:outline-none"
            />

            <button
              class="text-appBox font-light text-sm py-2 px-4 cursor-pointer focus:outline-none"
              @click="copyText"
            >
              Copy Link
            </button>
          </div>
          <p>{{ copied }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Uploaded',
  data() {
    return {
      copied: '',
    }
  },
  computed: {
    showImg() {
      return `http://localhost:3000/${this.$store.getters['upload/imgURL']}`
    },
  },
  methods: {
    copyText() {
      this.$refs.url_box.select()
      document.execCommand('copy')
      this.copied = 'Link Copied'
    },
    reset() {
      this.$store.commit('upload/UPLOADREADY', true)
      this.$store.commit('upload/UPLOADING', false)
      this.$store.commit('upload/UPLOADED', false)
    },
  },
}
</script>

<style scoped></style>
