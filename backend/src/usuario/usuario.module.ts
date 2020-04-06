import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UsuarioRepository } from './usuario.repository';
import { UsuarioController } from './usuario.controller';
import Usuario from '../db/models/usuario';
import { UsuarioService } from '../services/usuario.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Usuario, UsuarioRepository])
    ],
    controllers: [UsuarioController],
    providers: [UsuarioService],
    exports: [UsuarioService]
})
export class UsuarioModule { }
