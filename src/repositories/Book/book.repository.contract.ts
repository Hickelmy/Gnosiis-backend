import { Page, PageResponse } from 'src/configs/database/page.model';
import { CreateBookDto, FilterBookDto } from 'src/dtos/books/book.dto';

export default interface IBookRepository {
  findAll(page: Page, filters?: FilterBookDto): Promise<PageResponse<any>>;
  create(data: CreateBookDto): Promise<any>;

  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<any>;
}
