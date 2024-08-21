export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  name: string;
  confirmPassword?: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
}
