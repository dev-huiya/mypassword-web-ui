<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       :width="width"
       :height="height"
       viewBox="0 0 24 24"
       fill="none"
       :stroke="color"
       stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
</template>

<script>
export default {
  name: 'arrow-right-icon',
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
