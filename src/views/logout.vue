<template>
로그아웃 되는 중...
</template>

<script>
import query from '@/api'
import { clearToken } from '@/utils/Auth'

export default {
  name: '404-page',
  mounted() {
    this.logout();
  },
  methods: {
    logout() {
      query({
        url: '/auth/signout',
        method: 'delete',
      }).then(() => {
        this.$router.push('/')
        clearToken()
      })
    },
  },
}
</script>

<style scoped>

</style>
