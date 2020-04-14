import { Controller, UseGuards, Post, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PresentationService } from '../../services/presentation.service';
import { Presentation } from '../../db/models/presentation';
import { resources } from '../../util/resources';
import User from '../../db/models/user';

@UseGuards(AuthGuard('jwt'))
@Controller(resources.PRESENTATIONS)
export class PresentationController {

  constructor(
    private presentationService: PresentationService
  ) { }

  @Post()
  create(@Req() request) {
    const presentation: Presentation = request.body;
    presentation.user = <User>{ googleId: request.user.profileId }
    return this.presentationService.create(presentation);
  }

}
