<template>
  <div class="page-container">
    <note-component
      :isEdit="true"
      :note="note"
    />
  </div>
</template>

<script>
import query from '@/api'
import NoteComponent from '@/views/parts/Note'

export default {
  name: 'note-detail-page',
  components: { NoteComponent },
  data() {
    return {
      note: {},
    }
  },
  mounted() {
    this.getNote()
  },
  methods: {
    getNote() {
      query({
        url: `/note/${this.$route.params.id}`,
        method: 'GET',
      }).then(res => {
        this.note = res
      })
    },
  },
}
</script>

<style scoped>

</style>
