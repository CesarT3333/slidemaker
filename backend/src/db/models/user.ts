import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Presentation } from './presentation';

@Entity({ name: 'users' })
export default class User {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'google_id' })
  googleId: string;

  @Column()
  name: string;

  @Column({ name: 'family_name' })
  familyName: string;

  @Column()
  email: string;

  @OneToMany(type => Presentation, presentation => presentation.user)
  presentations: Array<Presentation>;

}
