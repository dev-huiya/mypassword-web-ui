<template>
  <router-link :to="`/password/${data.host}`" class="box-list">
    <span>{{ `${data.protocol}://${data.host}` }}</span>
    <arrow-right-icon width="20" height="20" />
  </router-link>
</template>

<script>
import ArrowRightIcon from '@/assets/feather-icons/ArrowRight'
export default {
  name: 'list-box',
  components: { ArrowRightIcon },
  props: {
    data: {
      type: Object,
    },
  },
}
</script>

<style scoped>

</style>
