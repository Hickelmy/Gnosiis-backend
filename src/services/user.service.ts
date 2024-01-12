import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Page, PageResponse } from 'src/configs/database/page.model';
import { UpdateBookDto } from 'src/dtos/books/book.dto';
import { CreateUserDto } from 'src/dtos/users/user.dto';
import IUserRepository from 'src/repositories/User/user.repository.contract';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async create(payload: CreateUserDto): Promise<any> {
    return await this.userRepository.create(payload);
  }

  async listAll(page: Page, filters?: any): Promise<PageResponse<any>> {
    const data = await this.userRepository.findAll(page, filters);

    if (data.items.length === 0) {
      throw new HttpException(
        'Não existem dados de Grupos',
        HttpStatus.NOT_FOUND,
      );
    }
    return data;
  }

  async update(id: string, payload: UpdateBookDto): Promise<any> {
    return await this.userRepository.update(payload);
  }

  async delete(id: number) {
    return await this.userRepository.delete(id);
  }

  async findOne(nome: string): Promise<any> {
    return await this.userRepository.findOne(nome);
  }
}
