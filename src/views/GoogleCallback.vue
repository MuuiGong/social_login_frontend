<template>
  <div class="google-callback-container">
    <div class="google-callback-card">
      <div class="logo-section">
        <div class="google-logo">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </div>
        <h2 class="title">구글 로그인 결과</h2>
      </div>
      
      <div class="content-section">
        <div v-if="accessToken" class="result success">
          <span class="icon">✅</span>
          <div class="msg">구글 로그인 성공!</div>
          <div class="token-box">액세스 토큰: <span class="token">{{ accessToken }}</span></div>
          <button @click="sendToBackend" class="action-btn">백엔드로 토큰 보내기</button>
        </div>
        <div v-else-if="error" class="result error">
          <span class="icon">❌</span>
          <div class="msg">로그인 실패</div>
          <div class="desc">{{ error }}</div>
        </div>
        <div v-else-if="code" class="result info">
          <span class="icon">ℹ️</span>
          <div class="msg">인가 코드: <span class="code">{{ code }}</span></div>
          <button @click="exchangeToken" class="action-btn">액세스 토큰 교환</button>
        </div>
        <div v-else class="result idle">
          <span class="icon">⏳</span>
          <div class="msg">처리 중...</div>
        </div>
      </div>
      
      <button @click="goBack" class="back-btn">
        <span class="back-icon">←</span>
        로그인 페이지로 돌아가기
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoogleCallback',
  data() {
    return {
      code: null,
      state: null,
      accessToken: null,
      error: null
    };
  },
  mounted() {
    this.handleCallback();
  },
  methods: {
    handleCallback() {
      const params = new URLSearchParams(window.location.search);
      this.code = params.get('code');
      this.state = params.get('state');
      const error = params.get('error');
      const errorDescription = params.get('error_description');
      
      // 디버깅을 위한 모든 파라미터 로깅
      console.log('=== 콜백 파라미터 디버깅 ===');
      console.log('전체 URL:', window.location.href);
      console.log('전체 쿼리스트링:', window.location.search);
      console.log('code:', this.code);
      console.log('state:', this.state);
      console.log('error:', error);
      console.log('error_description:', errorDescription);
      
      // state 검증 (CSRF 공격 방지)
      const savedState = localStorage.getItem('google_oauth_state');
      console.log('저장된 state:', savedState);
      if (savedState && this.state !== savedState) {
        console.warn('State 불일치:', { received: this.state, saved: savedState });
        // 개발 환경에서는 경고만 표시하고 계속 진행
        if (process.env.NODE_ENV === 'production') {
          this.error = 'State 검증 실패: CSRF 공격 가능성';
          return;
        }
      }
      
      if (error) {
        this.error = `${error}: ${errorDescription}`;
      }
      
      // state에서 redirect URL 디코딩 (백엔드에서 처리할 값)
      if (this.state) {
        try {
          // URL-Safe Base64 디코딩 (백엔드와 동일한 방식)
          const padded = this.state + '='.repeat((4 - this.state.length % 4) % 4);
          const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');
          const decodedUrl = atob(base64);
          console.log('백엔드로 전송될 redirect URL:', decodedUrl);
          // 여기서 redirect URL을 사용할 수 있습니다
        } catch (error) {
          console.warn('State 디코딩 실패:', error);
        }
      } else {
        console.log('State가 없습니다. 기본값 사용');
      }
      
      // state 사용 후 삭제
      localStorage.removeItem('google_oauth_state');
    },
    
    async exchangeToken() {
      if (!this.code) {
        this.error = '인가 코드가 없습니다.';
        return;
      }
      
      try {
        // 백엔드로 인가 코드를 전송하여 액세스 토큰 교환 (GET 방식)
        const response = await fetch(`https://api.humanzipyo.com/auth/login/google?code=${this.code}&state=${this.state}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) throw new Error('네트워크 오류');
        const result = await response.json();
        
        this.accessToken = result.access_token;
        console.log('토큰 교환 성공:', result);
      } catch (err) {
        this.error = '토큰 교환 실패: ' + err.message;
      }
    },
    
    async sendToBackend() {
      try {
        const response = await fetch(`https://api.humanzipyo.com/auth/verify/google?access_token=${this.accessToken}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) throw new Error('네트워크 오류');
        const result = await response.json();
        console.log('백엔드 응답:', result);
        alert('백엔드 전송 성공!');
      } catch (err) {
        alert('백엔드 요청 실패: ' + err.message);
      }
    },
    
    goBack() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.google-callback-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #4285F4 0%, #34A853 100%);
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.google-callback-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  padding: 40px 30px 32px 30px;
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
  margin-bottom: 24px;
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
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 18px;
  letter-spacing: -0.5px;
}

.content-section {
  margin-top: 10px;
}

.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
}

.result.success {
  background: #f0f9ff;
  border: 1px solid #0ea5e9;
}

.result.error {
  background: #fef2f2;
  border: 1px solid #ef4444;
}

.result.info {
  background: #f0fdf4;
  border: 1px solid #22c55e;
}

.result.idle {
  background: #f8fafc;
  border: 1px solid #64748b;
}

.icon {
  font-size: 24px;
}

.msg {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.desc {
  font-size: 14px;
  color: #666;
  text-align: center;
}

.code {
  font-family: 'Courier New', monospace;
  background: #f1f5f9;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  word-break: break-all;
}

.token-box {
  font-size: 14px;
  color: #666;
  text-align: center;
}

.token {
  font-family: 'Courier New', monospace;
  background: #f1f5f9;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  word-break: break-all;
  display: block;
  margin-top: 8px;
}

.action-btn {
  background: #4285F4;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: #3367d6;
  transform: translateY(-1px);
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
}

.back-btn:hover {
  background: #f8f9fa;
  border-color: #ccc;
}

.back-icon {
  font-size: 16px;
}
</style> 