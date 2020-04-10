import { Controller } from '@nestjs/common';

import { resources } from '../../util/resources';

@Controller(resources.TRANSACOES)
export class TransacaoController { }
