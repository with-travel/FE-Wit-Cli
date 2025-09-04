import { RequestSignup, ExtraInfo, Survey } from '@/types/request/auth';

// React Hook Form 데이터를 API 요청 형식으로 변환
export const transformSignupData = (formData: any): RequestSignup => {
  // 생년월일 변환 (Date -> string)
  const birthdate = formData.birthDate
    ? formData.birthDate.toISOString().split('T')[0] // YYYY-MM-DD 형식
    : '';

  // 성별 변환 (한국어 -> 영어)
  const gender =
    formData.gender === '남자'
      ? 'MALE'
      : formData.gender === '여자'
      ? 'FEMALE'
      : '';

  const extraInfo: ExtraInfo = {
    nickname: formData.nickname || '',
    birthdate,
    gender: gender as 'MALE' | 'FEMALE',
    introduction: formData.introduce || '',
    email: formData.email || '',
    password: formData.password || '',
    name: formData.name || '',
    phone: formData.phoneNumber || '',
  };

  // 설문조사 데이터 변환
  const survey: Survey = {
    energyLevels: formData.surveys?.energyLevels || '',
    travelGoals: formData.surveys?.travelGoals || '',
    travelPaces: formData.surveys?.travelPaces || '',
    commStyles: formData.surveys?.commStyles || '',
    recordTendencies: formData.surveys?.recordTendencies || '',
    companionStyles: formData.surveys?.companionStyles || '',
    spendPatterns: formData.surveys?.spendPatterns || '',
  };

  return {
    extraInfo,
    survey,
  };
};

// 폼 데이터 검증
export const validateSignupData = (formData: any): string[] => {
  const errors: string[] = [];

  if (!formData.email) errors.push('이메일을 입력해주세요');
  if (!formData.password) errors.push('비밀번호를 입력해주세요');
  if (!formData.name) errors.push('이름을 입력해주세요');
  if (!formData.nickname) errors.push('닉네임을 입력해주세요');
  if (!formData.birthDate) errors.push('생년월일을 선택해주세요');
  if (!formData.gender) errors.push('성별을 선택해주세요');
  if (!formData.phoneNumber) errors.push('전화번호를 입력해주세요');

  return errors;
};
