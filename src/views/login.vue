<template>
  <div class="login-container">

    <h2>Welcome back!</h2>
    <h4>Login</h4>

    <input-h label="email" v-model="email"/>
    <input-h label="password" v-model="password" type="password"/>

    <checkbox-h label="자동 로그인" v-model="autoLogin" />

    <button-h label="Login" color="primary" :disabled="email == '' || password == ''"
              :auto-loading="true" @click="login"/>

    <router-link to="/join">아직 계정이 없으신가요? <span>회원가입</span></router-link>
  </div>
</template>

<script>
import store from '@/store/index.ts'
import InputH from '@/components/Input'
import ButtonH from '@/components/Button'
import CheckboxH from '@/components/Checkbox'
import query from '@/api'
import { setToken } from '@/utils/Auth'

export default {
  name: 'login-page',
  components: { CheckboxH, ButtonH, InputH },
  data() {
    return {
      email: '',
      password: '',
      autoLogin: false,
    }
  },
  methods: {
    login() {
      query({
        url: '/auth/signin',
        method: 'post',
        data: {
          email: this.email,
          password: this.password,
          autoLogin: this.autoLogin,
        },
      }).then(response => {
        setToken(response.token, response.publicKey).then(response => {
          this.$router.push(this.$route.query.redirect || '/')
        })
      })
    },
  },
}
</script>

<style scoped lang="less">

.login-container{
  min-height: calc(100vh - 60px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--background-primary-color);

  h4{
    margin: 5px 0px 20px;
    color: var(--primary-color);
  }
  .input-container, .button-container, .checkbox-container{
    width: 80%;

    @media only screen and (min-width: 1024px) {
      width: 400px;
    }
  }
  a{
    text-decoration: none;
    color: var(--text-color);
    font-size: 0.9em;
    opacity: var(--lighten-opacity);

    span{
      text-decoration: underline;
      color: var(--primary-color);
      font-weight: 500;
    }
  }
}
</style>
