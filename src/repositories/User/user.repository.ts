import { Injectable } from '@nestjs/common';
import { Page, PageResponse } from 'src/configs/database/page.model';
import { Pageable } from 'src/configs/database/pageable.service';
import { PrismaService } from 'src/configs/database/prisma.service';
import { generateQueryForBook } from 'src/utils/QueriesBooks';
import IUserRepository from './user.repository.contract';
import { Usuario } from '@prisma/client';

@Injectable()
export class UserRepository extends Pageable<any> implements IUserRepository {
  constructor(private readonly repository: PrismaService) {
    super();
  }

  findOne(nome: string): Promise<Usuario> {
    return this.repository.usuario.findFirst({
      where: {
        nome: nome,
        deletedAt: null,
      },
    });
  }

  async findAll(page: Page, filters?: any): Promise<PageResponse<any>> {
    const condition = generateQueryForBook(filters);

    const items = await this.repository.usuario.findMany({
      ...this.buildPage(page),
      where: {
        ...condition,
        deletedAt: null,
      },
    });

    const total = await this.repository.usuario.count({
      where: {
        ...condition,
        deletedAt: null,
      },
    });

    return this.buildPageResponse(items, total);
  }

  create(payload: any): Promise<any> {
    return this.repository.usuario.create({
      data: {
        ...payload,
      },
    });
  }

  update(data: any): Promise<any> {
    return this.repository.usuario.update({
      data: {
        ...data,
      },
      where: {
        id: data.id,
      },
    });
  }

  delete(id: number): Promise<any> {
    return this.repository.usuario.update({
      where: { id: id },
      data: { deletedAt: new Date() },
    });
  }
}
