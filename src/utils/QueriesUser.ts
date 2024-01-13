import { addHour } from './addHours';
import { QueryUserDTO } from 'src/dtos/users/query-user.dto';
import { FilterUserDto } from 'src/dtos/users/user.dto';

export function generateQueryForUser(filters: FilterUserDto): any {
  const fields = {
    createdAt: () => {
      const initialDate = new Date(filters.createdAt);
      const finalDate = addHour(new Date(filters.createdAt), 1);
      return {
        createdAt: {
          gte: initialDate,
          lte: finalDate,
        },
      };
    },
    nome: () => ({
      nome: {
        contains: filters.nome,
      },
    }),
    email: () => ({
      email: {
        contains: filters.email,
      },
    }),
    tipo: () => ({
      tipo: {
        contains: filters.tipo,
      },
    }),
    id: () => ({
      id: filters.id,
    }),
  };

  const keysFields = Object.keys(fields);

  let query: QueryUserDTO;

  // eslint-disable-next-line @typescript-eslint/ban-types
  let queryBuilder: Function;

  for (const filter in filters) {
    if (filters[filter] && keysFields.includes(filter)) {
      queryBuilder = fields[filter];

      if (query) {
        return Object.assign(query, queryBuilder());
      }

      query = queryBuilder();
    }
  }

  return query;
}
