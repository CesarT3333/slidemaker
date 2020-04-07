import { InjectRepository } from '@nestjs/typeorm';
import { Controller } from '@nestjs/common';

import { UsuarioRepository } from '../../repository/usuario.repository';
import { resources } from '../../util/resources';

@Controller(resources.USUARIOS)
export class UsuarioController {

    constructor(
        @InjectRepository(UsuarioRepository)
        private readonly usuarioRepository: UsuarioRepository,
    ) { }

    // @Post()
    // create(@Body() dogDto: DogDto) {
    //     return this.dogRepository.createDog(dogDto)
    // }
}