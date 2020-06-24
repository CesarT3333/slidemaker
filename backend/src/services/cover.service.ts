import { Injectable } from '@nestjs/common';

import { ImageConfig } from 'src/interfaces/image-config';
import { CoverImageService } from './cover-image.service';
import { imageConfigs } from 'src/util/conf-images';
import { ThemeService } from './theme.service';
import { Cover } from '@model/cover';

@Injectable()
export class CoverService {

  constructor(
    private coverImageService: CoverImageService,
    private themeService: ThemeService
  ) { }

  async producesCoverImage(presentationImage: Cover, callback) {
    const imageName = await this.themeService
      .getImageNameBy(presentationImage.themeId);

    const imageConfigSelected: ImageConfig = imageConfigs
      .find(ic => ic.imageName === imageName);

    imageConfigSelected.title.text = presentationImage.title;
    imageConfigSelected.subTitle.text = presentationImage.subTitle;

    await this.coverImageService
      .producesImage(imageConfigSelected, callback);

  }

}
