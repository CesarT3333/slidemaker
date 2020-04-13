import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

import { DataSourceTextPresentationEnum } from './enum/data-source-text-presentation.enum';
import { IdiomEnum } from './enum/idiom.enum';
import User from './user';
import { userInfo } from 'os';

@Entity({ name: 'presentation' })
export class Presentation {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  term: string;

  @Column({ name: 'amount_slides' })
  amountOfSlides: number;

  @Column()
  idiom: IdiomEnum;

  @Column({ name: 'data_source' })
  dataSource: DataSourceTextPresentationEnum

  @ManyToOne(type => User, user => user.presentations)
  @JoinColumn({
    name: 'id_usuario',
    referencedColumnName: 'id'
  })
  user: User;

}
