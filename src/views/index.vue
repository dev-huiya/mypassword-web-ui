<template>
  <div class="page-container">
    <div class="box">
      <div class="icon-container">
        <search-icon />
      </div>

      <input-h placeholder="주소 검색" v-model="search" />
    </div>

    <div class="box contents-container">
      <list-box
        v-for="item in list.contents"
        :key="item.id"
        :data="item"
      />
    </div>

    <div v-if="list.totalElements <= 0" class="data-empty">
      <span>저장된 비밀번호가 없습니다.</span>
      <router-link to="/password/new" class="new">
        <edit-icon width="16" height="16" />
        <span>새롭게 추가하기</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import query from '@/api'
import InputH from '@/components/Input'
import ListBox from '@/views/parts/ListBox'
import SearchIcon from '@/assets/feather-icons/Search'
import EditIcon from '@/assets/feather-icons/Edit'

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
  computed: {
  },
  methods: {
    load() {
      query({
        url: '/password/all',
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
  margin-top: 50px;
}

.data-empty {
  //opacity: var(--lighten-opacity);
  color: var(--text-lighten-color);

  .new {
    text-decoration: none;
    color: var(--primary-color);
    display: inline-flex;
    align-items: center;
    margin: 0px 10px;
  }
}
</style>
