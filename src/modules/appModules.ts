import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { BookModule } from './book.module';
import { RepositoryModule } from './repository.module';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    BookModule,
    UserModule,
    RepositoryModule,
    AuthModule,
  ],
})
export class AppModule {}
