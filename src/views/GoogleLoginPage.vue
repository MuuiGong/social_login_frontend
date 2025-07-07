<template>
  <div class="google-login-container">
    <div class="google-login-card">
      <div class="logo-section">
        <div class="google-logo">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </div>
        <h1 class="title">구글 로그인</h1>
        <p class="subtitle">구글 계정으로 간편하게 로그인하세요</p>
      </div>
      
      <div class="login-section">
        <!-- 구글 로그인 버튼 -->
        <button @click="goGoogleLogin" class="google-login-btn">
          <svg class="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          구글로 로그인
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
  name: 'GoogleLoginPage',
  methods: {
    goGoogleLogin() {
      // 구글 OAuth 2.0 REST API 방식
      const CLIENT_ID = '376774774273-5do2k4e5r3k13mgjdfam4csprajporr9.apps.googleusercontent.com';
      const REDIRECT_URI = 'http://localhost:5173/login/oauth2/code/google';
      const SCOPE = 'email';
      
      // 백엔드에 보낼 redirect URL을 URL-Safe Base64로 인코딩
      const REDIRECT_URL = this.encodeUrlSafeBase64(REDIRECT_URI); // URL-Safe Base64 인코딩
      
      // OAuth 제공자용 state에 redirect URL 포함
      localStorage.setItem('google_oauth_state', REDIRECT_URL);
      
      const googleAuthUrl =
        `https://accounts.google.com/o/oauth2/v2/auth?response_type=code` +
        `&client_id=${CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
        `&scope=${encodeURIComponent(SCOPE)}` +
        `&state=${REDIRECT_URL}`;
      
      console.log('구글 로그인 URL:', googleAuthUrl);
      console.log('CLIENT_ID:', CLIENT_ID);
      console.log('REDIRECT_URI:', REDIRECT_URI);
      console.log('SCOPE:', SCOPE);
      console.log('STATE:', REDIRECT_URL);
      
      window.location.href = googleAuthUrl;
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
.google-login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #4285F4 0%, #34A853 100%);
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.google-login-card {
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

.google-logo {
  margin-bottom: 20px;
  display: inline-block;
  padding: 15px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 8px 16px rgba(66, 133, 244, 0.3);
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

.google-login-btn {
  width: 100%;
  padding: 16px 24px;
  background: white;
  color: #757575;
  border: 1px solid #dadce0;
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.google-login-btn:hover {
  background: #f8f9fa;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.google-login-btn:active {
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