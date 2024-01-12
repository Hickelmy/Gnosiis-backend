export class CreateUserDto {
  nome: string;
  dataNascimento: Date;
  email: string;
  senha: string;
  tipo: string;
}

export class UpdateUserDto {
  nome?: string;
  dataNascimento?: Date;
  email?: string;
  senha?: string;
  tipo?: string;
}
