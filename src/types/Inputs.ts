export interface SignUpInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type LoginInputs = {
  email: string;
  password: string;
};
