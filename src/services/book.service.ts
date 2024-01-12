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
import { CreateBookDto, UpdateBookDto } from 'src/dtos/books/book.dto';
import IBookRepository from 'src/repositories/Book/book.repository.contract';

@Injectable()
export class BookService {
  constructor(
    @Inject('IBookRepository')
    private readonly bookRepository: IBookRepository,
  ) {}

  async createBook(payload: CreateBookDto, imagem: Express.Multer.File | null) {
    try {
      const imagePath = path.join(__dirname, '..', 'upload', 'files');

      if (!fs.existsSync(imagePath)) {
        fs.mkdirSync(imagePath, { recursive: true });
      }

      // Lógica para processar a imagem
      let imagemPath: string | null = null;

      if (imagem) {
        const fileName = `${Date.now()}_${imagem.originalname}`;
        imagemPath = path.join(imagePath, fileName);
        fs.writeFileSync(imagemPath, imagem.buffer);
      }

      // Lógica para salvar no banco (você deve ajustar para o seu modelo)
      const createdBook = await this.bookRepository.create({
        ...payload,
        imagem: imagemPath, // Aqui você está salvando o caminho completo. Ajuste conforme necessário.
      });

      return createdBook;
    } catch (error) {
      // Manipulação de erros
      throw new BadRequestException('Erro ao processar a requisição');
    }
  }

  async listAll(page: Page, filters?: any): Promise<PageResponse<any>> {
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
    return await this.bookRepository.update(payload);
  }

  async delete(id: number) {
    return await this.bookRepository.delete(id);
  }
}
