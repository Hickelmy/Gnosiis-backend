import { Module } from '@nestjs/common';
import { PrismaService } from 'src/configs/database/prisma.service';
import { UserController } from 'src/controller/user.controllers';
import { UserRepository } from 'src/repositories/User/user.repository';
import { UserService } from 'src/services/user.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
