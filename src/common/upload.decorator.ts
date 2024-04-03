import { applyDecorators, UnsupportedMediaTypeException, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'

// 上传类型验证
export function fileMimetypeFilter(...mimes: string[]) {
  return (req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
    if (mimes.some((mime) => file.mimetype.includes(mime))) {
      callback(null, true)
    } else {
      callback(new UnsupportedMediaTypeException('文件上传类型错误'), false)
    }
  }
}
// 文件上传
export function uploadDecorator(fieldName = 'file', options: MulterOptions = {}) {
  return applyDecorators(UseInterceptors(FileInterceptor(fieldName, options)))
}

//图片上传
export function Image(field = 'file') {
  return uploadDecorator(field, {
    //上传文件大小限制
    limits: Math.pow(1024, 2) * 2,
    fileFilter: fileMimetypeFilter('image'),
  } as MulterOptions)
}

//文档上传
export function Document(field = 'file') {
  return uploadDecorator(field, {
    //上传文件大小限制
    limits: Math.pow(1024, 2) * 5,
    fileFilter: fileMimetypeFilter('file', 'application/pdf', 'application/javascript', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
  } as MulterOptions)
}