import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }), AuthModule],

  // providers: [AppService],
})
export class AppModule {}
