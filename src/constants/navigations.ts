const authNavigations = {
  AUTH_HOME: 'authHome',
  AUTH_SERVER_LOGIN: 'authServerLogin',
  AUTH_SIGNUP_FLOW_STACK: 'authSignupFlowStack',
  AUTH_TRAVEL_FORM_STACK: 'authTravelFormStack',
  KAKAO: 'Kakao',
} as const;

const authFlowNavigations = {
  AUTH_SERVER_SIGNUP_EMAIL: 'authServerSignupEmail',
  AUTH_SERVER_SIGNUP_ADDITIONAL_INFO: 'authServerSignupAdditionalInfo',
  AUTH_SERVER_SIGNUP_PHONE_AUTHORIZATION: 'authServerSignupPhoneAuthorization',
} as const;

const travelFormNavigations = {
  AUTH_TRAVEL_FORM_CHECK: 'authTravelFormCheck',
  AUTH_TRAVEL_FORM_INTRODUCE: 'authTravelFormIntroduce',
} as const;

export { authNavigations, authFlowNavigations, travelFormNavigations };
