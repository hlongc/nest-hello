import { FileValidator } from '@nestjs/common';
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
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      '-' +
      file.originalname;
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const fileFilter: multer.Options['fileFilter'] = (req, file, callback) => {
  // 解决内部编码错误导致的中文名文件名称乱码问题
  file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
  callback(null, true);
};

class MyFileValidator extends FileValidator {
  protected validationOptions: Record<string, any>;
  private size: number;

  constructor(options) {
    super(options);
    this.size = options.size ?? 10;
  }
  isValid(file?: Express.Multer.File): boolean | Promise<boolean> {
    return file.size < this.size * 1024;
  }

  buildErrorMessage(file: Express.Multer.File): string {
    return `图片 ${file.originalname} 大小不能超过 ${this.size}KB`;
  }
}

export { storage, fileFilter, MyFileValidator };
