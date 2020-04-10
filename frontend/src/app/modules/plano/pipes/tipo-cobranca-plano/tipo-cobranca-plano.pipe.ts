import { PipeTransform, Pipe } from '@angular/core';

import { TipoCobrancaPlanoEnum } from 'src/app/models/enum/tipo-cobranca-plano.enum';

@Pipe({ name: 'tipoCobrancaPlanoPipe' })
export class TipoCobrancaPlanoPipe
  implements PipeTransform {

  transform(tipoCobranca: TipoCobrancaPlanoEnum): string {
    return TipoCobrancaPlanoEnum.getDescricaoTipoDeCobranca(tipoCobranca);
  }

}
