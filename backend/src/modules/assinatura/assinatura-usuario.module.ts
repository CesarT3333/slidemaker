import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AssinaturaUsuarioRepository } from '../../repository/assinatura-usuario.repository';
import { AssinaturaUsuarioService } from '../../services/assinatura-usuario.service';
import { AssinaturaUsuarioController } from './assinatura-usuario.controller';
import { AssinaturaUsuario } from '../../db/models/assinatura-usuario';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AssinaturaUsuario,
            AssinaturaUsuarioRepository
        ]),
        UsuarioModule
    ],
    controllers: [AssinaturaUsuarioController],
    providers: [AssinaturaUsuarioService],
    exports: [AssinaturaUsuarioService]
})
export class AssinaturaUsuarioModule { }
