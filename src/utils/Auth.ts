import * as jwt from 'jsonwebtoken'
import _ from 'lodash'
import store from '@/store'
import { showToast } from '@/utils/index'
import { getErrorMessage } from '@/api/message'
import query from '@/api'
import { useRouter } from 'vue-router'
import router from '@/router'

export const setToken = (token: string, publicKey: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, publicKey, (error, tokenData) => {
      if(error && error.stack) {
        // it's an error, probably
        throw error
      }

      console.log(token, publicKey, tokenData)

      const data = _.pick(tokenData, ['userInfo'])

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      store.commit('setUser', data.userInfo)
      store.commit('setToken', {
        token,
        key: publicKey,
      })

      localStorage.setItem('token', token)
      localStorage.setItem('publicKey', publicKey)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      localStorage.setItem('refresh', tokenData?.refresh)

      resolve(true)
    })
  })
}

export const clearToken = (): void => {
  store.commit('setUser', null)
  store.commit('setToken', null)

  localStorage.removeItem('token')
  localStorage.removeItem('publicKey')
  localStorage.removeItem('refresh')
}

export const verifyToken = (): boolean => {
  const token = localStorage.getItem('token')
  const publicKey = localStorage.getItem('publicKey')
  const refresh = localStorage.getItem('refresh')

  if(!token || !publicKey) {
    return false
  }

  try {
    jwt.verify(token, publicKey)
    return true
  } catch (error) {
    // 검증 실패했을 때

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if(error.name === 'TokenExpiredError' && !!refresh) {
      // 토큰 만료 오류일때는 갱신한다.
      // eslint-disable-next-line no-unused-expressions
      refreshToken()
      return true
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    showToast(getErrorMessage(error.name), 'danger')
    clearToken()
    return false
  }
}

export const refreshToken = async () => {
  const refresh = localStorage.getItem('refresh')
  const publicKey = localStorage.getItem('publicKey')

  if(!refresh || !publicKey) {
    return false
  }

  try {
    await jwt.verify(refresh, publicKey)

    query({
      url: '/auth/refresh',
      method: 'post',
      data: {
        refreshToken: refresh,
      },
    }).then(async res => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await setToken(res.token, res.publicKey)
    }).catch(error => {
      // refresh token 조차 만료되었을때
      console.log('refresh token 검증 실패')
      console.log(error)

      router.push('/login')
    })
  } catch (e) {
    console.log('refreshToken catch', e)
    // 오류 발생시 (토큰 검증 실패, 서버 실패 등) 토큰 초기화하고 로그인 페이지로 이동
    clearToken()

    router.push('/login')
  }
}

export const loadToken = () => {
  const token = localStorage.getItem('token')
  const publicKey = localStorage.getItem('publicKey')
  const refresh = localStorage.getItem('refresh')

  if(!token || !publicKey) {
    return false
  }

  try {
    jwt.verify(token, publicKey, (error, tokenData) => {
      if(error && error.stack) {
        // it's an error, probably
        throw error
      }

      const data = _.pick(tokenData, ['userInfo'])

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      store.commit('setUser', data.userInfo)
    })
    return true
  } catch (error) {
    // 검증 실패했을 때

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if(error.name === 'TokenExpiredError' && !!refresh) {
      // 토큰 만료 오류일때는 갱신한다.
      refreshToken()
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    showToast(getErrorMessage(error.name), 'danger')
    clearToken()
  }
}
