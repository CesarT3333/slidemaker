import { Controller, Post, Req, UseGuards, Res } from '@nestjs/common';

import { CoverService } from '@services/cover.service';
import { resources } from 'src/util/resources';
import { AuthGuard } from '@nestjs/passport';

@Controller(resources.COVER)
@UseGuards(AuthGuard('jwt'))
export class CoverController {

  constructor(
    private coverService: CoverService
  ) { }

  @Post('produces-image')
  async producesCoverImage(@Req() request, @Res() response) {
    const presentationImage = request.body;

    await this.coverService.producesCoverImage(
      presentationImage,
      () => {
        response.download('./poc_resized.png');
      }
    );
  }

}
