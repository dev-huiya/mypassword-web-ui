<template>
  <router-link class="menu-list"
    :class="{isActive: data.children == null}"
    :to="data.children != null ? '' : data.link"
    @click="isOpen = !isOpen"
  >
    <component :is="data.icon" :width="20" />
    <span>{{ data.name }}</span>

    <chevron-down-icon v-if="data.children != null && isOpen == false"/>
    <chevron-up-icon v-if="data.children != null && isOpen == true" />
  </router-link>

  <div class="children-list" v-if="data.children != null && isOpen == true">
    <router-link :to="item.link" v-for="item in data.children" :key="item.name">
      {{ item.name }}
    </router-link>
  </div>
</template>

<script>
import ChevronDownIcon from '@/assets/feather-icons/ChevronDown'
import ChevronUpIcon from '@/assets/feather-icons/ChevronUp'
import UserIcon from '@/assets/feather-icons/User'
import ToggleLeftIcon from '@/assets/feather-icons/ToggleLeft'
import BookmarkIcon from '@/assets/feather-icons/Bookmark'
import HistoryIcon from '@/assets/feather-icons/History'
import GlobeIcon from '@/assets/feather-icons/Globe'
import LogInIcon from '@/assets/feather-icons/LogIn'
import LogOutIcon from '@/assets/feather-icons/LogOut'

export default {
  name: 'menu-accordion',
  components: {
    LogOutIcon,
    LogInIcon,
    GlobeIcon,
    HistoryIcon,
    BookmarkIcon,
    ToggleLeftIcon,
    UserIcon,
    ChevronUpIcon,
    ChevronDownIcon,
  },
  props: {
    data: {
      type: Object,
    },
  },
  watch: {
  },
  data() {
    return {
      isOpen: false,
    }
  },
  created() {
    if(this.data.children != null) {
      this.data.children.forEach(item => {
        if(item.link === this.$route.path) {
          this.isOpen = true
        }
      })
    }
  },
}
</script>

<style scoped lang="less">
.menu-list{
  text-decoration: none;
  color: var(--text-color);
  display: grid;
  align-items: center;
  grid-template-columns: 20px 1fr auto;
  padding: 10px 15px;
  gap: 10px;
  opacity: var(--lighten-opacity);
  font-size: 0.95em;

  &:not(:last-child) {
    border-bottom: 2px solid var(--background-secondary-color);
  }

}

.children-list{
  display: flex;
  flex-direction: column;

  a{
    text-decoration: none;
    color: var(--text-color);
    border-bottom: 2px solid var(--background-secondary-color);
    padding: 10px 10px 10px 50px;
    font-size: 0.9em;
  }
}

.menu-list.isActive.router-link-exact-active,
.children-list .router-link-exact-active {
  color: var(--primary-color);
}
</style>
