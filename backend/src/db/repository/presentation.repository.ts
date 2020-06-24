import { Repository, EntityRepository } from 'typeorm';

import { Presentation } from '@model/presentation';

@EntityRepository(Presentation)
export class PresentationRepository
  extends Repository<Presentation> {

  getAllUserPresentation(googleId: string): Promise<Array<Presentation>> {
    return this.find({
      join: {
        alias: 'presentations',
        leftJoinAndSelect: {
          theme: 'presentations.theme',
          cover: 'presentations.cover',
        },
        leftJoin: {
          user: 'presentations.user',
        },

      }, where: qb => {
        qb.where('user.googleId = :googleId', { googleId: `${googleId}` });
      },
    });

  }

  getById(id: number): Promise<Presentation> {
    return this.findOne({
      where: { id: `${id}` },
      relations: [
        'theme',
        'cover',
      ]
    });
  }
}
