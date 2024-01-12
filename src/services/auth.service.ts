// auth.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(nome: string, senha: string): Promise<any> {
    const user = await this.usersService.findOne(nome);

    console.log('Usuario ', user);
    console.log('nome ', nome);
    console.log('senha ', senha);
    console.log('user && user.senha === senha ', user && user.senha === senha);

    if (user && user.senha === senha) {
      const { senha, ...result } = user;
      return result;
    }

    return null;
  }

  generateJwtToken(user: any): string {
    return this.jwtService.sign({ sub: user.id, nome: user.nome });
  }
}
