import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserSignatureRepository } from '../../db/repository/user-signature.repository';
import { UserSignatureService } from '../../services/user-signatureservice';
import { UserSignatureController } from './user-signature.controller';
import { UserSignature } from '../../db/models/user-signature';
import { UserModule } from '../usuario/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserSignature,
      UserSignatureRepository
    ]),
    UserModule
  ],
  controllers: [UserSignatureController],
  providers: [UserSignatureService],
  exports: [UserSignatureService]
})
export class UserSignatureModule { }
