import { Injectable } from '@nestjs/common';
import { Page, PageResponse } from 'src/configs/database/page.model';
import { Pageable } from 'src/configs/database/pageable.service';
import { PrismaService } from 'src/configs/database/prisma.service';
import IBooksRepository from './book.repository.contract';
import { generateQueryForBook } from 'src/utils/QueriesBooks';
import { CreateBookDto, FilterBookDto } from 'src/dtos/books/book.dto';

@Injectable()
export class BookRepository extends Pageable<any> implements IBooksRepository {
  constructor(private readonly repository: PrismaService) {
    super();
  }

  async findAll(
    page: Page,
    filters?: FilterBookDto,
  ): Promise<PageResponse<any>> {
    const condition = generateQueryForBook(filters);

    const items = await this.repository.livro.findMany({
      ...this.buildPage(page),
      where: {
        ...condition,
        deletedAt: null,
      },
    });

    const total = await this.repository.livro.count({
      where: {
        ...condition,
        deletedAt: null,
      },
    });

    return this.buildPageResponse(items, total);
  }

  async create(data: any): Promise<any> {
    console.log('data', data);
    return this.repository.livro.create({
      data,
    });
  }

  update(id: string, data: any): Promise<any> {
    console.log('data :', data);
    return this.repository.livro.update({
      data: {
        ...data,
      },
      where: {
        id: id,
      },
    });
  }

  delete(id: string): Promise<any> {
    return this.repository.livro.update({
      where: { id: id },
      data: { deletedAt: new Date() },
    });
  }
}
