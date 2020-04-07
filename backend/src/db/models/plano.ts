import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'plano' })
export default class Plano {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @Column({ name: 'quantitativo_descricao' })
    quantitativoDescricao: string;

    @Column({ name: 'quantitativo_quantidade' })
    quantitativoValor: number;

    @Column()
    valor: number;
    
    @Column()
    atributos: string;

}
