<template>
  <div class="join-container">

    <div class="page-contents">
      <h1>Let's sign you up!</h1>
      <h4>당신의 안전한 비밀번호를 위한 myPassword에 오신 걸 환영합니다.</h4>

      <div class="input-container">
        <h4>프로필 이미지를 선택해주세요 :)</h4>
        <profile-uploader v-model="data.profileImage" :size="100"/>
      </div>

      <div class="input-container">
        <h4>닉네임을 입력해주세요.</h4>
        <input-h placeholder="nickname" v-model="data.nickname" @change="checkNickname"/>
        <!--page1 validation-->
        <div class="succeed" v-if="confirm.nickname === true && verify.nickname === true">
          <circle-check-icon width="18" height="18"/>
          사용할 수 있는 닉네임입니다.
        </div>
        <div class="failed" v-if="confirm.nickname === false && verify.nickname === false">
          <circle-x-icon width="18" height="18"/>
          2 ~ 10자의 영문(대소문자), 한글 및 숫자로만 입력이 가능합니다.
        </div>
        <div class="failed" v-if="confirm.nickname === true && verify.nickname === false">
          <circle-x-icon width="18" height="18"/>
          중복된 닉네임입니다.
        </div>
      </div>

      <div class="input-container">
        <h4>아이디로 사용할 이메일을 입력해주세요.</h4>
        <input-h placeholder="email" v-model="data.email" @change="checkEmail"/>
        <!--page2 validation-->
        <div class="succeed" v-if="confirm.email === true && verify.email === true">
          <circle-check-icon width="18" height="18"/>
          사용할 수 있는 아이디입니다.
        </div>
        <div class="failed" v-if="confirm.email === false && verify.email === false">
          <circle-x-icon width="18" height="18"/>
          이메일 형식을 다시 한번 확인해주세요.
        </div>
        <div class="failed" v-if="confirm.email === true && verify.email === false">
          <circle-x-icon width="18" height="18"/>
          중복된 이메일입니다.
        </div>
      </div>
      <div class="input-container">
        <h4>특수문자, 문자, 숫자 포함 형태로 8~15자리 이내의 암호를 입력해주세요.</h4>
        <input-h placeholder="password" type="password" v-model="data.password" @change="checkPassword"/>
        <div class="succeed" v-if="confirm.password === true">
          <circle-check-icon width="18" height="18"/>
          사용 가능한 비밀번호입니다.
        </div>
        <div class="failed" v-if="confirm.password === false">
          <circle-x-icon width="18" height="18"/>
          사용할 수 없는 비밀번호입니다.
        </div>
      </div>
      <div class="input-container">
        <h4>비밀번호를 다시 확인해주세요.</h4>
        <input-h placeholder="confirm password" type="password" v-model="checkDuplPassword" @change="checkPassword"/>
        <div class="succeed" v-if="verify.password === true">
          <circle-check-icon width="18" height="18"/>
          입력하신 비밀번호와 일치합니다.
        </div>
        <div class="failed" v-if="verify.password === false">
          <circle-x-icon width="18" height="18"/>
          입력하신 비밀번호와 일치하지 않습니다.
        </div>
      </div>
    </div>

    <div class="footer">
      <button-h color="primary" :disabled="disabled" @click="submission">
        <div class="button-label">
          <span>회원가입</span>
        </div>
      </button-h>
    </div>
  </div>
</template>

<script>
import ProfileUploader from '@/components/ProfileUploader'
import ButtonH from '@/components/Button'
import ArrowRightIcon from '@/assets/feather-icons/ArrowRight'
import ArrowLeftIcon from '@/assets/feather-icons/ArrowLeft'
import InputH from '@/components/Input'
import CircleXIcon from '@/assets/feather-icons/CIrcleX'
import CircleCheckIcon from '@/assets/feather-icons/CircleCheck'
import _ from 'lodash'
import query from '@/api'
import CheckboxH from '@/components/Checkbox'
import CircleIcon from '@/assets/feather-icons/Circle'
import ChevronRightIcon from '@/assets/feather-icons/ChevronRight'
import { getCSSColorVariable } from '@/utils'

