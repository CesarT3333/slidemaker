import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Entity } from 'typeorm';

import Usuario from './usuario';
import Plano from './plano';

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

    @OneToOne(type => Plano)
    @JoinColumn({
        name: 'id_plano',
        referencedColumnName: 'id'
    })
    plano: Plano;

    @Column({ name: 'quantidade_apresentacoes', })
    quantidadeApresentacoes: number;

}