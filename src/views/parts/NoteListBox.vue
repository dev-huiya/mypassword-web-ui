<template>
  <router-link :to="`/note/${data.id}`" class="notebox">
    <quill-editor toolbar="" theme="" :read-only="true" :content="getContents" />
  </router-link>
</template>

<script>
import ArrowRightIcon from '@/assets/feather-icons/ArrowRight'
import { serverToClient } from '@/utils/Encrypt'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default {
  name: 'note-list-box',
  components: { QuillEditor },
  props: {
    data: {
      type: Object,
    },
  },
  computed: {
    getContents() {
      return JSON.parse(serverToClient(this.data.contents))
    },
  },
}
</script>

<style scoped lang="less">
.notebox {
  display: flex;
  justify-content: space-between;
  width: 20%;
  padding: 5px;
  text-decoration: none;
  color: var(--text-color);
  background-color: var(--background-primary-color);
  box-shadow: var(--color-shadow-medium);
  border-radius: 7px;
  height: 200px;
  overflow: hidden;

  @media only screen and (max-width: 1023px) {
    width: 100%;
  }

  .right {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
