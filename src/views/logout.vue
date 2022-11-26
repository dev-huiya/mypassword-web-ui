<template>
로그아웃 되는 중...
</template>

<script>
import query from '@/api'
import { clearToken, verifyToken } from '@/utils/Auth'
import router from '@/router'

export default {
  name: '404-page',
  mounted() {
    this.logout()
  },
  methods: {
    logout() {
      if(!verifyToken()) {
        this.$router.push('/')
        clearToken()
      }

      query({
        url: '/auth/signout',
        method: 'delete',
      }).finally(() => {
        this.$router.push('/')
        clearToken()
      })
    },
  },
}
</script>

<style scoped>

</style>
