import { Controller, UseGuards, Post, Req, Get, Param, Delete } from '@nestjs/common';
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

  @Delete(':id')
  deletePresentation(@Req() request, @Param() params): Promise<any> {

    const user = <User>{ googleAccessToken: request?.headers?.google_access_token };
    const idPresentation: number = params.id;

    return this.presentationService.deletePresentation(user, idPresentation);
  }

  @Get()
  async getAllUserPresentation(@Req() request): Promise<Array<Presentation>> {
    return await this.presentationService.getAllUserPresentation(
      request.user.profileId,
      request?.headers?.google_access_token
    );
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<Presentation> {
    return this.presentationService.getById(id);
  }

}
