import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { IsInt } from 'class-validator';

import { DataSourceTextPresentationEnum } from './enum/data-source-text-presentation.enum';
import { Sentence } from 'src/interfaces/sentence';
import { IdiomEnum } from './enum/idiom.enum';
import { Theme } from './theme';
import { Cover } from './cover';
import User from './user';

@Entity({ name: 'presentations' })
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
  dataSource: DataSourceTextPresentationEnum;

  @Column()
  text: string;

  @ManyToOne(type => User, user => user.presentations)
  @JoinColumn({
    name: 'id_user',
    referencedColumnName: 'id'
  })
  user: User;

  @ManyToOne(type => Theme)
  @JoinColumn({
    name: 'id_theme',
    referencedColumnName: 'id'
  })
  theme: Theme;

  @OneToOne(type => Cover, { cascade: true })
  @JoinColumn({
    name: 'id_cover',
    referencedColumnName: 'id',
  })
  cover: Cover;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'id_google' })
  idGoogle: string;

  @Column({ name: 'thank_slide' })
  thankSlide: boolean;

  textToSanitize: string;
  sanitizedText: string;
  textSentences: Array<Sentence> = [];
  deletedOfGoogle?: boolean;

}
