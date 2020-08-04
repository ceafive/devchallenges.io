<template>
  <div class="flex flex-wrap justify-between bg-primary text-center p-4 w-full">
    <div class=" w-full my-2"><slot name="header"></slot></div>
    <div class="w-full my-2"><slot></slot></div>
    <div class="flex flex-wrap justify-center w-full my-2">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["weather-data"]
};
</script>

<style scoped></style>
