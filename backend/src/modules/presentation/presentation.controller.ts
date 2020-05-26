import { Controller, UseGuards, Post, Req, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PresentationService } from '@services/presentation.service';
import { Presentation } from '@model/presentation';
import { resources } from '../../util/resources';
import User from '@model/user';

@UseGuards(AuthGuard('jwt'))
@Controller(resources.PRESENTATIONS)
export class PresentationController {

  constructor(
    private presentationService: PresentationService
  ) { }

  @Post()
  create(@Req() request) {
    const presentation: Presentation = request.body;

    const baererToken: string =
      request?.headers?.authorization?.replace('Bearer ', '');

    const googleAccessToken: string = request?.headers?.google_access_token;

    presentation.user = <User>{
      googleId: request.user.profileId,
      authorizationToken: baererToken,
      googleAccessToken
    };

    return this.presentationService.create(presentation);
  }

  @Get()
  getAllUserPresentation(@Req() request): Promise<Array<Presentation>> {
    return this.presentationService.getAllUserPresentation(request.user.profileId);
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<Presentation> {
    return this.presentationService.getById(id);
  }

}
