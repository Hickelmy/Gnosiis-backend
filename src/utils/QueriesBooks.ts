import { QueryBookDTO } from 'src/dtos/books/query-book.dto';
import { addHour } from './addHours';
import { FilterBookDto } from 'src/dtos/books/book.dto';

export function generateQueryForBook(filters: FilterBookDto): any {
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

    id: () => ({
      id: filters.id,
    }),
    nome: () => ({
      nome: {
        contains: filters.nome,
      },
    }),
    editora: () => ({
      editora: {
        contains: filters.editora,
      },
    }),
    genero: () => ({
      genero: {
        contains: filters.genero,
      },
    }),
    nomeDoAutor: () => ({
      nomeDoAutor: {
        contains: filters.nomeDoAutor,
      },
    }),
    numEdicao: () => ({
      numEdicao: filters.numEdicao,
    }),
    preco: () => ({
      preco: filters.preco,
    }),
  };

  const keysFields = Object.keys(fields);

  let query: QueryBookDTO;

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
