<template>
  <div class="profile-uploader-container">
    <img :src="getImageUrl" :width="size" :height="size"/>
    <input ref="input" type="file" @change="onFileSelect" accept="image/*" />
    <div class="tooltip-container">
      <button @click="$refs.input.click()">이미지 선택</button>
      <button @click="file = null">기본 이미지로 설정</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'profile-uploader',
  props: {
    modelValue: {
      required: true,
    },
    size: {
      type: Number,
      default: 60,
    },
  },
  data() {
    return {
      file: null,
      isOpen: false,
    }
  },
  methods: {
    onFileSelect(e) {
      if(e.target.files[0] != null) {
        this.file = e.target.files[0]
      }
    },
  },
  computed: {
    getImageUrl() {
      if(this.file == null) {
        return '/images/user-default-profile.png'
      }
      return URL.createObjectURL(this.file)
    },
  },
  watch: {
    file() {
      this.$emit('update:modelValue', this.file)
    },
  },
}
</script>

<style scoped lang="less">
.profile-uploader-container{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  img{
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
  }
  input[type=file]{
    display: none;
  }
  .tooltip-container{
    z-index: 2;
    display: flex;
    gap: 10px;

    button{
      width: 130px;
      height: 40px;
      background: none;
      border: none;
      font-size: 0.8rem;
      color: var(--text-color);
      border: 1px solid var(--secondary-color);
      border-radius: 7px;
      cursor: pointer;
      background-color: var(--background-primary-color);
      box-shadow: var(--color-shadow-extra-large);
    }

    button:nth-child(1){
      margin-bottom: 2px;
      //border-bottom: none;
    }
  }
}
</style>
