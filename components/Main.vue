<template>
  <div
    class="font-body flex flex-col items-center justify-center h-screen w-full"
  >
    <component :is="componentToRender"></component>
  </div>
</template>

<script>
import Uploader from './Uploader'
import Uploading from './Uploading'
import Uploaded from './Uploaded'
export default {
  name: 'Main',
  components: {
    uploader: Uploader,
    uploading: Uploading,
    uploaded: Uploaded,
  },
  computed: {
    uploadReady() {
      return this.$store.getters[`upload/uploadReady`]
    },
    uploading() {
      return this.$store.getters[`upload/uploading`]
    },
    uploaded() {
      return this.$store.getters[`upload/uploaded`]
    },
    componentToRender() {
      let toRender = 'uploader'
      if (this.uploadReady && !this.uploading && !this.uploaded)
        toRender = 'uploader'
      if (!this.uploadReady && this.uploading && !this.uploaded)
        toRender = 'uploading'
      if (!this.uploadReady && !this.uploading && this.uploaded)
        toRender = 'uploaded'

      return toRender
    },
  },
}
</script>

<style scoped>
.checkboard {
  background-color: #0104bb;
  background-image: linear-gradient(to right, transparent 99.5%, #fdfdfe 100%),
    linear-gradient(to bottom, transparent 99.5%, #fdfdfe 100%);
  background-size: 60px 60px;
}
</style>
