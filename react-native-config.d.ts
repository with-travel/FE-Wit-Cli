declare module 'react-native-config' {
  export interface NativeConfig {
    SERVER_BASEURL: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
