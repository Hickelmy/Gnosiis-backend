export class CreateBookDto {
  autor: string;
  lancamento: Date;
  tipo: string;
  genero: string;
  editora: string;
  anoEdicao: number;
  numeroEdicao: number;
  preco: number;
  descricao: string;
  usuarioId: number;
}
export class UpdateBookDto {
  autor?: string;
  lancamento?: Date;
  tipo?: string;
  // generoId?: number;
  editora?: string;
  anoEdicao?: number;
  numeroEdicao?: number;
  preco?: number;
  descricao?: string;
}
