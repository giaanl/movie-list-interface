export class LoginDto {
  email: string;
  password: string;

  constructor(login: any) {
    this.email = login.email;
    this.password = login.password;
  }
}
