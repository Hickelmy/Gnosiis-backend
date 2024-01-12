import { Module } from '@nestjs/common';
import { PrismaService } from 'src/configs/database/prisma.service';
import { BookController } from 'src/controller/book.controllers';
import { BookRepository } from 'src/repositories/Book/book.repository';
import { BookService } from 'src/services/book.service';

@Module({
  controllers: [BookController],
  providers: [
    BookService,
    PrismaService,
    {
      provide: 'IBookRepository',
      useClass: BookRepository,
    },
  ],
  exports: [BookService],
})
export class BookModule {}
