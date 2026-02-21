import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { UserRegisteredEvent } from './events/user.registered.event';
import { DatabaseModule } from '../../libs/database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [AuthController],
  providers: [
    AuthRepository, 
    AuthService, 
    UserRegisteredEvent
  ],
})
export class AuthModule {}
