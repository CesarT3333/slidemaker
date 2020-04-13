import { Controller, UseGuards, Post, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PresentationService } from '../../services/presentation.service';
import { Presentation } from '../../db/models/presentation';
import { resources } from '../../util/resources';

@UseGuards(AuthGuard('jwt'))
@Controller(resources.PRESENTATIONS)
export class PresentationController {

  constructor(
    private presentationService: PresentationService
  ) { }

  @Post()
  create(@Req() request) {
    const presentation: Presentation = request.body;
    console.log(presentation);
    // signature.usuario = <User>{ googleId: request.user.profileId }
    // this.presentationService.create()
  }

}
