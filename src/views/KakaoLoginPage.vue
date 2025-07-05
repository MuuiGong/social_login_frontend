<template>
  <div class="kakao-login-container">
    <div class="kakao-login-card">
      <div class="logo-section">
        <div class="kakao-logo">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="8" fill="#FEE500"/>
            <text x="20" y="25" text-anchor="middle" font-size="15" font-family="Arial, sans-serif" fill="#3C1E1E" font-weight="bold">kakao</text>
          </svg>
        </div>
        <h1 class="title">카카오 로그인</h1>
        <p class="subtitle">카카오 계정으로 간편하게 로그인하세요</p>
      </div>
      
      <div class="login-section">
        <!-- 카카오 로그인 버튼 -->
        <button @click="goKakaoLogin" class="kakao-login-btn">
          <svg class="btn-icon" width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="8" fill="#FEE500"/>
            <text x="20" y="25" text-anchor="middle" font-size="15" font-family="Arial, sans-serif" fill="#3C1E1E" font-weight="bold">kakao</text>
          </svg>
          카카오로 로그인
        </button>
        
        <div class="divider">
          <span class="divider-text">또는</span>
        </div>
        
        <button @click="goBack" class="back-btn">
          <span class="back-icon">←</span>
          다른 방법으로 로그인
        </button>
        
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
  name: 'KakaoLoginPage',
  methods: {
    goKakaoLogin() {
      // 카카오 OAuth 2.0 REST API 방식
      const REST_API_KEY = '6c656322cc1bcb9669fbaee86b9df89a';
      const REDIRECT_URI = 'http://localhost:5173/login/oauth2/code/kakao';
      const STATE = this.generateRandomString();
      
      // state를 localStorage에 저장 (CSRF 공격 방지)
      localStorage.setItem('kakao_oauth_state', STATE);
      
      const kakaoAuthUrl =
        `https://kauth.kakao.com/oauth/authorize?response_type=code` +
        `&client_id=${REST_API_KEY}` +
        `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
        `&state=${STATE}`;
      
      console.log('카카오 로그인 URL:', kakaoAuthUrl);
      console.log('REST_API_KEY:', REST_API_KEY);
      console.log('REDIRECT_URI:', REDIRECT_URI);
      console.log('STATE:', STATE);
      
      window.location.href = kakaoAuthUrl;
    },
    
    generateRandomString() {
      const array = new Uint32Array(28);
      window.crypto.getRandomValues(array);
      return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
    },
    
    goBack() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.kakao-login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #FEE500 0%, #FDD835 100%);
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.kakao-login-card {
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

.kakao-logo {
  margin-bottom: 20px;
  display: inline-block;
  padding: 15px;
  background: #FEE500;
  border-radius: 50%;
  box-shadow: 0 8px 16px rgba(254, 229, 0, 0.3);
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

.kakao-login-btn {
  width: 100%;
  padding: 16px 24px;
  background: #FEE500;
  color: #3C1E1E;
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
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(254, 229, 0, 0.3);
}

.kakao-login-btn:hover {
  background: #FDD835;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(254, 229, 0, 0.4);
}

.kakao-login-btn:active {
  transform: translateY(0);
}

.btn-icon {
  flex-shrink: 0;
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

.back-btn {
  width: 100%;
  padding: 16px 24px;
  background: #f8f9fa;
  color: #666;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.back-btn:hover {
  background: #e9ecef;
  transform: translateY(-2px);
}

.back-icon {
  font-size: 18px;
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
  .kakao-login-card {
    padding: 30px 20px;
    margin: 10px;
  }
  
  .title {
    font-size: 24px;
  }
  
  .subtitle {
    font-size: 14px;
  }
}
</style> 