<template>
  <div class="password-container">
    <div class="box">
      <div>
        <h3>URL</h3>
        <input-h v-model="data.url" label="URL" />
      </div>
      <div>
        <h3>ID</h3>
        <input-h v-model="data.username" label="ID" aria-autocomplete="none" />
      </div>
      <div>
        <h3>비밀번호</h3>
        <input-h v-model="data.password" label="Password" type="password" autocomplete="new-password" />
      </div>
    </div>

    <div class="footer">
      <button-h
        v-if="!isEdit"
        label="저장"
        color="primary"
        :disabled="disableSave"
        @click="save"
      />
      <button-h
        v-if="isEdit"
        label="수정"
        color="primary"
        :disabled="disableModify"
        @click="modify"
      />
      <button-h
        v-if="isEdit"
        label="삭제"
        color="primary"
        @click="del"
      />
    </div>
  </div>
</template>

<script>
import InputH from '@/components/Input'
import ButtonH from '@/components/Button'
import { isValidUrl } from '@/utils'
import query from '@/api'
import { clientToServer, serverToClient } from '@/utils/Encrypt'
import _ from 'lodash'

export default {
  name: 'password-component',
  components: { ButtonH, InputH },
  props: {
    password: {
      type: Object,
      default: null,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      data: {
        id: null,
        url: '',
        username: '',
        password: '',
      },
      isModify: false,
    }
  },
  watch: {
    data: {
      deep: true,
      handler(newD, prevD) {
        console.log('run', newD, prevD)
        this.isModify = true
      },
    },
  },
  mounted() {
    if(!_.isEmpty(this.password)) {
      const { id, url, username = '', password = '' } = this.password

      this.data = {
        id,
        url,
        username: serverToClient(username || ''),
        password: serverToClient(password || ''),
      }
      setTimeout(() => {
        this.isModify = false
      }, 100)
    }
  },
  methods: {
    save() {
      const url = new URL(this.data.url)

      query({
        url: '/password/new',
        method: 'post',
        data: {
          url: this.data.url,
          username: clientToServer(this.data.username),
          password: clientToServer(this.data.password),
        },
      }).then(res => {
        this.$router.push(`/password/${url.hostname}`)
      })
    },
    modify() {
      const url = new URL(this.data.url)

      query({
        url: `/password/${this.data.id}`,
        method: 'put',
        data: {
          url: this.data.url,
          username: clientToServer(this.data.username),
          password: clientToServer(this.data.password),
        },
      }).then(res => {
        this.$router.push(`/password/${url.hostname}`)
        this.isModify = false
      })
    },
    del() {
      query({
        url: `/password/${this.data.id}`,
        method: 'delete',
      }).then(res => {
        this.$router.push('/')
      })
    },
  },
  computed: {
    disableSave() {
      return !(this.data.url !== '' && isValidUrl(this.data.url) && this.data.username !== '' && this.data.password !== '')
    },
    disableModify() {
      return !(this.isModify && isValidUrl(this.data.url))
    },
  },
}
</script>

<style scoped lang="less">
.box {
  box-shadow: var(--color-shadow-medium);
  background-color: var(--background-primary-color);
  border-radius: 7px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
  gap: 20px;

  .button-container {
    width: 100%;

    @media only screen and (min-width: 1024px) {
      width: 150px;
    }
  }
}
</style>
