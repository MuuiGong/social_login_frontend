<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo-section">
        <div class="main-logo">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#667eea"/>
          </svg>
        </div>
        <h1 class="title">소셜 로그인</h1>
        <p class="subtitle">간편하게 소셜 계정으로 로그인하세요</p>
      </div>
      
      <div class="login-section">
        <!-- 카카오 로그인 버튼 -->
        <button @click="goKakaoLogin" class="social-login-btn kakao-btn">
          <svg class="btn-icon" width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="8" fill="#FEE500"/>
            <text x="20" y="25" text-anchor="middle" font-size="15" font-family="Arial, sans-serif" fill="#3C1E1E" font-weight="bold">kakao</text>
          </svg>
          카카오로 로그인
        </button>

        <!-- 네이버 로그인 버튼 -->
        <button @click="goNaverLogin" class="social-login-btn naver-btn">
          <svg class="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z" fill="currentColor"/>
          </svg>
          네이버로 로그인
        </button>

        <!-- 구글 로그인 버튼 -->
        <button @click="goGoogleLogin" class="social-login-btn google-btn">
          <svg class="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          구글로 로그인
        </button>

        <!-- 애플 로그인 버튼 -->
        <button @click="goAppleLogin" class="social-login-btn apple-btn">
          <svg class="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="currentColor"/>
          </svg>
          애플로 로그인
        </button>
        
        <div class="divider">
          <span class="divider-text">또는</span>
        </div>
        
        <div class="info-section">
          <div class="info-item">
            <span class="info-icon">🔒</span>
            <span class="info-text">안전한 OAuth 인증</span>
          </div>
          <div class="info-item">
            <span class="info-icon">⚡</span>
            <span class="info-text">빠른 로그인</span>
          </div>
          <div class="info-item">
            <span class="info-icon">🛡️</span>
            <span class="info-text">개인정보 보호</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SocialLogin',
  methods: {
    goKakaoLogin() {
      // 카카오 로그인 페이지로 이동
      this.$router.push('/kakao-login');
    },
    goNaverLogin() {
      // 네이버 로그인 페이지로 이동
      this.$router.push('/naver-login');
    },
    goGoogleLogin() {
      // 구글 로그인 로직 (나중에 구현)
      console.log('구글 로그인');
    },
    goAppleLogin() {
      // 애플 로그인 로직 (나중에 구현)
      console.log('애플 로그인');
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.login-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo-section {
  margin-bottom: 40px;
}

.main-logo {
  margin-bottom: 20px;
  display: inline-block;
  padding: 15px;
  background: #667eea;
  border-radius: 50%;
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}

.title {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin: 0 0 10px 0;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 16px;
  color: #666;
  margin: 0;
  line-height: 1.5;
}

.login-section {
  margin-top: 30px;
}

.social-login-btn {
  width: 100%;
  padding: 16px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  margin-bottom: 12px;
}

.social-login-btn:hover {
  transform: translateY(-2px);
}

.social-login-btn:active {
  transform: translateY(0);
}

.btn-icon {
  flex-shrink: 0;
}

/* 카카오 버튼 */
.kakao-btn {
  background: #FEE500;
  color: #3C1E1E;
  box-shadow: 0 4px 12px rgba(254, 229, 0, 0.3);
}

.kakao-btn:hover {
  background: #FDD835;
  box-shadow: 0 8px 20px rgba(254, 229, 0, 0.4);
}

/* 네이버 버튼 */
.naver-btn {
  background: #03C75A;
  color: white;
  box-shadow: 0 4px 12px rgba(3, 199, 90, 0.3);
}

.naver-btn:hover {
  background: #02B351;
  box-shadow: 0 8px 20px rgba(3, 199, 90, 0.4);
}

/* 구글 버튼 */
.google-btn {
  background: white;
  color: #757575;
  border: 1px solid #dadce0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.google-btn:hover {
  background: #f8f9fa;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* 애플 버튼 */
.apple-btn {
  background: #000000;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.apple-btn:hover {
  background: #333333;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}

.divider {
  margin: 30px 0;
  position: relative;
  text-align: center;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e0e0e0;
}

.divider-text {
  background: white;
  padding: 0 15px;
  color: #999;
  font-size: 14px;
  position: relative;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.info-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.info-item:hover {
  background: #e9ecef;
  transform: translateX(5px);
}

.info-icon {
  font-size: 18px;
}

.info-text {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
    margin: 10px;
  }
  
  .title {
    font-size: 24px;
  }
  
  .subtitle {
    font-size: 14px;
  }
  
  .social-login-btn {
    padding: 14px 20px;
    font-size: 15px;
  }
}
</style> 