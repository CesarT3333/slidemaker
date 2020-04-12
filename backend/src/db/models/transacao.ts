import Usuario from './usuario';
import Plan from './plan';

export class Transacao {
    plano: Plan;
    usuario: Usuario;
    quantidadeApresentacoes: number;
}