export default {
  name: 'join-page',
  components: {
    CircleCheckIcon,
    CircleXIcon,
    InputH,
    ButtonH,
    ProfileUploader,
  },
  data() {
    return {
      data: {
        profileImage: null,
        nickname: '',
        email: '',
        password: '',
        adAgree: false,
      },
      confirm: {
        nickname: false,
        email: false,
        password: false,
        privacy: false,
        tos: false,
      },
      verify: {
        nickname: false,
        email: false,
        password: false,
      },
      checkDuplPassword: '',
    }
  },
  watch: {
  },
  computed: {
    disabled() {
      return !(this.confirm.nickname && this.verify.nickname && this.confirm.email && this.confirm.password && this.verify.password)
    },
  },
  methods: {
    checkNickname: _.debounce(function (e) {
      const reg = /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,10}$/g
      this.confirm.nickname = reg.test(this.data.nickname)
      this.verify.nickname = false
      if(this.confirm.nickname) {
        this.verifyNickname()
      }
    }),
    checkEmail: _.debounce(function () {
      const reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
      this.confirm.email = reg.test(this.data.email)
      this.verify.email = false
      if(this.confirm.email) {
        this.verifyEmail()
      }
    }),
    checkPassword: _.debounce(function () {
      const reg = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/
      this.confirm.password = reg.test(this.data.password)
      if(this.confirm.password) {
        this.verifyPassword()
      }
    }),
    verifyNickname() {
      query({
        url: '/account/signup-check/nickname',
        methods: 'GET',
        data: {
          nickName: this.data.nickname,
        },
      }).then(res => {
        console.log(res)
        this.verify.nickname = res.usage || false
      }).catch(error => {
        console.log(error)
      })
    },
    verifyEmail() {
      query({
        url: '/account/signup-check/email',
        methods: 'GET',
        data: {
          email: this.data.email,
        },
      }).then(res => {
        this.verify.email = res.usage || false
      }).catch(error => {
        console.log(error)
      })
    },
    verifyPassword() {
      this.verify.password = _.isEqual(this.data.password, this.checkDuplPassword)
    },
    submission() {
      const data = new FormData()
      data.append('profile', this.data.profileImage)
      data.append('nickName', this.data.nickname)
      data.append('email', this.data.email)
      data.append('password', this.data.password)
      data.append('adAgree', this.data.adAgree)

      query({
        url: '/account/signup',
        method: 'POST',
        data: data,
      }).then(res => {
        this.$router.push('/login')
      }).catch(error => {
        console.log(error)
      })
    },
    getCSSColorVariable,
  },
}
</script>

<style scoped lang="less">

.join-container {
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--background-primary-color);

  .page-contents {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .input-container {
    margin: 20px 0px;
    text-align: center;

    .succeed, .failed {
      font-size: 0.8em;
      display: flex;
      gap: 5px;
      align-items: flex-start;
      justify-content: center;
    }

    .succeed {
      color: var(--green);
    }

    .failed {
      color: var(--red);
    }
  }

  h1 {
    margin-bottom: 30px;
    margin-top: 10px;
  }

  h4 {
    margin: 5px 0px 25px;
    text-align: center;
    word-break: keep-all;
    color: var(--text-color);
    opacity: var(--lighten-opacity);
    font-weight: 300;
  }

  img {
    width: 50%;
    margin-top: 30px;
  }

  .input-container, .button-container, .checkbox-container {
    width: 100%;

    @media only screen and (min-width: 1024px) {
      width: 400px;
    }
  }

  .button-label {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;

    span {
      font-weight: 500;
    }
  }

  .footer {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    padding: 0 20px;
    gap: 20px;
    margin-bottom: 100px;
  }
}
</style>
