import { Module } from '@nestjs/common';

import { IdiomService } from '@services/idiom.service';
import { IdiomController } from './idiom.controller';

@Module({
  controllers: [IdiomController],
  providers: [IdiomService]
})
export class IdiomModule { }
