import { ExtraInfo, Survey } from '@/types/request/auth';

// React Hook Form용 회원가입 폼 타입
export type AuthFormValues = {
  // API 요청과 동일한 구조 (실제 전송되는 데이터)
  extraInfo: ExtraInfo;
  survey: Survey;

  // 폼 검증용 필드 (API에 전송되지 않음)
  passwordConfirm?: string; // 비밀번호 확인용 (선택적)
  authCode?: string; // 휴대폰 인증코드 (선택적)
};
