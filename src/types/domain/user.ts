interface User {
  id: number;
  email: string;
  nickname: string;
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
  infoChecked: boolean;
}

export type { User };
