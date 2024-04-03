import { category, user } from '@prisma/client'
import { Exclude, Expose, Transform } from 'class-transformer'
import dayjs from 'dayjs'

export default class Article {
	//包含属性
  @Expose()
  title: string
	
	//排除属性
  @Exclude()
  content: string

	//序列化类的category栏目模型只包含标题
  @Transform(({ value, key, obj, type }) => {
		return obj[key].title
  })
  category: category

	//序列化类的日期使用dayjs进行格式化
  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD'))
  createdAt: Date
  
	//构造函数用于传递序列化类数据
  constructor(options: Partial<Article>={}) {
    Object.assign(this, options)
  }
}