// User model
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  isDisabled: boolean;
  createdDate: Date;
  updatedDate: Date;
}