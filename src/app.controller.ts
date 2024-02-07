import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { storage, fileFilter } from './upload-config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('single')
  @UseInterceptors(FileInterceptor('file', { storage, fileFilter }))
  single(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    console.log('single', file);
    console.log(body);
    return '成功上传文件';
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('file', 2, { dest: 'uploads', fileFilter }))
  multiple(@UploadedFiles() file: Express.Multer.File[], @Body() body: any) {
    console.log(file);
    console.log(body);
    return '成功上传文件';
  }

  @Post('multiple-field')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'file', maxCount: 2 },
        { name: 'file1', maxCount: 3 },
      ],
      { dest: 'uploads', fileFilter },
    ),
  )
  multipleField(
    @UploadedFiles()
    files: {
      file?: Express.Multer.File[];
      file1?: Express.Multer.File[];
    },
    @Body() body: any,
  ) {
    console.log(files);
    console.log(body);
    return '成功上传文件';
  }

  @Post('any')
  @UseInterceptors(AnyFilesInterceptor({ storage, fileFilter }))
  any(@UploadedFiles() files: Express.Multer.File[], @Body() body: any) {
    console.log(files);
    console.log(body);
    return '成功上传文件';
  }
}
