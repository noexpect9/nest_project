import { Controller, Post, UnprocessableEntityException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadDecorator, fileMimetypeFilter, Image, Document } from './upload.decorator'

@Controller('upload')
export class UploadController {
  @Post('/image')
  @Image()
  upload(@UploadedFile() file: Express.Multer.File) {
    return file
  }

  @Post('/file')
  @Document()
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file
  }
}
