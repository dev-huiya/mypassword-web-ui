<template>
  <router-link :to="to">
    <lock-icon width="20" height="20" />
    <div class="text-logo"></div>
  </router-link>
</template>

<script>
import LockIcon from '@/assets/feather-icons/Lock'
export default {
  name: 'logo-component',
  components: { LockIcon },
  props: {
    to: {
      type: String,
      default: '/',
    },
  },
}
</script>

<style scoped lang="less">
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;900&display=swap');

a {
  display: flex;
  align-items: center;

  .text-logo {
    height: 60px;
    font-family: 'Nunito', sans-serif;
    font-size: 1.3em;
    line-height: 60px;
    padding: 0 15px;
    font-weight: 600;

    &:before {
      content: 'myPasswords';
    }
  }
}
</style>
