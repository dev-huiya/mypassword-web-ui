<template>
  <div class="join-container">
    <div class="slide-container" :style="{ marginLeft: pageIndex * -100 + '%' }">
      <div class="page-container">
        <img class="cat" src="/images/smile-cat-pink.svg"/>
        <h1>Let's sign you up!</h1>
        <h4>myRecipe.com에 오신 것을 환영합니다!</h4>
        <h4>회원가입을 진행하시면 레시피 작성과 보관이 가능해요:)</h4>
        <h4>아래의 버튼을 눌러 이용약관을 확인 후 진행해주세요.</h4>
        <!--이용약관-->
        <div class="terms-container">
          <div class="terms">
            <div @click="confirm.privacy = !confirm.privacy">
              <circle-icon :width="20" v-if="confirm.privacy === false"/>
              <circle-check-icon :width="20" :color="getCSSColorVariable('--primary-color')" v-if="confirm.privacy === true"/>
              <label>개인정보 처리방침 동의 (필수)</label>
            </div>
            <router-link to="/service/terms#개인정보처리방침">
              <span>자세히 보기</span>
              <chevron-right-icon :width="20"/>
            </router-link>
          </div>
          <div class="terms">
            <div @click="confirm.tos = !confirm.tos">
              <circle-icon :width="20" v-if="confirm.tos === false"/>
              <circle-check-icon :width="20" :color="getCSSColorVariable('--primary-color')" v-if="confirm.tos === true"/>
              <label>이용약관 동의 (필수)</label>
            </div>
            <router-link to="/service/terms#이용약관">
              <span>자세히 보기</span>
              <chevron-right-icon :width="20"/>
            </router-link>
          </div>
          <div class="terms">
            <div @click="data.adAgree = !data.adAgree">
              <circle-icon :width="20" v-if="data.adAgree === false"/>
              <circle-check-icon :width="20" :color="getCSSColorVariable('--primary-color')" v-if="data.adAgree === true"/>
              <label>광고성 정보 수신 동의 (선택)</label>
            </div>
            <router-link to="/service/terms#광고성정보수신">
              <span>자세히 보기</span>
              <chevron-right-icon :width="20"/>
            </router-link>
          </div>
        </div>
        <!--page1-->
      </div>
      <div class="page-container">
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
      </div>
      <!--page2-->
      <div class="page-container">
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
    </div>
    <div class="footer">
      <button-h @click="pageIndex = pageIndex - 1" color="outline" v-if="pageIndex > 0">
        <div class="button-label">
          <arrow-left-icon width="22"/>
          <span>Previous</span>
        </div>
      </button-h>
      <button-h @click="pageIndex = pageIndex + 1" color="primary" v-if="pageIndex >= 0 && pageIndex < 2"
                :disabled="disabled">
        <div class="button-label">
          <span>Next</span>
          <arrow-right-icon width="22"/>
        </div>
      </button-h>
      <button-h color="primary" v-if="pageIndex == 2" :disabled="disabled" @click="submission">
        <div class="button-label">
          <span>Submit</span>
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
    ChevronRightIcon,
    CircleIcon,
    CircleCheckIcon,
    CircleXIcon,
    InputH,
    ArrowRightIcon,
    ArrowLeftIcon,
    ButtonH,
    ProfileUploader
  },
  data() {
    return {
      pageIndex: 0,
      submit: 0,
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
    profile() {
      console.log('프로필', this.profile)
    },
  },
  computed: {
    disabled() {
      if(this.pageIndex === 0) {
        return !(this.confirm.privacy && this.confirm.tos)
      } else if(this.pageIndex === 1) {
        return !(this.confirm.nickname && this.verify.nickname)
      } else if(this.pageIndex === 2) {
        return !(this.confirm.email && this.confirm.password && this.verify.password)
      }
      return true
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
        url: '/account/available/nickname',
        methods: 'GET',
        data: {
          nickname: this.data.nickname,
        },
      }).then(res => {
        console.log(res)
        this.verify.nickname = res.isAvailable || false
      }).catch(error => {
        console.log(error)
      })
    },
    verifyEmail() {
      query({
        url: '/account/available/email',
        methods: 'GET',
        data: {
          email: this.data.email,
        },
      }).then(res => {
        this.verify.email = res.isAvailable || false
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
      data.append('nickname', this.data.nickname)
      data.append('email', this.data.email)
      data.append('password', this.data.password)
      data.append('adAgree', this.data.adAgree)

      query({
        url: '/account/join',
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
  min-height: calc(100vh - 60px - env(safe-area-inset-top) - env(safe-area-inset-bottom));
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--background-primary-color);

  .slide-container {
    display: flex;
    margin-left: 0;
    transition-duration: 0.5s;
    transition-timing-function: ease-in-out;
  }

  .page-container {
    padding: 20px;
    min-width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media only screen and (min-width: 768px) {
      min-width: var(--mobile-size);
    }

    .terms-container {
      margin-top: 40px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 5px;

      .terms {
        color: var(--text-color);
        display: flex;
        font-size: 0.9em;
        font-weight: 400;

        div {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        a {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: var(--text-color);
          opacity: var(--lighten-opacity);
          min-width: 100px;
        }
      }
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
  }
}
</style>
