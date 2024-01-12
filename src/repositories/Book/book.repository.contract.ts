import { Page, PageResponse } from 'src/configs/database/page.model';
import { CreateBookDto } from 'src/dtos/books/book.dto';

export default interface IBookRepository {
  findAll(page: Page, filters?: any): Promise<PageResponse<any>>;
  create(data: CreateBookDto): Promise<any>;

  update(data: any): Promise<any>;
  delete(id: number): Promise<any>;
}
