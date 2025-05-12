export class RegisterUserDto {
  name: string;
  email: string;
  password: string;

  constructor(user: any) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
  }
}
