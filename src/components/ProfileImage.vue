<template>
  <img class="profile-image-container" :src="getImageSrc" :style="getImageStyle">
</template>

<script>
import _ from 'lodash'

export default {
  name: 'profile-image',
  props: {
    hash: {
      type: String,
      default: null,
    },
    size: {
      type: Number,
      default: 50,
    },
  },
  computed: {
    getImageSrc() {
      if(_.isEmpty(this.hash)) {
        return '/images/user-default-profile.png'
      }

      return process.env.VUE_APP_API_URL + '/image/' + this.hash
    },
    getImageStyle() {
      return {
        width: this.size + 'px',
        height: this.size + 'px',
      }
    },
  },
}
</script>

<style scoped lang="less">
.profile-image-container {
  object-fit: cover;
  border-radius: 50%;
  display: block;
}
</style>
