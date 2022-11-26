<template>
  <div class="page-container">
    <div class="box">
      <div class="icon-container">
        <search-icon />
      </div>

      <input-h placeholder="주소 검색" v-model="search" />
    </div>

    <div class="title">
      <h2>총 {{ list.totalElements || 0 }}개의 사이트</h2>

      <router-link to="/password/new" class="new">
        <edit-icon width="16" height="16" />
        <span>새롭게 추가하기</span>
      </router-link>
    </div>

    <div class="box contents-container">
      <list-box
        v-for="item in list.content"
        :key="item.id"
        :data="item"
      />
    </div>

    <div v-if="list.totalElements <= 0" class="data-empty">
      <span>저장된 비밀번호가 없습니다.</span>
    </div>
  </div>
</template>

<script>
import query from '@/api'
import InputH from '@/components/Input'
import ListBox from '@/views/parts/ListBox'
import SearchIcon from '@/assets/feather-icons/Search'
import EditIcon from '@/assets/feather-icons/Edit'
import _ from 'lodash'

export default {
  name: 'index-page',
  components: { EditIcon, SearchIcon, ListBox, InputH },
  data() {
    return {
      search: '',
      list: [],
    }
  },
  mounted() {
    this.load()
  },
  watch: {
    search: _.debounce(function () {
      this.load()
    }, 500),
  },
  computed: {
  },
  methods: {
    // TODO: 스크롤시 무한 스크롤 적용 바람
    load() {
      query({
        url: '/password/search',
        data: {
          value: this.search,
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
  margin: 30px 0px;
}
</style>
