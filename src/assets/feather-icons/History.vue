<template>
  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
       :width="width"
       :height="height"
       viewBox="0 0 20 20"
       fill="none"
       stroke="none"
  >
    <g fill="none" fill-rule="evenodd">
      <path d="M0 0h20v20H0z"></path>
      <path
        d="M10 1a9 9 0 11-8.937 10.07l-.001-.008-.007-.102a.75.75 0 111.5 0l-.005-.09a7.501 7.501 0 10.689-4.12h3.01a.75.75 0 01.743.648L7 7.5a.75.75 0 01-.648.743l-.102.007h-4.5a.75.75 0 01-.743-.648L1 7.5V3a.75.75 0 011.493-.102L2.5 3v2.024A8.992 8.992 0 0110 1zm.037 4.047a.75.75 0 01.739.654l.006.102-.032 4.203a.75.75 0 01-.142.433l-.075.089-2.982 3.008a.75.75 0 01-1.137-.971l.072-.085 2.766-2.79.03-3.898a.75.75 0 01.654-.738l.101-.006z"
        :fill="color" fill-rule="nonzero"></path>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'History-icon',
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
