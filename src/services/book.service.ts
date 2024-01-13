import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import path from 'path';
import { Page, PageResponse } from 'src/configs/database/page.model';
import {
  CreateBookDto,
  FilterBookDto,
  UpdateBookDto,
} from 'src/dtos/books/book.dto';
import IBookRepository from 'src/repositories/Book/book.repository.contract';

@Injectable()
export class BookService {
  constructor(
    @Inject('IBookRepository')
    private readonly bookRepository: IBookRepository,
  ) {}

  async createBook(payload: CreateBookDto) {
    console.log('Service payload:', payload);

    try {
      payload.lancamento = new Date(payload.lancamento);

      const createdBook = await this.bookRepository.create(payload);

      console.log('createdBook:', createdBook);

      return createdBook;
    } catch (error) {
      throw new BadRequestException('Erro ao processar a requisição');
    }
  }

  async listAll(
    page: Page,
    filters?: FilterBookDto,
  ): Promise<PageResponse<any>> {
    const data = await this.bookRepository.findAll(page, filters);

    if (data.items.length === 0) {
      throw new HttpException(
        'Não existem dados de Grupos',
        HttpStatus.NOT_FOUND,
      );
    }
    return data;
  }

  async update(id: string, payload: UpdateBookDto): Promise<any> {
    console.log('id : ', id);
    console.log('payload : ', payload);

    return await this.bookRepository.update(id, payload);
  }

  async delete(id: string) {
    return await this.bookRepository.delete(id);
  }
}
