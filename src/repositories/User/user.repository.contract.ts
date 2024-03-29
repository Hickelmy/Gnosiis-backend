import { Page, PageResponse } from 'src/configs/database/page.model';
import { CreateUserDto, UpdateUserDto } from '../../dtos/users/user.dto';

export default interface IUserRepository {
  findAll(page: Page, filters?: UpdateUserDto): Promise<PageResponse<any>>;
  create(data: CreateUserDto): Promise<any>;

  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<any>;
  findOne(nome: string): Promise<any>;
  findById(id: string): Promise<any>;
}
