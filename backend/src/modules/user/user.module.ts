import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserRepository } from '@repository/user.repository';
import { UserService } from '@services/user.service';
import { UserController } from './user.controller';
import User from '@model/user';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRepository])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
