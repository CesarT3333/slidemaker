import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AssinaturaUserRepository } from '../../repository/assinatura-usuario.repository';
import { AssinaturaUsuarioService } from '../../services/assinatura-usuario.service';
import { AssinaturaUsuarioController } from './assinatura-usuario.controller';
import { AssinaturaUsuario } from '../../db/models/assinatura-usuario';
import { UserModule } from '../usuario/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AssinaturaUsuario,
      AssinaturaUserRepository
    ]),
    UserModule
  ],
  controllers: [AssinaturaUsuarioController],
  providers: [AssinaturaUsuarioService],
  exports: [AssinaturaUsuarioService]
})
export class AssinaturaUsuarioModule { }
