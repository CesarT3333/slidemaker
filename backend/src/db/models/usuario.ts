import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'usuario' })
export default class Usuario {

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

}
