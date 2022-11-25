<template>
  <router-link :to="`/password/${data.host}`" class="box-list">
    <span>{{ `${data.protocol}://${data.host}` }}</span>
    <div class="right">
      <span v-if="data.count > 1">{{data.count}}개</span>
      <arrow-right-icon width="20" height="20" />
    </div>

  </router-link>
</template>

<script>
import ArrowRightIcon from '@/assets/feather-icons/ArrowRight'
import { serverToClient } from '@/utils/Encrypt'

export default {
  name: 'list-box',
  components: { ArrowRightIcon },
  props: {
    data: {
      type: Object,
    },
  },
  // mounted() {
  //   console.log(this.data)
  //   console.log(serverToClient(this.data.username))
  // },
}
</script>

<style scoped lang="less">
.box-list {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  text-decoration: none;
  color: var(--text-color);

  .right {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
