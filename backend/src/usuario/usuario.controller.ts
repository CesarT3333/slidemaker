import { InjectRepository } from '@nestjs/typeorm';
import { Controller } from '@nestjs/common';

import { UsuarioRepository } from './usuario.repository';

@Controller()
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