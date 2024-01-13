export class CreateUserDto {
  nome: number;
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

export class FilterUserDto {
  id?: string;
  nome?: string;
  email?: string;
  tipo?: string;
  createdAt?: Date;
}
