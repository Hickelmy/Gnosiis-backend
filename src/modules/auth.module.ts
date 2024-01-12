import { Module } from '@nestjs/common';
import { AuthController } from '../controller/auth.controller';
import { AuthService } from '../services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user.module';
// import { JwtStrategy } from 'src/auth/JwtStrategy';
// import { JwtAuthGuard } from 'src/auth/JwtAuthGuard';
// import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'adsonmaoskgflodifkzgojisdfojinhsdójisdglojikdikjasgplklagĺk',
      signOptions: { expiresIn: '12h' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  // JwtStrategy, JwtAuthGuard,
  exports: [AuthService],

  // exports: [JwtAuthGuard],
})
export class AuthModule {}
