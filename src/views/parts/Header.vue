<template>
  <header>
    <div class="wrap header">
      <logo-component />

      <router-link to="/logout" v-if="isLogined">
        <log-out-icon width="20" height="20" />
      </router-link>
    </div>
  </header>
</template>

<script>
import MenuIcon from '@/assets/feather-icons/Menu'
import SearchIcon from '@/assets/feather-icons/Search'
import XIcon from '@/assets/feather-icons/X'
import ProfileImage from '@/components/ProfileImage'
import ChevronRightIcon from '@/assets/feather-icons/ChevronRight'
import { getUser, isLogined } from '@/utils'
import BookmarkIcon from '@/assets/feather-icons/Bookmark'
import ToggleLeftIcon from '@/assets/feather-icons/ToggleLeft'
import EditIcon from '@/assets/feather-icons/Edit'
import { menu } from '@/assets/menu'
import MenuAccordion from '@/components/MenuAccordion'
import LogoComponent from '@/views/parts/Logo'
import LogOutIcon from '@/assets/feather-icons/LogOut'

export default {
  name: 'header-parts',
  components: { LogOutIcon, LogoComponent },
  mounted() {
    console.log('isLogined', this.isLogined)
  },
  data() {
    return {
    }
  },
  watch: {
  },
  computed: {
    isLogined() {
      console.log(this.$store.state.user)
      return this.$store.state.user != null
    },
  },
}
</script>

<style scoped lang="less">
 header {
   height: 60px;
   width: 100%;
   background-color: var(--primary-color);
   box-shadow: var(--color-shadow-medium);

   a {
     text-decoration: none;
     color: var(--text-invert-color);
   }

   .header {
     display: flex;
     justify-content: space-between;
     align-items: center;
   }
 }
</style>
