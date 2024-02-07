import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      fs.mkdirSync(path.join(process.cwd(), 'uploads'));
    } catch (e) {}

    cb(null, path.join(process.cwd(), 'uploads'));
  },
});

const fileFilter: multer.Options['fileFilter'] = (req, file, callback) => {
  // 解决内部编码错误导致的中文名文件名称乱码问题
  file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
  callback(null, true);
};

const getChunkDir = (hash: string, name: string) =>
  `uploads/chunks_${hash}_${name}`;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage, fileFilter }))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { name: string },
  ): string {
    const separator = '*-*';
    const [name, hash, index] = body.name.split(separator);
    const chunkDir = getChunkDir(hash, name);
    // 给当前文件创建分块文件夹
    if (!fs.existsSync(chunkDir)) {
      fs.mkdirSync(chunkDir);
    }
    // 把刚才保存的文件复制到创建的文件夹中
    fs.cpSync(file.path, `${chunkDir}/${name}-${index}`);
    // 删除刚才保存的文件
    fs.rmSync(file.path);

    return 'File uploaded';
  }

  @Post('merge')
  mergeFile(@Body() { hash, name }: { name: string; hash: string }) {
    // 获取之前的文件分块文件夹
    const chunkDir = getChunkDir(hash, name);
    // 读出所有文件
    const files = fs.readdirSync(chunkDir);
    // 按照顺序进行排序组装
    files.sort((a, b) => parseInt(a.split('-')[1]) - parseInt(b.split('-')[1]));

    let startIndex = 0;
    let count = 0;

    files.forEach((file) => {
      // 拼接分块的全路径
      const filePath = chunkDir + '/' + file;
      // 创建一个读取流
      const stream = fs.createReadStream(filePath);
      stream
        // 往真正的文件中按顺序依次写入流
        .pipe(fs.createWriteStream('uploads/' + name, { start: startIndex }))
        .on('finish', () => {
          count++;
          // 在全部写入完成后删除分块文件夹
          if (count === files.length) {
            fs.rmSync(chunkDir, { recursive: true });
          }
        });
      // 更新下次写入的起始位置
      startIndex += fs.statSync(filePath).size;
    });
  }
}
