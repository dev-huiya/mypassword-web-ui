<template>
  <div class="page-container">

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
      />
      <button-h
        v-if="isEdit"
        label="수정"
        color="primary"
        disabled=""
      />
      <button-h
        v-if="isEdit"
        label="삭제"
        color="primary"
        disabled=""
      />
    </div>

  </div>
</template>

<script>
import InputH from '@/components/Input'
import ButtonH from '@/components/Button'
export default {
  name: 'password-detail-page',
  components: { ButtonH, InputH },
  data() {
    return {
      data: {
        url: '',
        username: '',
        password: '',
      },
      isEdit: false,
    }
  },
  mounted() {
    this.isEdit = this.$route?.path?.indexOf('new') <= -1
  },
  computed: {
    disableSave() {
      return !(this.data.url !== '' && this.data.username !== '' && this.data.password !== '')
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
  margin-top: 20px;

  .button-container {
    width: 100%;

    @media only screen and (min-width: 1024px) {
      width: 150px;
    }
  }
}
</style>
