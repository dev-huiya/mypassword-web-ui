<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       :width="width"
       :height="height"
       viewBox="0 0 24 24"
       fill="none"
       :stroke="color"
       stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
</template>

<script>
export default {
  name: 'x-icon',
  props: {
    width: {
      type: [Number, String],
      default: 24,
    },
    height: {
      type: [Number, String],
      default: 24,
    },
    color: {
      type: String,
      default: 'currentColor',
    },
  },
}
</script>

<style scoped>

</style>
