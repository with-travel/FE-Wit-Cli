const authNavigations = {
  AUTH_HOME: 'authHome',
  AUTH_SERVER_LOGIN: 'authServerLogin',
  AUTH_SIGNUP_FLOW_STACK: 'authSignupFlowStack',

  KAKAO: 'Kakao',
} as const;

const authFlowNavigations = {
  AUTH_SERVER_SIGNUP_EMAIL: 'authServerSignupEmail',
  AUTH_SERVER_SIGNUP_ADDITIONAL_INFO: 'authServerSignupAdditionalInfo',
  AUTH_SERVER_SIGNUP_PHONE_AUTHORIZATION: 'authServerSignupPhoneAuthorization',
} as const;

export { authNavigations, authFlowNavigations };
