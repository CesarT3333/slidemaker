import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Entity } from 'typeorm';

import Usuario from './usuario';
import Plan from './plan';

@Entity({ name: 'assinaturas' })
export class AssinaturaUsuario {

    @PrimaryGeneratedColumn()
    id?: number;

    @OneToOne(type => Usuario)
    @JoinColumn({
        name: 'id_usuario',
        referencedColumnName: 'id'
    })
    usuario: Usuario;

    @OneToOne(type => Plan)
    @JoinColumn({
        name: 'id_plano',
        referencedColumnName: 'id'
    })
    plano: Plan;

    @Column({ name: 'quantidade_apresentacoes', })
    quantidadeApresentacoes: number;

}