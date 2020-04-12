import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Entity } from 'typeorm';

import Plan from './plan';
import User from './user';

@Entity({ name: 'assinaturas' })
export class AssinaturaUsuario {

  @PrimaryGeneratedColumn()
  id?: number;

  @OneToOne(type => User)
  @JoinColumn({
    name: 'id_usuario',
    referencedColumnName: 'id'
  })
  usuario: User;

  @OneToOne(type => Plan)
  @JoinColumn({
    name: 'id_plano',
    referencedColumnName: 'id'
  })
  plano: Plan;

  @Column({ name: 'quantidade_apresentacoes', })
  quantidadeApresentacoes: number;

}
