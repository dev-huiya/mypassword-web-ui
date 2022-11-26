<template>
  <div class="page-container">
    <password-detail :edit="false" />
  </div>
</template>

<script>

import PasswordDetail from '@/views/parts/Password'
export default {
  name: 'password-new',
  components: { PasswordDetail },
}
</script>

<style scoped lang="less">
</style>
