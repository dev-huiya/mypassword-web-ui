<template>
  <header-parts/>
  <div class="wrap">
    <router-view/>
  </div>
</template>

<style lang="less">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700&display=swap');

* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  font-family: 'Noto Sans KR', sans-serif;
}
html, body {
  height: 100%;
}

:root {
  // 기본 텍스트 색상
  --text-color: #333;
  // 텍스트 반전 색상 (배경 진할때 용)
  --text-invert-color: #FFF;
  // 옅은 텍스트 색상
  --text-lighten-color: #777;
  // 메인 컬러
  --primary-color: #655cb7;
  // 메인 두번째 컬러
  --secondary-color: #edebff;
  // 배경 메인 컬러
  --background-primary-color: #FFF;
  // 배경 두번째 컬러
  --background-secondary-color: #f4f6f8;
  // input background 등
  --background-third-color: #f6f5ff;
  // 밝게 만드는 용 투명도 값
  --lighten-opacity: 0.85;
  // alert 용 색상들
  --blue: #1483ff;
  --red: #ff4949;
  //--red: #f66e84;
  --green: #45ccb1;
  --yellow: #ffc241;
  --black: #4c4c4c;

  --mobile-size: 1024px;

  //github에서 쌔벼옴
  --color-shadow-small: 0 1px 0 rgba(27,31,36,0.04);
  --color-shadow-medium: 0 3px 6px rgba(140,149,159,0.15);
  --color-shadow-large: 0 8px 24px rgba(140,149,159,0.2);
  --color-shadow-extra-large: 0 12px 28px rgba(140,149,159,0.3);
}
@media (prefers-color-scheme: dark) {
  :root {
    // 기본 텍스트 색상
    --text-color: #d7d7d7;
    // 텍스트 반전 색상 (배경 진할때 용)
    --text-invert-color: #FFF;
    // 옅은 텍스트 색상
    --text-lighten-color: #959595;
    // 메인 컬러
    --primary-color: #655cb7;
    // 메인 두번째 컬러
    --secondary-color: #6d64c3;
    // 배경 메인 컬러
    --background-primary-color: #31313c;
    // 배경 두번째 컬러
    --background-secondary-color: #383944;
    // input background 등
    --background-third-color: #f6f5ff;

    --color-shadow-small: 0 1px 0 rgba(27,31,36,0.04);
    --color-shadow-medium: 0 3px 6px rgba(0,0,0,0.15);
    --color-shadow-large: 0 8px 24px rgba(0,0,0,0.2);
    --color-shadow-extra-large: 0 12px 28px rgba(0,0,0,0.3);
  }
}
body {
  background-color: var(--background-secondary-color);
  color: var(--text-color);
}

.wrap {
  width: 100%;

  @media only screen and (max-width: 1043px) { // 1023 + 20px
    padding: 0px 20px;
  }

  @media only screen and (min-width: 1024px) {
    width: var(--mobile-size);
    margin: 0 auto;
  }
}

// for mosha toast
.mosha__toast {
  min-height: inherit;
  min-width: inherit;
  padding: 10px 20px;

  &.info { background-color: var(--black); }
  &.warning { background-color: var(--yellow); }
  &.success { background-color: var(--green); }
  &.danger { background-color: var(--red); }
}
.mosha__toast__content__text {
  font-weight: normal;
}

// project custom style
.page-container {
  padding-top: 50px;
  padding-bottom: 100px;
}
.link-with-icon {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.box {
  box-shadow: var(--color-shadow-medium);
  background-color: var(--background-primary-color);
  border-radius: 7px;
}
</style>
<script>
import HeaderParts from '@/views/parts/Header'
import { loadToken } from '@/utils/Auth'
// component styles
import 'mosha-vue-toastify/dist/style.css'

export default {
  components: { HeaderParts },
  mounted() {
    loadToken()
  },
}
</script>
