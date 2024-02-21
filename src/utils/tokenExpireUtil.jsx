import axios from 'axios';
import { useHistory } from 'react-router-dom';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'https://your-api-base-url.com',
});

// Axios 응답 인터셉터 설정
api.interceptors.response.use(
  response => response,
  response => {
    if (response.status === 401) {
      // 상태 코드가 401인 경우 로그인 페이지로 리디렉션
      window.location = '/login'; // useHistory 훅을 사용할 수 없는 상황에서 대안
    }
    return Promise.reject(response);
  }
);
