import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'covers' })
export class Cover {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @Column({ name: 'sub_title' })
  subTitle: string;

  themeId: number;
  imageBlob?: Buffer;

}
