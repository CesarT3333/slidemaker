import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';

import { IsInt } from "class-validator";

import { DataSourceTextPresentationEnum } from './enum/data-source-text-presentation.enum';
import { IdiomEnum } from './enum/idiom.enum';
import User from './user';

@Entity({ name: 'presentation' })
export class Presentation {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  term: string;

  @IsInt()
  @Column({ name: 'amount_slides' })
  amountOfSlides: number;

  @Column()
  idiom: IdiomEnum;

  @Column({ name: 'data_source' })
  dataSource: DataSourceTextPresentationEnum

  @Column()
  text: string;

  @ManyToOne(type => User, user => user.presentations)
  @JoinColumn({
    name: 'id_usuario',
    referencedColumnName: 'id'
  })
  user: User;

}
