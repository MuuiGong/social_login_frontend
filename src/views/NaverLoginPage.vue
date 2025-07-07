<template>
  <div class="naver-login-container">
    <div class="naver-login-card">
      <div class="logo-section">
        <div class="naver-logo">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z" fill="#03C75A"/>
          </svg>
        </div>
        <h1 class="title">네이버 로그인</h1>
        <p class="subtitle">네이버 계정으로 간편하게 로그인하세요</p>
      </div>
      
      <div class="login-section">
        <!-- 네이버 로그인 버튼 -->
        <button @click="goNaverLogin" class="naver-login-btn">
          <svg class="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z" fill="currentColor"/>
          </svg>
          네이버로 로그인
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
  name: 'NaverLoginPage',
  methods: {
    goNaverLogin() {
      // 네이버 OAuth 2.0 REST API 방식
      const CLIENT_ID = 'c943YPmMR8bflLezMJGz';
      const REDIRECT_URI = 'http://localhost:5173/login/oauth2/code/naver';
      
      // 백엔드에 보낼 redirect URL을 URL-Safe Base64로 인코딩
      const REDIRECT_URL = this.encodeUrlSafeBase64(REDIRECT_URI); // URL-Safe Base64 인코딩
      
      // OAuth 제공자용 state에 redirect URL 포함
      localStorage.setItem('naver_oauth_state', REDIRECT_URL);
      
      const naverAuthUrl =
        `https://nid.naver.com/oauth2.0/authorize?response_type=code` +
        `&client_id=${CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
        `&state=${REDIRECT_URL}`;
      
      window.location.href = naverAuthUrl;
    },
    
    generateRandomString() {
      const array = new Uint32Array(28);
      window.crypto.getRandomValues(array);
      return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
    },
    
    // URL-Safe Base64 인코딩
    encodeUrlSafeBase64(str) {
      return btoa(str)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
    },
    
    goBack() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.naver-login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #03C75A 0%, #02B351 100%);
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.naver-login-card {
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

.naver-logo {
  margin-bottom: 20px;
  display: inline-block;
  padding: 15px;
  background: #03C75A;
  border-radius: 50%;
  box-shadow: 0 8px 16px rgba(3, 199, 90, 0.3);
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

.naver-login-btn {
  width: 100%;
  padding: 16px 24px;
  background: #03C75A;
  color: white;
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
  box-shadow: 0 4px 12px rgba(3, 199, 90, 0.3);
}

.naver-login-btn:hover {
  background: #02B351;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(3, 199, 90, 0.4);
}

.naver-login-btn:active {
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
  padding: 12px 24px;
  background: transparent;
  color: #666;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.back-btn:hover {
  background: #f8f9fa;
  border-color: #ccc;
}

.back-icon {
  font-size: 16px;
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
}

.info-icon {
  font-size: 16px;
}

.info-text {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}
</style> 