<style scoped lang="less">
.input-container {
  position: relative;
  background-color: var(--background-secondary-color);
  border-radius: 5px;
  padding: 20px 10px 5px 10px;
  margin: 10px 0px;

  &:focus-within {
    outline-style: auto;

    & .password-show {
      opacity: 1;
    }
  }

  .isOpen {
    top: 5px;
    transform: translateY(0px);
    font-size: 0.8em;
    opacity: 0.5;
  }

  input {
    width: 100%;
    background: none;
    border: none;
    outline: none;

    &:focus + label {
      .isOpen();
    }

    // TODO: 작동 안하는 이유 찾아볼 것 2022-09-08 04:01 Hawon Kim
    &:-webkit-autofill,
    &:-webkit-autofill:focus {
      background-color: #000 !important;
    }
  }

  label {
    font-size: 0.9em;
    opacity: 0.7;
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    transition-duration: 0.3s;
    line-height: 20px;

    &.isOpen {
    }
  }

  .password-show {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: none;
    color: var(--primary-color);
    opacity: 0;
  }
}
</style>

<template>
  <div
    class="input-container"
    :class="{
      isOpen
    }"
    @click="$refs.input.focus()"
  >
    <input
      ref="input"
      v-model="model"
      :type="type !== 'password' ? type : isPasswordShow === false ? 'password' : 'text'"
      @focusin="isFocus = true; hasOpen()"
      @focusout="isFocus = false; hasOpen()"
      v-bind="$attrs"
    />
    <label
      :class="{
         isOpen
      }"
    >{{ placeholder || label }}</label>
    <button
      v-if="type == 'password'"
      @click="changeShowAtPassword"
      @keydown="changeShowAtPassword"
      class="password-show"
    >
      <component :is="isPasswordShow ? 'eye-off-icon' : 'eye-icon'" />
    </button>
  </div>
</template>

<script>
import EyeIcon from '@/assets/feather-icons/Eye'
import EyeOffIcon from '@/assets/feather-icons/EyeOff'

export default {
  name: 'input-h',
  components: { EyeOffIcon, EyeIcon },
  props: {
    modelValue: {
      required: true,
    },

    type: {
      require: true,
    },
    placeholder: {},
    label: {},
  },
  data() {
    return {
      isFocus: false,
      isOpen: false,
      isPasswordShow: false,
    }
  },
  watch: {
    modelValue() {
      this.hasOpen()
    },
  },
  methods: {
    hasOpen() {
      if(this.isFocus === false && this.modelValue !== '') {
        this.isOpen = true
      } else {
        this.isOpen = false
      }
    },
    changeShowAtPassword(e) {
      if(e.type === 'click') {
        this.isPasswordShow = !this.isPasswordShow
      } else if(e.type === 'keydown') {
        if(e.key === 'Enter' || e.key === ' ') {
          this.isPasswordShow = !this.isPasswordShow
          e.preventDefault()
        } else if(e.key !== 'Tab') {
          // 다음 커서로 넘기기
          // Tab은 기본 기능이 다음 커서로 넘어가므로 아래 코드 작동시키지 않음 2022-09-08 04:09 Hawon Kim
          const focussableElements =
            'a:not([disabled]), button:not([disabled]), input:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])'
          const domList = document.querySelectorAll(focussableElements)
          for(let i = 0; i < domList.length; i++) {
            if(domList[i].isSameNode(e.currentTarget)) {
              domList[i + 1].focus()
              break
            }
          }
        }
      }
    },
  },
  computed: {
    model: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
  },
  created() {
    this.hasOpen()
  },
}
</script>
