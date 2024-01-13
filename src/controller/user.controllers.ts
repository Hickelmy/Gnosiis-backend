import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Query,
  HttpCode,
  Put,
} from '@nestjs/common';
import { Page, PageResponse } from 'src/configs/database/page.model';
import {
  CreateUserDto,
  FilterUserDto,
  UpdateUserDto,
} from 'src/dtos/users/user.dto';
import { UserService } from 'src/services/user.service';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query() page: Page,
    @Query() filters: FilterUserDto,
  ): Promise<PageResponse<any>> {
    console.log('page', page);
    console.log('filters', filters);

    return await this.userService.listAll(page, filters);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateUserDto): Promise<any> {
    return await this.userService.create(payload);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('id') id: string,
    @Body() payload: UpdateUserDto,
  ): Promise<any> {
    return await this.userService.update(id, payload);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<any> {
    return await this.userService.delete(id);
  }
}
