<style scoped lang="less">
.button-container {
  margin: 10px 0px;

  button {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background: none;
    border: none;
    font-size: 1em;
    cursor: pointer;

    &:hover,
    &:focus {
      filter: brightness(110%);
    }

    &:disabled {
      //background-color: ;
      filter: grayscale(50%) opacity(0.8);
    }

    &.text {
      // 배경 없고 글자색만 메인 컬러
      background-color: var(--background-primary-color);
      color: var(--primary-color);
    }

    &.primary {
      // 메인컬러 배경에 글자색은 글자색
      background-color: var(--primary-color);
      color: var(--background-primary-color);

      @media (prefers-color-scheme: dark) {
        color: var(--text-color);
      }
    }

    &.secondary {
      // 연한 배경에 글자색은 메인 컬러
      background-color: var(--background-secondary-color);
      color: var(--primary-color);
    }

    &.outline {
      background-color: var(--background-primary-color);
      color: var(--primary-color);
      box-shadow: 0px 0px 0px 1px var(--primary-color);
      // border: 1px solid var(--primary-color);
    }

    .v-spinner {
      font-size: 0px;
      opacity: 0.7;
    }
  }
}
</style>

<template>
  <div class="button-container">
    <button
      :class="{
        [color]: colors.indexOf(color) !== -1
      }"
      :style="{
        backgroundColor: color, // 유효하지 않은 값은 사라짐
        width,
        height,
      }"
      :disabled="disabled || isLoading_"
      v-bind="$attrs"
    >
      <span
        v-if="!isLoading_"
        :style="{
          color: getTextColor,
        }"
      >
        {{ label }}
        <slot />
      </span>
      <scale-loader
        v-if="isLoading_"
        :loading="true"
        :color="getTextColor"
        height="15px" width="3px"
      />
      <!-- scale-loader가 색상이 동적으로 바뀌지 않는 문제가 있음. computed 문제 아님 -->
    </button>
  </div>
</template>

<script>
import { contrastColor, getCSSColorVariable } from '@/utils'
import ScaleLoader from 'vue-spinner/src/ScaleLoader'

const colors = ['text', 'primary', 'secondary', 'outline']

export default {
  name: 'button-h',
  inheritAttrs: false,
  // ↑ vue는 세팅된 모든 attr을 자식 컴포넌트의 root에 상속시킴. 그걸 막는 옵션.
  // v-bind="$attrs"를 통해서 원하는 위치에 attr을 상속시킬 수 있음
  // 여기서는 @click 이벤트를 button에 상속시키기 위해 사용함.
  components: { ScaleLoader },
  props: {
    label: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    autoLoading: {
      type: Boolean,
      default: false,
    },
    /**
     * 서버 요청을 기다릴 시간(ms)
     * 이 시간 이후에는 로딩 표시를 띄운다.
     */
    loadingTimeout: {
      type: Number,
      default: 200,
    },
    color: {
      type: String,
      default: 'text',
      validator(value) {
        // 이미 지정된 색깔이거나 css에서 사용가능한 색이면 입력을 허용함.
        return colors.indexOf(value) > 0 || CSS.supports('color', value)
      },
    },
    width: {
      type: [String, Number],
      default: '100%',
    },
    height: {
      type: [String, Number],
      default: '50px',
    },
  },
  data() {
    return {
      colors,
      /**
       * 로딩 표시용 내부 변수
       */
      isLoading_: false,
      interval: null,
    }
  },
  watch: {
    // computed의 getIsLoading 함수 리턴값이 변경되었을때 실행됨 (=그 함수 내부에서 사용된 변수가 바뀌면 실행)
    getIsLoading(isLoading__) {
      // 로딩 표시 지연용 함수
      // 이를 통해 200ms 이하의 빠른 요청에 대해서는 로딩 표시를 하지 않는다.
      // 빠른 요청일 경우 로딩표시가 깜박이는게 눈에 보이기 때문에 이러한 지연 전략이 필요함.

      if(isLoading__ === false) {
        // 로딩 종료는 즉시
        this.isLoading_ = isLoading__

        if(this.interval != null) {
          // 만약 인터벌이 있다면 초기화
          clearInterval(this.interval)
          this.interval = null
        }
      } else {
        // 로딩 시작일 경우 인터벌을 통해 지연전략
        this.interval = setInterval(() => {
          this.isLoading_ = isLoading__
        }, this.loadingTimeout)
      }
    },
  },
  methods: {
  },
  computed: {
    getCSSColorVariable,
    getTextColor() {
      if(this.color === 'text' || this.color === 'secondary' || this.color === 'outline') {
        // 버튼 색이 text면 글자는 --primary-color(보라색) 적용
        return getCSSColorVariable('--primary-color')
      } else if(this.color === 'primary') {
        // 버튼 색이 primary면 글자는 --background-primary-color 적용 (회색)
        return getCSSColorVariable('--background-primary-color')
      } else if(CSS.supports('color', this.color)) {
        // css에서 사용가능한 색이면 (ex. black, #000) 대비색 적용
        return contrastColor(this.color)
      } else {
        // 기본적으로는 기본 텍스트 색 적용
        return getCSSColorVariable('--text-color')
      }
    },
    getIsLoading() {
      // props isLoading이 true면 무조건 로딩 표시
      // 단, props autoLoading이 true 일때는 네트워크 전송이 감지되면 true
      return this.isLoading || (this.$store.state.network.isLoading && this.autoLoading)
    },
  },
}
</script>
