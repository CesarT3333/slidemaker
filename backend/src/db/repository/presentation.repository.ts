import { Repository, EntityRepository } from 'typeorm';

import { Presentation } from '@model/presentation';

@EntityRepository(Presentation)
export class PresentationRepository
  extends Repository<Presentation> {

  getAllUserPresentation(googleId: string) {
    return this.find({
      join: {
        alias: 'presentations',
        leftJoin: {
          user: 'presentations.user'
        },

      }, where: qb => {
        qb.where('user.googleId = :googleId', { googleId: `${googleId}` });
      },
    });

  }
}
