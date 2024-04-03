import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @Post('/insert')
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Get('/list')
  findAll(@Query() { page = 1, row = 10 }) {
    return this.articleService.findAll(+page, +row);
  }

  @Get('/findOne/:id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
