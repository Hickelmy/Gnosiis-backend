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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from 'src/configs/database/multer-configs';
import { Page, PageResponse } from 'src/configs/database/page.model';
import { BookService } from 'src/services/book.service';
import { CreateBookDto, UpdateBookDto } from 'src/dtos/books/book.dto';

@Controller('/api/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query() page: Page,
    @Query() filters: any,
  ): Promise<PageResponse<any>> {
    return await this.bookService.listAll(page, filters);
  }

  @Post()
  async create(@Body() payload: CreateBookDto) {
    console.log('payload :', payload);
    return this.bookService.createBook(payload);
  }

  // @Post()
  // @UseInterceptors(FileInterceptor('imagem', multerConfig))
  // async create(
  //   @Body() payload: CreateBookDto,
  //   @UploadedFile() imagem: Express.Multer.File,
  // ) {
  //   console.log('payload : ', payload);

  //   return this.bookService.createBook(payload, imagem);
  // }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateGroup(
    @Param('id') id: string,
    @Body() payload: UpdateBookDto,
  ): Promise<any> {
    return await this.bookService.update(id, payload);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: number): Promise<any> {
    return await this.bookService.delete(id);
  }
}
