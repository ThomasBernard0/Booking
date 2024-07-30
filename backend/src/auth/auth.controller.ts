import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('token')
  async getToken() {
    return {
      access_token: this.authService.generateToken(),
    };
  }
}
