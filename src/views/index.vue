<template>
<div class="box">
  {{welcomeMessage}}
</div>
</template>

<script>
export default {
  name: 'index-page',
  created() {
    console.log(process.env.VUE_APP_API_URL)
  },
  computed: {
    welcomeMessage() {
      return this.$store.state.user == null ? 'Welcome!' : this.$store.state.user.email + '님'
    },
  },
}
</script>

<style scoped>
.box
{
  background-color: var(--background-primary-color);
}
</style>
