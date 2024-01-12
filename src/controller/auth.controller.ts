// auth.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: { username: string; password: string }) {
    console.log('credentials ', credentials);

    try {
      const user = await this.authService.validateUser(
        credentials.username,
        credentials.password,
      );

      if (!user) {
        throw new HttpException(
          'Credenciais inválidas',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const token = this.authService.generateJwtToken(user);
      return { token };
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      throw new HttpException(
        'Erro ao realizar login',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
