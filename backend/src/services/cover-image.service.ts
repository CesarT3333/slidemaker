import { Injectable } from '@nestjs/common';

import * as gm from 'gm';

import { ImageConfig } from 'src/interfaces/image-config';

import path = require('path');
const rootPath = path.resolve(__dirname, '..');
const fromRoot = relPath => path.resolve(rootPath, relPath);

@Injectable()
export class CoverImageService {

  async producesImage(conf: ImageConfig, callback) {

    const fontsPaths: string = fromRoot('./image-cover-files/fonts');
    const templatesPaths: string = fromRoot('./image-cover-files/templates');

    gm.subClass({ imageMagick: true });

    const gmBuilder = gm(`${templatesPaths}/${conf.imageName}`)
      .fill(`${conf.title.fill}`)
      .font(`${fontsPaths}/${conf.title.font}`, conf.title.fontSize);

    if (conf.title.center) {
      gmBuilder.gravity('Center');
    }

    await gmBuilder.drawText(conf.title.x, conf.title.y, conf.title.text)
      .fontSize(conf.subTitle.fontSize)
      .fill(conf.subTitle.fill)
      .font(conf.subTitle.font)
      .drawText(conf.subTitle.x, conf.subTitle.y, conf.subTitle.text)
      .write('./poc_resized.png', err => {
        callback();
      });

  }

}
