import { Page, PageResponse } from 'src/configs/database/page.model';
import { CreateUserDto } from '../../dtos/users/user.dto';

export default interface IUserRepository {
  findAll(page: Page, filters?: any): Promise<PageResponse<any>>;
  create(data: CreateUserDto): Promise<any>;

  update(data: any): Promise<any>;
  delete(id: number): Promise<any>;
  findOne(nome: string): Promise<any>;
}