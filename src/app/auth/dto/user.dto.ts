import { LoginResponseDto } from './login-response.dto';

export interface UserLogin extends LoginResponseDto {
  token: string;
  email: string;
}