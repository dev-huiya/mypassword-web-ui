<template>
  <div class="note-container">
    <div class="box">
      <QuillEditor ref="quill" theme="snow" toolbar="essential" v-model:content="data.contents" content-type="delta"/>
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
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import ButtonH from '@/components/Button'
import { isValidUrl } from '@/utils'
import query from '@/api'
import { clientToServer, serverToClient } from '@/utils/Encrypt'

export default {
  name: 'note-component',
  components: { ButtonH, QuillEditor },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    note: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      data: {
        id: null,
        type: 'NOTE',
        contents: '',
      },
      isModify: false,
    }
  },
  watch: {
    note: {
      deep: true,
      handler(newD, prevD) {
        this.data = {
          id: newD.id,
          type: newD.type,
          // contents: JSON.parse(serverToClient(newD.contents)),
        }
        this.updateEditor(JSON.parse(serverToClient(newD.contents)))

        setTimeout(() => {
          this.isModify = false
        }, 100)
      },
    },
    data: {
      deep: true,
      handler(newD, prevD) {
        console.log('run', newD, prevD)
        console.log(JSON.stringify(newD.contents))
        this.isModify = true
      },
    },
  },
  computed: {
    disableSave() {
      return (JSON.stringify(this.data.contents) === '{"ops":[{"insert":"\\n"}]}' || this.data.contents === '')
    },
    disableModify() {
      return !(this.isModify)
    },
  },
  methods: {
    save() {
      query({
        url: '/note/new',
        method: 'post',
        data: {
          type: 'NOTE',
          contents: clientToServer(JSON.stringify(this.data.contents)),
        },
      }).then(res => {
        this.$router.push(`/note/${res.id}`)
      })
    },
    modify() {
      query({
        url: `/note/${this.data.id}`,
        method: 'put',
        data: {
          type: 'NOTE',
          contents: clientToServer(JSON.stringify(this.data.contents)),
        },
      }).then(res => {
        this.$router.go(0)
        this.isModify = false
      })
    },
    del() {
      query({
        url: `/note/${this.data.id}`,
        method: 'delete',
      }).then(res => {
        this.$router.push('/')
      })
    },
    updateEditor(delta) {
      this.$refs.quill.setContents(delta)
    },
  },
}
</script>

<style scoped lang="less">
.note-container {
}
.box {
  box-shadow: var(--color-shadow-medium);
  background-color: var(--background-primary-color);
  border-radius: 7px;
  padding: 20px;

  display: flex;
  flex-direction: column;
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
<style>
.ql-editor {
  height: 400px;
}
</style>
