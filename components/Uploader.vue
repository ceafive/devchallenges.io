<template>
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
          <span class="underline">Image</span> Uploader
        </h1>
      </div>

      <div
        class="flex flex-col items-center justify-center w-full md:w-1/2 lg:w-2/3"
      >
        <div
          class="flex flex-col items-center justify-center text-white bg-appBox shadow-shadowApp1 h-smallUploaderHeight w-smallUploaderWidth md:h-mediumUploaderHeight md:w-mediumUploaderWidth lg:h-uploaderHeight lg:w-uploaderWidth"
        >
          <div class="mb-5 text-center">
            <div class="font-bold text-2xl md:text-3xl">
              <h1>Upload your image</h1>
            </div>
            <div class="text-sm md:text-base">
              <h2>Files should be .jpeg or .png</h2>
            </div>
          </div>
          <div
            class="h-smallImageBoxHeight w-smallImageBoxWidth md:h-mediumImageBoxHeight md:w-mediumImageBoxWidth lg:h-imageBoxHeight lg:w-imageBoxWidth relative flex flex-col items-center justify-center focus:outline-none"
          >
            <div
              class="bg-appBox border border-dotted border-white flex flex-col items-center justify-center w-full h-full"
            >
              <img
                class="inline h-20 w-20"
                src="https://cdn.shopify.com/s/files/1/2523/8150/t/5/assets/no-image.svg?v=11845786216574533032"
                alt="image-image"
              />
              <p class="text-white">Drag and drop your image here</p>
            </div>
            <!-- <form
            enctype="multipart/form-data"

            @submit.prevent="onSubmit"
            @click="$refs.input.click()"
          > -->
            <input
              ref="input"
              class="absolute h-full w-full opacity-0"
              type="file"
              name="image"
              accept="image/png, image/jpeg"
              @change="onFileChange"
            />
            <!-- </form> -->
          </div>
          <div class="text-center">
            <p class="text-lg my-2">or</p>
            <button
              class="bg-white text-appBox lg:text-xl font-light py-2 px-6 lg:py-4 lg:px-12 cursor-pointer focus:outline-none"
              @click="$refs.input.click()"
            >
              Choose a file
            </button>
            <p id="error-text" class="text-red-500 font-bold">
              {{ errMessage }}
            </p>
          </div>
        </div>
        <h1 class="text-left">
          Made with <span class="text-red-700 text-2xl">&#9829;</span> by Castro
          Agbo
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */

export default {
  name: 'Uploader',

  data() {
    return {
      file: null,
      errMessage: '',
    }
  },
  computed: {
    getURL() {
      return this.$store.getters.url
    },
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      const file = files[0]
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']

      if (!allowedTypes.includes(file.type)) {
        this.errMessage = 'Only images are accepted'
        return
      }
      if (file.size > 5000000) {
        this.errMessage = 'Image too large, select image below 500KB'
        return
      }
      this.file = file
      this.onSubmit()
    },
    onSubmit() {
      const formData = new FormData()
      formData.append('file', this.file)
      this.$store.dispatch('upload/sendFileToDB', formData)
    },
  },
}
</script>

<style scoped>
.underline {
  text-decoration: underline;
  text-decoration-color: #000ff3;
}
</style>
