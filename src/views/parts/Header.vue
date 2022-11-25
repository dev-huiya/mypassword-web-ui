<template>
  <header>
    <div class="wrap header">
      <logo-component />

      <router-link to="/logout" v-if="isLogined">
        <log-out-icon width="20" height="20" />
      </router-link>
    </div>
  </header>

  <div class="sub-header" v-if="$route.meta.subHeader">
    <div class="wrap">
      <router-link to="/" class="link-with-icon">
        <arrow-left-icon />
        <span>뒤로가기</span>
      </router-link>
    </div>
  </div>
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
import ArrowLeftIcon from '@/assets/feather-icons/ArrowLeft'

export default {
  name: 'header-parts',
  components: { ArrowLeftIcon, LogOutIcon, LogoComponent },
  mounted() {
    console.log('isLogined', this.isLogined)
    console.log(this.$route, this.$router)
  },
  data() {
    return {
      isSubHeaderShow: [
        '/password/new',
      ],
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

 .sub-header {
   height: 60px;
   box-shadow: var(--color-shadow-medium);
   background-color: var(--background-primary-color);

   & > * {
     height: 100%;
     display: flex;
     align-items: center;

     .link-with-icon {
       cursor: pointer;
       color: var(--text-color);
       text-decoration: none;
     }
   }
 }
</style>
