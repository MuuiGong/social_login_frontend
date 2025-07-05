<template>
  <div class="kakao-callback-container">
    <div class="kakao-callback-card">
      <div class="logo-section">
        <div class="kakao-logo">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="8" fill="#FEE500"/>
            <text x="20" y="25" text-anchor="middle" font-size="15" font-family="Arial, sans-serif" fill="#3C1E1E" font-weight="bold">kakao</text>
          </svg>
        </div>
        <h2 class="title">카카오 로그인 결과</h2>
      </div>
      
      <div class="content-section">
        <div v-if="accessToken" class="result success">
          <span class="icon">✅</span>
          <div class="msg">카카오 로그인 성공!</div>
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
  name: 'KakaoCallback',
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
      
      // state 검증 (CSRF 공격 방지)
      const savedState = localStorage.getItem('kakao_oauth_state');
      if (this.state !== savedState) {
        this.error = 'State 검증 실패: CSRF 공격 가능성';
        return;
      }
      
      if (error) {
        this.error = `${error}: ${errorDescription}`;
      }
      
      // state 사용 후 삭제
      localStorage.removeItem('kakao_oauth_state');
    },
    
    async exchangeToken() {
      if (!this.code) {
        this.error = '인가 코드가 없습니다.';
        return;
      }
      
      try {
        // 백엔드로 인가 코드를 전송하여 액세스 토큰 교환 (GET 방식)
        const redirectUri = 'http://localhost:5173/login/oauth2/code/kakao';
        const state = btoa(redirectUri); // base64 인코딩

        const response = await fetch(
          `http://localhost:8080/auth/login/kakao?code=${encodeURIComponent(this.code)}&state=${encodeURIComponent(state)}`
        );
        
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
        const response = await fetch('http://localhost:8080/auth/verify/kakao', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            access_token: this.accessToken
          })
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
.kakao-callback-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #FEE500 0%, #FDD835 100%);
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.kakao-callback-card {
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

.kakao-logo {
  margin-bottom: 20px;
  display: inline-block;
  padding: 15px;
  background: #FEE500;
  border-radius: 50%;
  box-shadow: 0 8px 16px rgba(254, 229, 0, 0.3);
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
  padding: 18px 0 0 0;
}

.icon {
  font-size: 32px;
}

.msg {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.token-box {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 14px;
  color: #666;
  word-break: break-all;
  margin-top: 6px;
}

.token {
  font-family: 'Menlo', 'Monaco', 'Consolas', monospace;
  color: #8d6e63;
}

.code {
  font-family: 'Menlo', 'Monaco', 'Consolas', monospace;
  color: #1976d2;
  font-size: 15px;
}

.desc {
  color: #b71c1c;
  font-size: 13px;
  margin-top: -6px;
}

.action-btn {
  margin-top: 10px;
  padding: 12px 24px;
  background: #FEE500;
  color: #3C1E1E;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(254, 229, 0, 0.15);
}

.action-btn:hover {
  background: #FDD835;
  color: #3C1E1E;
}

.back-btn {
  margin-top: 20px;
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
}

.back-btn:hover {
  background: #e9ecef;
  transform: translateY(-2px);
}

.back-icon {
  font-size: 18px;
}

@media (max-width: 480px) {
  .kakao-callback-card {
    padding: 24px 8px 18px 8px;
    margin: 10px;
  }
  
  .title {
    font-size: 20px;
  }
  
  .msg {
    font-size: 16px;
  }
  
  .icon {
    font-size: 26px;
  }
}
</style> 