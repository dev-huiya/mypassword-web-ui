<template>
  <div class="page-container">
    <password-component :edit="false" />
  </div>
</template>

<script>

import PasswordComponent from '@/views/parts/Password'
export default {
  name: 'password-new',
  components: { PasswordComponent },
}
</script>

<style scoped lang="less">
</style>
