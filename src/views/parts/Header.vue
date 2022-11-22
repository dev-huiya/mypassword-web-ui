<template>
  <header>
    <div class="wrap header">
      <router-link to="/">
        <div class="text-logo"></div>
      </router-link>
      <div class="button-container">
        <router-link class="search-button" to="/search">
          <search-icon/>
        </router-link>
        <button class="menu-button" @click="isOpen = !isOpen">
          <menu-icon />
        </button>
        <teleport to="#teleport-menu" :disabled="isOpen == false" v-if="isOpen">
          <div class="cover" @click="isOpen = false">
            <div class="wrap">
              <div class="menu" @click.stop>
                <div class="profile">
                  <router-link class="profile-info" :to="isLogined == true ? '/account' : '/login'">
                    <profile-image
                      :hash="getUserProfile"
                    />
                    <span>{{ getUserNickname }}</span>
                    <chevron-right-icon />
                  </router-link>
                  <button class="close" @click="isOpen = false"> <x-icon /> </button>
                </div>

                <div class="quick">
                  <router-link to="/account/bookmark">
                    <div class="icon">
                      <BookmarkIcon />
                    </div>
                    <span>북마크</span>
                  </router-link>
                  <router-link to="/account/theme">
                    <div class="icon">
                      <ToggleLeftIcon />
                    </div>
                    <span>테마 변경</span>
                  </router-link>
                  <router-link to="/recipe/write">
                    <div class="icon">
                      <EditIcon />
                    </div>
                    <span>글쓰기</span>
                  </router-link>
                </div>

                <div class="menu-accordion">
                  <menu-accordion
                    v-for="item in getMenu"
                    :key="item.name"
                    :data="item"
                  />
                </div>
              </div>
            </div>
          </div>
        </teleport>
      </div>
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

export default {
  name: 'header-parts',
  components: { MenuAccordion, EditIcon, ToggleLeftIcon, BookmarkIcon, ChevronRightIcon, ProfileImage, XIcon, SearchIcon, MenuIcon },
  data() {
    return {
      isOpen: false,
    }
  },
  watch: {
    isOpen() {
      console.log('isOpen', this.isOpen)
    },
    $route(to, from) {
      console.log('header-route-watch-run')
      this.isOpen = false
    },
  },
  computed: {
    getUserNickname() {
      return getUser()?.nickname || '로그인해주세요'
    },
    getUserProfile() {
      return getUser()?.profile || null
    },
    isLogined,
    getMenu() {
      return menu.filter(item =>
        item.type.includes(isLogined() === true ? 'login' : 'logout')
      )
    },
  },
}
</script>

<style scoped lang="less">
 header {
   height: 60px;
   width: 100%;
   background-color: var(--primary-color);
   color: var(--text-invert-color);

   a {
     text-decoration: none;
   }

   .header {
     display: flex;
     align-items: center;
     justify-content: space-between;

     .button-container{
       display: flex;

       .search-button{
         display: flex;
         width: 50px;
         height: 60px;
         align-items: center;
         justify-content: center;
         color: var(--text-invert-color);

         svg{
           stroke-width: 2.5;
         }
       }

       .menu-button{
         width: 50px;
         height: 60px;
         background: none;
         border: none;
         color: var(--text-invert-color);
         padding-right: 10px;
         cursor: pointer;

         svg{
           stroke-width: 2.5;
         }

       }
     }
   }
 }

 .cover{
   width: 100vw;
   height: 100vh;
   background-color: #3338;
   position: fixed;
   top: 0px;
   left: 0px;

   .wrap{
     display: flex;
     justify-content: flex-end;

     .menu{
       width: 300px;
       min-height: 100vh;
       background-color: var(--background-secondary-color);
       display: flex;
       flex-direction: column;
       gap: 10px;

       .profile{
         height: 60px;
         background-color: var(--background-primary-color);
         display: flex;
         align-items: center;
         justify-content: space-between;

         .profile-info {
           padding: 5px;
           display: flex;
           align-items: center;
           flex-wrap: wrap;
           color: var(--text-color);
           text-decoration: none;
           gap: 10px;

           span{
             color: var(--primary-color);
           }
         }

         .close{
           border: none;
           background: none;
           width: 60px;
           height: 60px;
           color: var(--text-color);
           cursor: pointer;
         }
       }

       .quick {
         background-color: var(--background-primary-color);
         display: flex;
         align-items: center;
         justify-content: space-evenly;
         padding: 6px 8px;

         a {
           height: 90px;
           text-decoration: none;
           font-size: 0.85em;
           color: var(--text-color);
           display: flex;
           justify-content: center;
           flex-direction: column;
           align-items: center;
           gap: 5px;

           .icon {
             border-radius: 50%;
             width: 45px;
             height: 45px;
             background-color: var(--secondary-color);
             display: flex;
             justify-content: center;
             align-items: center;
           }
         }
       }

       .menu-accordion {
         display: flex;
         background-color: var(--background-primary-color);
         flex-direction: column;
       }
     }
   }
 }
</style>
