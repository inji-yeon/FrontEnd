import { useEffect, useRef, useState } from 'react';
export default function CurrentTime() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000000); // 매 1초마다 현재 날짜와 시간을 업데이트합니다.

    return () => clearInterval(intervalId);
  }, []);

  // 날짜와 시간을 '연-월-일 시:분:초' 포맷으로 변환합니다.
  return currentDateTime.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour12: false
  });
}