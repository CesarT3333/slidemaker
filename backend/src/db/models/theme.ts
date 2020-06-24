import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'themes' })
export class Theme {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column({ name: 'google_id_img' })
  googleIdImg: string;

  @Column({ name: 'google_id_presentation' })
  googleIdPresentation: string;

  @Column({ name: 'image_name' })
  imageName?: string;

}
