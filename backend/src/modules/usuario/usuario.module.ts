import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UsuarioRepository } from '../../repository/usuario.repository';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioController } from './usuario.controller';
import Usuario from '../../db/models/usuario';

@Module({
    imports: [
        TypeOrmModule.forFeature([Usuario, UsuarioRepository])
    ],
    controllers: [UsuarioController],
    providers: [UsuarioService],
    exports: [UsuarioService]
})
export class UsuarioModule { }
