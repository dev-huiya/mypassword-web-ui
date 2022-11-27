<template>
  <div class="page-container">
    <div class="password-container">
      <div class="box">
        <div class="icon-container">
          <search-icon />
        </div>

        <input-h placeholder="주소 검색" v-model="search" />
      </div>

      <div class="title">
        <h2>총 {{ passwords.totalElements || 0 }}개의 비밀번호</h2>

        <router-link to="/password/new" class="new">
          <edit-icon width="16" height="16" />
          <span>새롭게 추가하기</span>
        </router-link>
      </div>

      <div class="box contents-container">
        <password-list-box
          v-for="item in passwords.content"
          :key="item.id"
          :data="item"
        />
      </div>

      <div v-if="passwords.totalElements <= 0" class="data-empty">
        <span>저장된 비밀번호가 없습니다.</span>
      </div>
    </div>

    <div id="note-container">
      <div class="title">
        <h2>총 {{ notes.totalElements || 0 }}개의 메모</h2>

        <router-link to="/note/new" class="new">
          <edit-icon width="16" height="16" />
          <span>새롭게 추가하기</span>
        </router-link>
      </div>

      <div class="note-list-container">
        <note-list-box
          v-for="item in notes.content"
          :key="item.id"
          :data="item"
        />
      </div>

      <div v-if="(notes?.totalElements || 0) <= 0" class="data-empty">
        <span>저장된 메모가 없습니다.</span>
      </div>
    </div>
  </div>
</template>

<script>
import query from '@/api'
import InputH from '@/components/Input'
import SearchIcon from '@/assets/feather-icons/Search'
import EditIcon from '@/assets/feather-icons/Edit'
import _ from 'lodash'
import PasswordListBox from '@/views/parts/PasswordListBox'
import NoteListBox from '@/views/parts/NoteListBox'

export default {
  name: 'index-page',
  components: { NoteListBox, PasswordListBox, EditIcon, SearchIcon, InputH },
  data() {
    return {
      search: '',
      passwords: {},
      notes: {},
    }
  },
  mounted() {
    this.loadPassword()
    this.loadNote()
  },
  watch: {
    search: _.debounce(function () {
      this.loadPassword()
    }, 500),
  },
  computed: {
  },
  methods: {
    // TODO: 스크롤시 무한 스크롤 적용 바람
    loadPassword() {
      query({
        url: '/password/search',
        data: {
          value: this.search,
        },
      }).then(res => {
        this.passwords = res
      }).catch(error => {
        console.error(error)
        this.passwords = []
      })
    },
    loadNote() {
      query({
        url: '/note/all',
      }).then(res => {
        this.notes = res
      }).catch(error => {
        console.error(error)
        this.notes = []
      })
    },
  },
}
</script>

<style scoped lang="less">
.box {
  display: flex;
  padding: 0px 10px;
  gap: 10px;
  justify-content: center;
  align-items: center;

  .icon-container {
    width: 40px;
    display: flex;
    justify-content: center;
  }

  .input-container {
    width: 100%;
  }
}

.contents-container {
  //margin-top: 50px;
  flex-direction: column;
  gap: 10px;

  & > * {
    &:hover {
      //background-color: var(--background-third-color);
    }
  }
}

.note-list-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.data-empty {
  //opacity: var(--lighten-opacity);
  color: var(--text-lighten-color);
}

.new {
  text-decoration: none;
  color: var(--primary-color);
  display: inline-flex;
  align-items: center;
  margin: 0px 10px;
}

.title {
  display: flex;
  justify-content: space-between;
  margin: 40px 0px 20px;
}
</style>
