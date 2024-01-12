export class QueryUserDTO {
  createdAt?: {
    gte?: Date;
    lte?: Date;
  };
  user?: {
    name?: string;
  };
}
