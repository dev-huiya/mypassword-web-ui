<template>
  <div class="page-container">
    <password-component
      :is-edit="true"
      v-for="item in list"
      :password="item"
      :key="item.id"
    />
  </div>
</template>

<script>
import query from '@/api'
import PasswordComponent from '@/views/parts/Password'
export default {
  name: 'password-detail-page',
  components: { PasswordComponent },
  data() {
    return {
      list: [],
    }
  },
  mounted() {
    this.load()
  },
  watch: {
    $route(to, from) {
      if(to.params.host !== from.params.host) {
        this.load()
      }
    },
  },
  computed: {
  },
  methods: {
    load() {
      query({
        url: '/password/host',
        data: {
          value: this.$route.params.host,
        },
      }).then(res => {
        this.list = res
      }).catch(error => {
        console.error(error)
        this.list = []
      })
    },
  },
}
</script>

<style scoped lang="less">
.page-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
