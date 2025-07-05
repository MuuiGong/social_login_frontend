import { createRouter, createWebHistory } from 'vue-router'
import SocialLogin from '../views/SocialLogin.vue'
import KakaoLoginPage from '../views/KakaoLoginPage.vue'
import KakaoCallback from '../views/KakaoCallback.vue'
import NaverLoginPage from '../views/NaverLoginPage.vue'
import NaverCallback from '../views/NaverCallback.vue'

const routes = [
  { path: '/', name: 'Home', component: SocialLogin },
  { path: '/kakao-login', name: 'KakaoLoginPage', component: KakaoLoginPage },
  { path: '/login/oauth2/code/kakao', name: 'KakaoCallback', component: KakaoCallback },
  { path: '/naver-login', name: 'NaverLoginPage', component: NaverLoginPage },
  { path: '/login/oauth2/code/naver', name: 'NaverCallback', component: NaverCallback }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
