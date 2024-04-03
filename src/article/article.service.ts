import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from '../prisma.service';
import * as _ from 'lodash';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createArticleDto: CreateArticleDto) {
    return await this.prisma.article.create({
      data: {
        ..._.omit(createArticleDto, ['categoryId']),
        category: { connect: { id: +createArticleDto.categoryId } },
      },
    })
  }

  async findAll(page: number, row: number) {
    const data = await this.prisma.article.findMany({
      skip: (page - 1) * row,
      take: row,
      include: {
        category: true
      }
    })
    const total = await this.prisma.article.count()
    return {
      list: data,
      pageNum: Math.ceil(total / row),
      pageSize: row,
      total
    }
  }

  async findOne(id: number) {
    return this.prisma.article.findUnique({ where: { id }, include: { category: true } })
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.prisma.article.update({
      where: { id },
      data: {
        ..._.omit(updateArticleDto, ['_id']),
        category: {
          connect: {
            id: +updateArticleDto.categoryId
          }
        }
      }
    })
    return article
  }

  async remove(id: number) {
    return await this.prisma.article.delete({ where: { id } })
  }
}
