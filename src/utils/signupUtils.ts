import { RequestSignup, ExtraInfo } from '@/types/request/auth';
import { AuthFormValues } from '@/types/form/auth';

// 전화번호 형식 변환 함수 (auth.ts 예시에 맞춤: 010-1234-5678)
const formatPhoneNumber = (phone: string): string => {
  // 숫자만 추출
  const numbers = phone.replace(/\D/g, '');

  // 010-1234-5678 형식으로 변환
  if (numbers.length === 11 && numbers.startsWith('010')) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
      7,
      11,
    )}`;
  }

  // 기본적으로 입력된 값 반환
  return phone;
};

export const transformSignupData = (
  formData: AuthFormValues,
): RequestSignup => {
  // 전화번호 형식 변환
  const formattedExtraInfo: ExtraInfo = {
    ...formData.extraInfo,
    phone: formatPhoneNumber(formData.extraInfo.phone), // Ex:) 010-1234-5678
  };

  // passwordConfirm과 authCode는 API에 전송하지 않음
  // extraInfo와 survey만 포함하여 RequestSignup 구조로 반환
  return {
    extraInfo: formattedExtraInfo,
    survey: formData.survey,
  };
};

// 폼 데이터 검증
export const validateSignupData = (formData: AuthFormValues): string[] => {
  const errors: string[] = [];
  const { extraInfo } = formData;

  if (!extraInfo.email) errors.push('이메일을 입력해주세요');
  if (!extraInfo.password) errors.push('비밀번호를 입력해주세요');
  if (!extraInfo.name) errors.push('이름을 입력해주세요');
  if (!extraInfo.nickname) errors.push('닉네임을 입력해주세요');
  if (!extraInfo.birthdate) errors.push('생년월일을 선택해주세요');
  if (!extraInfo.gender) errors.push('성별을 선택해주세요');
  if (!extraInfo.phone) errors.push('전화번호를 입력해주세요');

  return errors;
};
