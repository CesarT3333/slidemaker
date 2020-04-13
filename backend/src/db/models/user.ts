import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Presentation } from './presentation';

@Entity({ name: 'usuario' })
export default class User {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'google_id' })
  googleId: string;

  @Column()
  nome: string;

  @Column({ name: 'sobre_nome' })
  sobreNome: string;

  @Column()
  email: string;

  @Column({ name: 'created_at' })
  createdAt?: Date;

  @Column({ name: 'updated_at' })
  updatedAt?: Date;

  @OneToMany(type => Presentation, presentation => presentation.user)
  presentations: Array<Presentation>;


}
