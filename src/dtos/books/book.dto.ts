import { IsString, IsInt, IsNumber, IsDate, IsOptional } from 'class-validator';

export class CreateBookDto {
  @IsString()
  nome: string;

  @IsString()
  nomeDoAutor: string;

  // @IsDate()
  lancamento: Date;

  @IsString()
  tipo: string;

  @IsString()
  editora: string;

  @IsString()
  genero: string;

  @IsInt()
  anoEdicao: number;

  @IsInt()
  numEdicao: number;

  @IsNumber()
  preco: number;

  @IsString()
  descricao: string;
}

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  nomeDoAutor?: string;

  @IsOptional()
  @IsDate()
  lancamento?: Date;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsString()
  editora?: string;

  @IsOptional()
  @IsString()
  genero?: string;

  @IsOptional()
  @IsInt()
  anoEdicao?: number;

  @IsOptional()
  @IsInt()
  numEdicao?: number;

  @IsOptional()
  @IsNumber()
  preco?: number;

  @IsOptional()
  @IsString()
  descricao?: string;
}

export class FilterBookDto {
  id?: string;
  nome?: string;
  nomeDoAutor?: string;
  tipo?: string;
  editora?: string;
  genero?: string;
  numEdicao?: number;
  preco?: number;
  createdAt?: Date;
}
