<template>
  <div class="page-container">
    <note-component
      :isEdit="false"
    />
  </div>
</template>

<script>
import NoteComponent from '@/views/parts/Note'
export default {
  name: 'note-page',
  components: { NoteComponent },
}
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
