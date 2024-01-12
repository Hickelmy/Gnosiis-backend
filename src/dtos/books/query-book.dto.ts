export class QueryBookDTO {
  createdAt?: {
    gte?: Date;
    lte?: Date;
  };
  livro?: {
    name?: string;
  };
}
